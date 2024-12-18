import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/profile.css';
import image from '../assset/profile.jpg';
import FormEditProfile from '../component/formeditprofile';
import Sidebar from '../component/sidebar';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        no_telp: ''
    });

    const [showForm, setShowForm] = useState(false); // State untuk menampilkan form edit
    const navigate = useNavigate();

    // Fungsi logout
    const handleLogout = () => {
        localStorage.removeItem('userData'); // Hapus data pengguna dari localStorage
        navigate('/');                      // Arahkan ke halaman login
    };

    // Mengambil data pengguna dari localStorage saat komponen pertama kali dimuat
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            console.log("Data dari localStorage:", JSON.parse(storedUserData)); // Debugging
            setUserData(JSON.parse(storedUserData)); // Set data pengguna ke state
        } else {
            console.log("Tidak ada data di localStorage");
        }
    }, []);


    return (
        <div className="profile-main-content">
            <div className="sidebar">
                {/* Sidebar content */}
                <Sidebar />
            </div>
                <section className="profile-details">
                    <h2>My Profile</h2>
                    <div className="profile-card">
                        <div className="profile-header">
                            <div className="avatar-icon-large"><img src={image} alt="profile" /></div>
                            <h3>{userData.username}</h3>
                    </div>
                    <div className="profile-info-details">
                        <div className="info-item">
                            <span className="label">Username</span>
                            <span className="value">{userData.username}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Email</span>
                            <span className="value">{userData.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">No Telp</span>
                            <span className="value">{userData.no_telp}</span>
                        </div>
                    </div>
                </div>

                    {/* Tombol Edit Profile berada di luar profile card */}
                    <div className="container-new-button-profile">
                        <div className="edit-button-container">
                            <button onClick={() => setShowForm(true)} className="edit-profile-button">Edit Profile</button>
                        </div>
                    </div>
                </section>

                {showForm && (
                <div className="form-container">
                    <FormEditProfile
                        userData={userData}
                        setUserData={setUserData}
                        setShowForm={setShowForm}
                    />
                </div>
                )}
            </div>
    );
};

export default Profile;
