import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../assset/profile.jpg';
import FormPengaduan from '../component/formpengaduan';
import LihatDetail from '../component/lihatdetail'; // Komponen untuk melihat detail pengaduan
import '../css/pengaduan.css';
import Sidebar from '../component/sidebar';

function Pengaduan() {
    const navigate = useNavigate();
    const [PengaduanList, setPengaduanList] = useState([]); // Menyimpan data pengaduan
    const [userData, setUserData] = useState({
        username: 'Gita Latifa',
        pengaduans: [
            {
                id: 1,
                keteranganMasalah: 'Lampu Jalan Rusak',
                kategori: 'Industri', // Kategori Industri
                fotoPengaduan: '/path/to/foto1.jpg',
                tanggalPengaduan: new Date().toLocaleDateString(),
                status: 'proses',
                fotoSelesai: null,
                tanggalSelesai: null
            }
        ]
    });

    useEffect(() => {
        // Simulasi data pengaduan, bisa diganti dengan fetch API
        setPengaduanList([
            {
                id: 1,
                keteranganMasalah: 'Lampu Jalan Rusak',
                kategori: 'Industri', // Kategori Industri
                fotoPengaduan: '/path/to/foto1.jpg',
                tanggalPengaduan: new Date().toLocaleDateString(),
                status: 'proses',
                fotoSelesai: null,
                tanggalSelesai: null
            }
        ]);
    }, []);

    const [showForm, setShowForm] = useState(false); // State untuk mengontrol modal form
    const [selectedPengaduan, setSelectedPengaduan] = useState(null); // State untuk pengaduan yang dipilih

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setUserData((prevData) => ({
                ...prevData,
                username: username
            }));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUserData((prevData) => ({
            ...prevData,
            username: ''
        }));
        navigate('/'); // Redirect ke halaman utama setelah logout
    };

    const handleTambahPengaduan = (newPengaduan) => {
        setUserData((prevData) => ({
            ...prevData,
            pengaduans: [...prevData.pengaduans, newPengaduan]
        }));
        setShowForm(false); // Menutup modal setelah pengaduan ditambahkan
    };

    const handleLihatDetail = (pengaduan) => {
        setSelectedPengaduan(pengaduan); // Menyimpan pengaduan yang dipilih
    };

    const handleCloseDetail = () => {
        setSelectedPengaduan(null); // Menutup modal detail
    };

    return (
        <div className="pengaduanmain-content">
            <div className="sidebar">
                {/* Sidebar content */}
                <Sidebar />
            </div>

            <section className="profile-details">
                <h2>Pengaduan</h2>
            </section>
                <div className="container-new-button-pengaduan">
                    <button className="tambah-pengaduan-btn" onClick={() => setShowForm(true)}>
                        Tambah Pengaduan
                    </button>
                </div>

                {/* Menampilkan form jika showForm true */}
                {showForm && (
                    <div className="form-container">
                        <FormPengaduan
                            userData={userData}
                            setUserData={setUserData}
                            setShowForm={setShowForm}
                            handleTambahPengaduan={handleTambahPengaduan}
                        />
                    </div>
                )}

                <section className="pengaduan-section">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Keterangan Masalah</th>
                                <th>Kategori</th>
                                <th>Foto Pengaduan</th>
                                <th>Tanggal Pengaduan</th>
                                <th>Foto penyelesaian</th> {/* Foto selesai tetap ada */}
                                <th>Tanggal penyelesaian</th>
                                <th>Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {userData.pengaduans.map((pengaduan, index) => (
                                <tr key={pengaduan.id}>
                                    <td>{index + 1}</td>
                                    <td>{pengaduan.keteranganMasalah}</td>
                                    <td>{pengaduan.kategori}</td>
                                    <td>
                                        <img src={pengaduan.fotoPengaduan} alt="Foto Pengaduan" width="50" />
                                    </td>
                                    <td>{pengaduan.tanggalPengaduan}</td>
                                    <td>
                                        {pengaduan.fotoSelesai ? (
                                            <img src={pengaduan.fotoSelesai} alt="Foto Selesai" width="50" />
                                        ) : (
                                            'Belum selesai'
                                        )}
                                    </td> {/* Foto selesai */}
                                    <td>{pengaduan.tanggalSelesai || 'Belum selesai'}</td> {/* Tanggal selesai */}
                                    <td>{pengaduan.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
        </div>
    );
}

export default Pengaduan;
