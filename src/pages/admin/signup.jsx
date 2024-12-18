import React, { useState } from 'react';
import '../../css/Admin/signup.css'; // Pastikan Anda memiliki file CSS yang diimpor
import image from '../../assset/1.png';
import image1 from '../../assset/7.png';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        nama: '',
        nip: '',
        instansi: '',
        role: '',
        email: '',
        password: '',
        confirmpassword: '',
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmpassword) {
            alert('Registrasi gagal, Pastikan Anda memasukkan konfirmasi password yang sama');
            return;
        }

        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }

        try {
            const response = await fetch('YOUR_API_ENDPOINT_HERE', {
                method: 'POST',
                body: formDataObj,
            });

            const data = await response.json();
            if (data.success) {
                alert('Registrasi Berhasil');
                window.location.href = '/login'; // Ganti dengan rute login Anda
            } else {
                alert(data.message || 'Registrasi gagal, coba lagi nanti.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Terjadi kesalahan saat registrasi, coba lagi nanti.');
        }
    };

    return (
        <div className="main-signup">
            <div className="content-signup">
                <div className="box-img1">
                    <div className="headers-signup">
                        <img src={image1} alt="Logo PT PLN UPK TIMOR" />
                        <h3>Bio</h3>
                        <h3 className='logo2'>energy</h3>
                    </div>
                    <img src={image} alt="Register Illustration" />
                </div>

                <div className="box-form-signup">
                    <div className="headers-box-form-regis">
                        <b className="welcome">Sign Up</b>
                        <b className="desc">Create your account</b>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="group-form">
                            <label className="label-email-regis">Full Name</label>
                            <input
                                className="input-email-regis"
                                type="text"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div className="group-form">
                            <label className="label-email-regis">NIP</label>
                            <input
                                className="input-email-regis"
                                type="text"
                                name="nip"
                                value={formData.nip}
                                onChange={handleChange}
                                placeholder="NIP"
                                required
                            />
                        </div>
                        <div className="group-form">
                            <label className="label-email-regis">Instansi</label>
                            <input
                                className="input-email-regis"
                                type="text"
                                name="instansi"
                                value={formData.instansi}
                                onChange={handleChange}
                                placeholder="Instansi"
                                required
                            />
                        </div>
                        <div className="group-form">
                            <label className="label-email-regis">User Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Pilih Role ---</option>
                                <option value="Admin Dispacher">Admin Dispatcher</option>
                                <option value="Admin Pembangkit">Admin Pembangkit</option>
                                <option value="Pegawai">Pegawai</option>
                            </select>
                        </div>
                        <div className="group-form">
                            <label className="label-email-regis">Email</label>
                            <input
                                className="input-email-regis"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="group-form">
                            <label className="label-email-regis">Foto Profil</label>
                            <input
                                className="input-email-regis"
                                type="file"
                                name="photo"
                                onChange={handleFileChange}
                                placeholder="Foto Profil"
                            />
                        </div>
                        <div className="group-form">
                            <label className="label-email-regis">Password</label>
                            <input
                                className="input-email-regis"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="************"
                                required
                            />
                        </div>
                        <div className="group-form">
                            <label className="label-email-regis">Konfirmasi Password</label>
                            <input
                                className="input-email-regis"
                                type="password"
                                name="confirmpassword"
                                value={formData.confirmpassword}
                                onChange={handleChange}
                                placeholder="************"
                                required
                            />
                        </div>
                        <div className="group-form-footer-regis">
                            <input className="button-signup" type="submit" value="Sign Up" />
                            <b>
                                Already have an account?{' '}
                                <span>
                                    <a className="span" href="/admin/signin">Sign In</a>
                                </span>
                            </b>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
