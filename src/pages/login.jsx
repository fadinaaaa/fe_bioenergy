import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import image from '../assset/2.png';
import '../css/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State untuk error
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Mencegah refresh halaman saat submit form
    
        // Reset error state sebelum submit
        setError('');
    
        try {
            // Kirim permintaan login ke API
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                username: username.trim(),
                password: password.trim()
            });
    
            // Simpan token, role, dan username jika login berhasil
            const { access_token, role } = response.data;
    
            // Cetak data yang diterima dari API
            console.log('Response Data:', response.data);
    
            // Simpan data ke localStorage
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', username); // Simpan username
    
          // Navigasi berdasarkan role
            if (role === 'admin') {
                setTimeout(() => {
                    navigate('/admin/dashboard'); // Halaman Admin
                }, 2000);
            } else if (role === 'superadmin') {
                setTimeout(() => {
                    navigate('/admin/dashboard'); // Halaman Super Admin
                }, 2000);
            } else {
                setTimeout(() => {
                    navigate('/'); // Halaman untuk pengguna biasa
                }, 2000);
            }
        } catch (error) {
            // Menangani kesalahan jika login gagal
            if (error.response) {
                // Jika respons error dari server
                console.error('Login error response:', error.response.data);
                setError('Username atau password salah!');
            } else {
                // Jika tidak ada respons (misalnya masalah jaringan)
                console.error('Error:', error.message);
                setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="image-container">
                <img src={image} alt="Login Image" />
            </div>
            <div className="container-login-form">
                <div className="login-form">
                    <h2>Welcome Back!</h2>
                    <p>Please enter your username and password</p>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Menampilkan pesan error jika login gagal */}
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-options">
                            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                        </div>

                        <button type="submit" className="sign-in-btn">Sign In</button>
                    </form>

                    <p className="signup-option">
                        Don’t have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
