// src/component/Admin/addalamatform.jsx
import React, { useState } from 'react';
import '../../css/Admin/addalamatform.css';

function AddAlamatForm({ onAdd, onCancel }) {
    const [alamat, setAlamat] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAlamat = { id: Date.now(), alamat, longitude, latitude };
        onAdd(newAlamat); // Mengirimkan data alamat ke parent
        onCancel(); // Tutup modal setelah submit
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Alamat:</label>
                        <input
                            type="text"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            placeholder="Enter Alamat"
                            required
                        />
                    </div>
                    <div>
                        <label>Longitude:</label>
                        <input
                            type="text"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            placeholder="Enter Longitude"
                            required
                        />
                    </div>
                    <div>
                        <label>Latitude:</label>
                        <input
                            type="text"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            placeholder="Enter Latitude"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-button">Tambah</button>
                        <button type="button" onClick={onCancel} className="cancel-button">Batal</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddAlamatForm;
