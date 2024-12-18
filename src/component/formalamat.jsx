import React, { useState } from 'react';
import '../css/formalamat.css';

function FormAlamat({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        alamat: '', // Menyimpan alamat
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.alamat) {
            setError('Alamat tidak boleh kosong');
            return;
        }

        // Kirim data alamat
        onSubmit({ alamat: formData.alamat });
        setFormData({ alamat: '' }); // Reset form
    };

    const handlealamatChange = (e) => {
        setFormData({ ...formData, alamat: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Alamat</label>
                <input
                    type="text"
                    value={formData.alamat}
                    onChange={handlealamatChange}
                    placeholder="Masukkan alamat lengkap"
                    required
                />
            </div>

            {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

            {/* Button Save dan Cancel */}
            <div className="button-container">
                <button type="submit" className="save-button">Tambah</button>
                {/* Panggil onCancel dari props untuk menutup form */}
                <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
            </div>
        </form>
    );
}

export default FormAlamat;
