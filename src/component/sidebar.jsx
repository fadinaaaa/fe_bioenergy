import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../assset/profile.jpg';  // Pastikan gambar profil sesuai dengan path yang benar
import '../css/sidebar.css';  // Sesuaikan dengan CSS yang Anda gunakan

const Sidebar = () => {
    const navigate = useNavigate();

    // State untuk menyimpan data pengguna
    const [userData, setUserData] = useState({
        username: '',
    });

    // Menarik username dari localStorage saat komponen pertama kali dimuat
    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setUserData((prevData) => ({
                ...prevData,
                username: username
            }));
        }
    }, []);

    // Fungsi untuk logout
    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('access_token');
        navigate('/');
    };

    return (
        <div className="">
            <aside className="sidebar">
                <div className="profile-info">
                    <div className="avatar-icon"><img src={image} alt="profile" /></div>
                    {userData.username ? (
                        <p>
                            <Link to="/">{userData.username}</Link>
                        </p>
                    ) : (
                        <p>
                            <Link to="/login">Sign In</Link>
                        </p>
                    )}
                </div>

                <nav className="nav-menu">
                    <ul>
                        <li><Link to="/profile">My Profile</Link></li>
                        <li><Link to="/alamat">Alamat</Link></li>
                        <li><Link to="/berlangganan">Layanan</Link></li>
                        <li><Link to="/pengaduan">Pengaduan</Link></li>
                    </ul>
                </nav>

                <div className="profile-footer">
                    {userData.username && (
                        <button onClick={handleLogout} className="logout">Logout</button>
                    )}
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
