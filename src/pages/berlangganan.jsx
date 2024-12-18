import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/berlangganan.css';
import Sidebar from '../component/sidebar';

function Alamat() {
    const navigate = useNavigate();
    const [layananList, setLayananList] = useState([]); // Menyimpan data layanan
    const [userData, setUserData] = useState({
        username: 'Gita Latifa',
        subscriptions: [
            { id: 1, category: 'industri', address: 'Jl. Merdeka No.1', date: '2024-01-15', status: 'selesai', isActive: true },
            { id: 2, category: 'rumah tangga', address: 'Jl. Sudirman No.5', date: '2024-02-20', status: 'diajukan', isActive: true },
        ],
    });

    useEffect(() => {
        // Simulasi data layanan yang bisa diganti dengan fetch API
        setLayananList([
            { id: 1, category: 'industri', address: 'Jl. Merdeka No.1', date: '2024-01-15', status: 'selesai', isActive: true },
            { id: 2, category: 'rumah tangga', address: 'Jl. Sudirman No.5', date: '2024-02-20', status: 'diajukan', isActive: true },
        ]);
    }, []);




    // Fungsi untuk menangani aksi berhenti berlangganan
    const handleStopSubscription = (id) => {
        const updatedSubscriptions = userData.subscriptions.map((subscription) =>
            subscription.id === id
                ? { ...subscription, isActive: false, status: 'Berhenti' }
                : subscription
        );
        setUserData((prevData) => ({
            ...prevData,
            subscriptions: updatedSubscriptions
        }));
        alert('Berlangganan berhenti.');
    };


    return (
        <div className="laymain-content">
            <div className="sidebar">
                {/* Sidebar content */}
                <Sidebar />
            </div>
            <section className="profile-details">
                <h2>Layanan</h2>
            </section>

                <section className="pengaduan-section">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Kategori</th>
                                <th>Tanggal</th>
                                <th>Alamat</th> {/* Kolom untuk alamat */}
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.subscriptions.map((subscription, index) => (
                                <tr key={subscription.id}>
                                    <td>{index + 1}</td>
                                    <td>{subscription.category}</td>
                                    <td>{subscription.date}</td>
                                    <td>{subscription.address}</td> {/* Menampilkan alamat */}
                                    <td>{subscription.status}</td>
                                    <td>
                                        <button
                                            className={`btn ${subscription.isActive ? 'btn-danger' : 'cancel-btn'}`}
                                            onClick={() => handleStopSubscription(subscription.id)}
                                            disabled={!subscription.isActive}
                                        >
                                            {subscription.isActive ? 'Berhenti Berlayanan' : 'Layanan Berhenti'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
    );
}

export default Alamat;
