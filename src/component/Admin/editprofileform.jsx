import React, { useState } from 'react';
import '../css/formeditprofile.css';

const FormEditProfile = ({ userData, setUserData, setShowForm }) => {
    const [formData, setFormData] = useState({
        username: userData.username,
        email: dataAdmin.email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserData(formData);  // Update userData state dengan data baru
        setShowForm(false);  // Menutup form setelah menyimpan perubahan
    };

    return (
        <div className="form-edit-container">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                {/* Button Save dan Cancel */}
                <div className="button-container">
                    <button type="submit" className="save-button">Save</button>
                    <button type="button" onClick={() => setShowForm(false)} className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default FormEditProfile;
