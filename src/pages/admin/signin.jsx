import React, { useState } from 'react';
import image from '../../assset/1.png';
import image1 from '../../assset/7.png';
import '../../css/Admin/signin.css'; // Pastikan Anda memiliki file CSS yang diimpor

    const SigninPage = () => {
        const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
        
            const handleLogin = async (e) => {
            e.preventDefault();
        
            // Lakukan validasi login di sini
            try {
                const response = await fetch('YOUR_API_ENDPOINT_HERE', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                });
                const data = await response.json();
        
                if (data.success) {
                // Simpan data ke session storage atau gunakan state management
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('nama', data.nama_user);
                sessionStorage.setItem('role', data.role);
                sessionStorage.setItem('user_id', data.user_id);
                sessionStorage.setItem('foto_profil', data.gambar);
        
                // Redirect ke halaman utama
                window.location.href = '/index';
                } else {
                alert(data.message || 'Login gagal, periksa kembali email dan password Anda.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('Terjadi kesalahan saat login, coba lagi nanti.');
            }
            };
        
            return (
                    <div className="signin-body">
                    <div className="main-signin">
                        <div className="content-signin">
                        <div className="box-img1">
                            <div className="headers-signin">
                            <img src={image1} alt="" />
                            <h3>Bio</h3>
                            <h3 className='logo2'>energy</h3>
                            </div>
                            <img src={image} alt="" />
                        </div>
                
                        <div className="box-form">
                            <div className="headers-box-form">
                            <b className="welcome">Welcome Back!!</b>
                            <b className="desc">Please enter your email and password</b>
                            </div>
                            <form className="form" onSubmit={handleLogin}>
                            <div className="group-form">
                                <label className="label-email-signin">Username</label>
                                <input
                                className="input-email-signin"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Username"
                                required
                                />
                            </div>
                            <div className="group-form">
                                <label className="label-email-signin">Password</label>
                                <input
                                className="input-email-signin"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="************"
                                required
                                />
                            </div>
                            <div className="group-form-footer">
                                <input className="button-signin" type="submit" value="Sign In" />
                                <b>
                                Don’t have an account?{' '}
                                <span>
                                    <a className="span" href="/admin/signup">Sign Up</a>
                                </span>
                                </b>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                );
            };
            
        
    
    export default SigninPage;