import React, { useState } from 'react';

function AddLayananForm({ onAdd, onCancel }) {
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('diajukan');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ category, address, date, status }); // Kirim data baru ke parent
    };

    return (
        <div className="modal">
            <h3>Tambah Layanan</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Kategori:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Pilih Kategori</option>
                        <option value="rumah tangga">Rumah Tangga</option>
                        <option value="industri">Industri</option>
                    </select>
                </div>
                <div>
                    <label>Alamat:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tanggal:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="diajukan">Diajukan</option>
                        <option value="proses">Proses</option>
                        <option value="selesai">Selesai</option>
                    </select>
                </div>
                <div className="form-actions">
                        <button type="submit" className="submit-button">Tambah</button>
                        <button type="button" onClick={onCancel} className="cancel-button">Batal</button>
                </div>
            </form>
        </div>
    );
}

export default AddLayananForm;
