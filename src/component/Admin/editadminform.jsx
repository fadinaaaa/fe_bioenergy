import React, { useState, useEffect } from 'react';

const EditAdminForm = ({ currentAdmin, setShowEditModal, setAdminList }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        no_telp: '',
        role: '',
    });

    // Set initial form data when the modal is opened with the current admin
    useEffect(() => {
        if (currentAdmin) {
            setFormData({
                username: currentAdmin.username || '',
                email: currentAdmin.email || '',
                no_telp: currentAdmin.no_telp || '',
                role: currentAdmin.role || '',
            });
        }
    }, [currentAdmin]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new updatedAdmin object
        const updatedAdmin = { ...currentAdmin, ...formData };

        // Update admin list or data
        setAdminList(prevList =>
            prevList.map(admin =>
                admin.id === currentAdmin.id ? updatedAdmin : admin
            )
        );

        // Close modal after submission
        setShowEditModal(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Nomor Telepon</label>
                <input
                    type="text"
                    name="no_telp"
                    value={formData.no_telp}
                    onChange={handleChange}
                    required
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
                    <option value="">Pilih Role</option> {/* Placeholder option */}
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Pengguna">Pengguna</option>
                </select>
            </div>
            <button type="submit">Simpan</button>
            <button type="button" onClick={() => setShowEditModal(false)}>
                Batal
            </button>
        </form>
    );
};

export default EditAdminForm;