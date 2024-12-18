import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Admin/profiles.css'; // Pastikan file CSS sudah tersedia
import Sidebars from '../../component/Admin/sidebars';
import image from '../../assset/profile.jpg';

const ProfilesPage = () => {
    const [dataAdmin, setDataAdmin] = useState({
        Username: '',
        email: 'aaaaa@gmail.com',
        role: 'Admin',
        gambar: 'path/to/avatar.jpg', // Ganti dengan path gambar statis jika diperlukan
    });
    const [showForm, setShowForm] = useState(false);  // Gunakan state untuk menampilkan form
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/');
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setDataAdmin((prevData) => ({
                ...prevData,
                username: storedUsername
            }));
        }
    }, []);

    return (
        <div className="profiles-main-content">
            <div clasName="sidebar">
                {/* Sidebar */}
                <Sidebars />
            </div>
            <section className="profiles-details">
                <h2>My Profile</h2>
                <div className="profiles-card">
                    <div className="profiles-header">
                        <div className="avatar-icon-large"><img src={image} alt="profile" /></div> {/* Menggunakan Unicode sebagai avatar besar */}
                        <h3>{dataAdmin.username}</h3>
                    </div>
                    <div className="profiles-info-details">
                        <div className="info-item">
                            <span className="label">Username</span>
                            <span className="value">{dataAdmin.username}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Email</span>
                            <span className="value">{dataAdmin.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Role</span>
                            <span className="value">{dataAdmin.role}</span>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default ProfilesPage;