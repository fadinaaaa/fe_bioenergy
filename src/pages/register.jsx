import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/register.css';
import image from '../assset/2.png';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/registrasi', {
                username: username.trim(),
                email: email.trim(),
                no_telp: phoneNumber.trim(), // Sesuaikan dengan backend
                password: password.trim(),
                password_confirmation: confirmPassword.trim(), // Pastikan mengirim konfirmasi password
            });
    
            if (response.status === 200) {
                alert('Registration successful! Please log in.');
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Registration failed');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };
    

    return (
        <div className="register-container">
            <div className="image-container">
                <img src={image} alt="Registration" />
            </div>
            <div className="register-form">
                <h2>Sign Up</h2>
                <p>Create your new account</p>

                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}

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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">No Telp</label>
                        <input
                            type="number"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="sign-up-btn">Sign Up</button>
                </form>

                <p className="signin-option">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
