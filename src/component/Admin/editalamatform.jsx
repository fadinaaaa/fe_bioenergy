// src/component/Admin/editalamtform.jsx
import React, { useState, useEffect } from 'react';

function EditAlamatForm({ alamat, onUpdate, onDelete, onCancel }) {
    const [editedAlamat, setEditedAlamat] = useState(alamat.alamat);
    const [editedLongitude, setEditedLongitude] = useState(alamat.longitude);
    const [editedLatitude, setEditedLatitude] = useState(alamat.latitude);

    useEffect(() => {
        setEditedAlamat(alamat.alamat);
        setEditedLongitude(alamat.longitude);
        setEditedLatitude(alamat.latitude);
    }, [alamat]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({
            ...alamat,
            alamat: editedAlamat,
            longitude: editedLongitude,
            latitude: editedLatitude,
        });
    };

    const handleDelete = () => {
        onDelete(alamat.id); // Hapus alamat
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Edit Alamat</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Alamat:</label>
                        <input
                            type="text"
                            value={editedAlamat}
                            onChange={(e) => setEditedAlamat(e.target.value)}
                            placeholder="Edit Alamat"
                            required
                        />
                    </div>
                    <div>
                        <label>Longitude:</label>
                        <input
                            type="text"
                            value={editedLongitude}
                            onChange={(e) => setEditedLongitude(e.target.value)}
                            placeholder="Edit Longitude"
                            required
                        />
                    </div>
                    <div>
                        <label>Latitude:</label>
                        <input
                            type="text"
                            value={editedLatitude}
                            onChange={(e) => setEditedLatitude(e.target.value)}
                            placeholder="Edit Latitude"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Update</button>
                        <button type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditAlamatForm;
