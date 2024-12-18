import React, { useState, useEffect } from 'react';

const EditPenggunaForm = ({ onClose, onEdit, penggunaData }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        status: 'Aktif',
    });

    useEffect(() => {
        if (penggunaData) {
            setFormData({
                username: penggunaData.username,
                email: penggunaData.email,
                phone: penggunaData.phone,
                status: penggunaData.status,
            });
        }
    }, [penggunaData]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submit to update pengguna data
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPengguna = {
            ...penggunaData,
            ...formData,
        };

        onEdit(updatedPengguna); // Update the pengguna data in the list
        onClose(); // Close the modal after editing
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Pengguna</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>No Tlp</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
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

export default EditPenggunaForm;
