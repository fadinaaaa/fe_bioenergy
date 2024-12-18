import React, { useState } from 'react';
import '../css/formeditprofile.css';

const FormEditProfile = ({ userData, setUserData, setShowForm }) => {
    const [formData, setFormData] = useState({
        nama: userData.nama,
        email: userData.email,
        phone: userData.phone,
        username: userData.username
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
        setUserData(formData);
        setShowForm(false);
    };

    return (
        <div className="form-edit-container">
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
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

                <div className="button-container">
                    <button type="submit" className="save-button">Save</button>
                    <button type="button" onClick={() => setShowForm(false)} className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default FormEditProfile;
