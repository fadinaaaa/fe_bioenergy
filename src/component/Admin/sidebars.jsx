import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Admin/sidebars.css';
import image from '../../assset/profile.jpg';

const Sidebars = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        role: '',
    });

    useEffect(() => {
        // Ambil data pengguna dari localStorage setelah login
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');

        if (username && role) {
            setUserData({
                username,
                role,
            });
        } else {
            setUserData({
                username: '',
                role: '',
            });
        }
    }, []); // Hanya dijalankan sekali saat pertama kali render

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className="sidebars-page">
            <aside className="sidebars">
                <div className="sidebars-admin-info">
                    <div className="sidebars-avatar-icon">
                        <img src={image} alt="profile" />
                    </div>
                    {userData.username ? (
                        <p><a href="/admin/profiles">{userData.username}</a></p>
                    ) : (
                        <p><a href="/login">Sign In</a></p>
                    )}
                    <p className="sidebars-admin-role">( {userData.role} )</p> {/* Menampilkan role */}
                </div>

                <nav className="sidebars-nav-menu">
                    <ul>
                        <li><a href="/admin/dashboard" className="sidebars-nav-link">Dashboard</a></li>
                        <li><a href="/admin/newspage" className="sidebars-nav-link">News</a></li>
                        <li><a href="/admin/alamatpage" className="sidebars-nav-link">Alamat</a></li>
                        <li><a href="/admin/layananpage" className="sidebars-nav-link">Layanan</a></li>
                        <li><a href="/admin/pengaduanpage" className="sidebars-nav-link">Pengaduan</a></li>

                        {/* Hanya tampilkan menu User jika role adalah superadmin */}
                        {userData.role === 'superadmin' && (
                            <li><a href="/admin/accountpengguna" className="sidebars-nav-link">User</a></li>
                        )}

                        <li><a href="/login" className="sidebars-nav-link" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebars;
