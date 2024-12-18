import React, { useState } from 'react';
import axios from 'axios';

const AddPengaduanForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        keterangan_masalah: '',
        kategori: '',
        foto_pengaduan: null,
        tanggal_pengaduan: '',
        status: '',
    });

    const [error, setError] = useState(''); // Menyimpan error message

    // Menangani perubahan input form
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0], // Menangani file upload
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Menangani pengiriman form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Kirim data ke server menggunakan axios
            const formDataToSend = new FormData();
            for (let key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            // Contoh endpoint API, ganti dengan URL API Anda
            const response = await axios.post('/api/pengaduan', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                onSubmit(response.data); // Panggil fungsi onSubmit jika berhasil
                onClose(); // Tutup modal setelah pengiriman sukses
            }
        } catch (err) {
            setError('Gagal mengirim pengaduan. Silakan coba lagi.'); // Menangani error
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Menampilkan pesan error */}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="keterangan_masalah">Keterangan Masalah</label>
                        <input
                            id="keterangan_masalah"
                            name="keterangan_masalah"
                            value={formData.keterangan_masalah}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="kategori">Kategori</label>
                        <select
                            id="kategori"
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih Kategori</option>
                            <option value="rumah_tangga">Rumah Tangga</option>
                            <option value="industri">Industri</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="foto_pengaduan">Foto Pengaduan</label>
                        <input
                            type="file"
                            id="foto_pengaduan"
                            name="foto_pengaduan"
                            onChange={handleChange}
                            accept="image/*"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tanggal_pengaduan">Tanggal Pengaduan</label>
                        <input
                            type="date"
                            id="tanggal_pengaduan"
                            name="tanggal_pengaduan"
                            value={formData.tanggal_pengaduan}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>

                    <div>
                        <button type="submit">Kirim Pengaduan</button>
                        <button type="button" onClick={onClose}>Batal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPengaduanForm;
