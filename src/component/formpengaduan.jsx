import React, { useState, useEffect } from 'react';

function FormPengaduan({ handleTambahPengaduan, setShowForm }) {
    const today = new Date().toISOString().split('T')[0]; // Mengambil tanggal hari ini
    const [keteranganMasalah, setKeteranganMasalah] = useState('');
    const [kategori, setKategori] = useState('');
    const [fotoPengaduan, setFotoPengaduan] = useState('');
    const [tanggalPengaduan, setTanggalPengaduan] = useState(today);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Pastikan handleTambahPengaduan ada dan dipanggil dengan benar
        if (typeof handleTambahPengaduan === 'function') {
            const newPengaduan = {
                id: new Date().getTime(), // ID unik menggunakan timestamp
                keteranganMasalah,
                kategori,
                tanggalPengaduan,
                fotoPengaduan,
                status: 'proses',
                tanggalSelesai: null,
                fotoSelesai: null
            };

            handleTambahPengaduan(newPengaduan); // Mengirim data ke parent (Pengaduan.js)
            setShowForm(false); // Menutup form setelah pengaduan ditambahkan
        } else {
            console.error('handleTambahPengaduan is not a function');
        }
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0]; // Mengambil file gambar pertama
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoPengaduan(reader.result); // Menyimpan data URL gambar
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        setShowForm(false); // Menutup form ketika tombol cancel diklik
    };

    useEffect(() => {
        // Event listener untuk menangani klik di luar modal
        const handleOutsideClick = (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                setShowForm(false); // Menutup form jika klik di luar modal
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [setShowForm]);

    return (
        <div className="modal-overlay"> {/* Modal overlay untuk mendeteksi klik di luar modal */}
            <div className="form-container">
                <div className="form-edit-container">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Keterangan Masalah:</label>
                            <input
                                type="text"
                                value={keteranganMasalah}
                                onChange={(e) => setKeteranganMasalah(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                    <label htmlFor="kategori">Kategori:</label>
                    <select
                        id="kategori"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        required
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="Rumah Tangga">Rumah Tangga</option>
                        <option value="Industri">Industri</option>
                    </select>
                </div>

                        <div>
                            <label>Foto Pengaduan:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFotoChange}
                                required
                            />
                            {fotoPengaduan && <img src={fotoPengaduan} alt="Foto Pengaduan" width="100" />}
                        </div>
                        <div>
                            <label>Tanggal Pengaduan:</label>
                            <input
                                type="date"
                                value={tanggalPengaduan}
                                onChange={(e) => setTanggalPengaduan(e.target.value)}
                                required
                            />
                        </div>
                        <div className="button-container">
                            {/* Tombol Save */}
                            <button type="submit" className="save-button">Tambah Pengaduan</button>
                            {/* Tombol Cancel */}
                            <button type="button" className="cancel-button" onClick={handleClose}>Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormPengaduan;
