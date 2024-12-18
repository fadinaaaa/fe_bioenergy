import React, { useState, useEffect } from 'react';
import '../css/modaleditalamat.css'; // Pastikan menyesuaikan styling

function FormEditAlamat({ alamat, onClose, onSave }) {
    const [editedAddress, setEditedAddress] = useState(alamat.alamat);

    useEffect(() => {
        setEditedAddress(alamat.alamat); // Set initial state dengan alamat yang akan diedit
    }, [alamat]);

    const handleChange = (event) => {
        setEditedAddress(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editedAddress.trim() !== '') {
            onSave({ ...alamat, alamat: editedAddress });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="alamat">Alamat</label>
                        <input
                            type="text"
                            id="alamat"
                            value={editedAddress}
                            onChange={handleChange}
                            placeholder="Masukkan alamat baru"
                            required
                        />
                    </div>
                    <div className="modal-actions">
                    <button type="submit" className="save-button">
                            Simpan
                        </button>
                        <button type="button" onClick={onClose} className="cancel-button">
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormEditAlamat;
