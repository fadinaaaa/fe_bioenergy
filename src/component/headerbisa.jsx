import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assset/7.png';

const HeaderBisa = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const username = localStorage.getItem('username');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <span className="logo-bio">Bio</span>
                    <span className="logo-energy">energy</span>
                </h1>
                <button className="menu-toggle" onClick={toggleSidebar}>
                    {isSidebarOpen ? '✖' : '☰'}
                </button>
                <nav className={`nav ${isSidebarOpen ? 'nav-open' : ''}`}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Beranda</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/news" className="nav-link">News</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/peta" className="nav-link">Maps</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/layanan" className="nav-link">Layanan</Link>
                        </li>
                        <li className="nav-item">
                            {username ? (
                                <Link to="/profile" className="nav-link">
                                    {username} {/* Menampilkan username */}
                                </Link>
                            ) : (
                                <Link to="/login" className="sign-in-button">Sign In</Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default HeaderBisa;