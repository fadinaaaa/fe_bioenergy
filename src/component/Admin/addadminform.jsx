import React, { useState } from 'react';

const AddAdminForm = ({ setShowAddModal, setUserList }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        no_telp: '', // Tambahkan input nomor telepon
        role: 'Pengguna', // Default role
        status: 'Aktif', // Default status
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulasikan data baru (ID biasanya diberikan oleh backend)
        const newUser = {
            id: Date.now(), // Gunakan timestamp sebagai ID sementara
            ...formData,
        };

        // Tambahkan data ke daftar pengguna
        setUserList((prevList) => [...prevList, newUser]);

        // Tutup modal
        setShowAddModal(false);
    };

    return (
        <div className="add-admin-form">
            <h3>Tambah User Baru</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="no_telp">No Telepon</label>
                    <input
                        type="text"
                        id="no_telp"
                        name="no_telp"
                        value={formData.no_telp}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="Pengguna">Pengguna</option>
                        <option value="Admin">Admin</option>
                        <option value="SuperAdmin">SuperAdmin</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        Tambah
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="cancel-button"
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAdminForm;
