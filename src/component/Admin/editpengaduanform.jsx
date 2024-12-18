import React, { useEffect, useState } from 'react';

const EditPengaduanForm = ({ pengaduan, onUpdate, onClose }) => {
    const [formData, setFormData] = useState({
        keterangan_masalah: '',
        kategori: '',
        foto_pengaduan: null,  // File gambar
        tanggal_pengaduan: '',
        foto_penyelesaian: null,  // File gambar
        tanggal_penyelesaian: '',
        status: '',
    });

    // Mengisi data form berdasarkan data pengaduan yang dipilih
    useEffect(() => {
        if (pengaduan) {
            setFormData({
                keterangan_masalah: pengaduan.keterangan_masalah,
                kategori: pengaduan.kategori,
                foto_pengaduan: pengaduan.foto_pengaduan, // Gambar yang sudah ada
                tanggal_pengaduan: pengaduan.tanggal_pengaduan,
                foto_penyelesaian: pengaduan.foto_penyelesaian, // Gambar yang sudah ada
                tanggal_penyelesaian: pengaduan.tanggal_penyelesaian,
                status: pengaduan.status,
            });
        }
    }, [pengaduan]);

    // Fungsi untuk menangani perubahan input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Fungsi untuk menangani perubahan file gambar
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0], // Menyimpan file gambar yang dipilih
        }));
    };

    // Fungsi untuk menangani submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPengaduan = {
            ...pengaduan,
            ...formData, // Menggabungkan data lama dengan data baru
        };

        onUpdate(updatedPengaduan); // Mengirim data pengaduan yang sudah diperbarui
        onClose(); // Menutup modal setelah submit
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Pengaduan</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Keterangan Masalah</label>
                        <input
                            type="text"
                            name="keterangan_masalah"
                            value={formData.keterangan_masalah}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Kategori</label>
                        <select
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            required
                        >
                            <option value="Rumah Tangga">Rumah Tangga</option>
                            <option value="Industri">Industri</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Gambar</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                        {/* Pastikan file ada sebelum membuat URL objek */}
                        {formData.image && (
                            <div className="image-preview">
                                {/* Menampilkan gambar dari URL server */}
                                <img
                                    src={`http://127.0.0.1:8000/storage/${formData.image.name}`} // Menggunakan path yang sesuai dengan path server
                                    alt="Preview Gambar"
                                    style={{ width: '100%', borderRadius: '10px' }}
                                />
                            </div>
                        )}
                    </div>


                    <div className="form-group">
                        <label>Tanggal Pengaduan</label>
                        <input
                            type="date"
                            name="tanggal_pengaduan"
                            value={formData.tanggal_pengaduan}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="diajukan">Diajukan</option>
                            <option value="proses">Proses</option>
                            <option value="selesai">Selesai</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">Update</button>
                        <button type="button" onClick={onClose} className="cancel-button">Batal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPengaduanForm;
