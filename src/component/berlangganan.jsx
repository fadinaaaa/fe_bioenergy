import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Berlangganan = () => {
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = (today.getMonth() + 1).toString().padStart(2, '0');
        const dd = today.getDate().toString().padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    });
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Cek status login dan ambil alamat
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsLoggedIn(true); // Jika ada token, berarti pengguna sudah login
            fetchAddresses(); // Ambil data alamat jika sudah login
        } else {
            setIsLoggedIn(false);
            navigate('/login'); // Arahkan ke halaman login jika belum login
        }
    }, []);

    // Fungsi untuk mengambil data alamat dari API atau sumber lainnya
    const fetchAddresses = async () => {
        try {
            // Misalnya, kita ambil alamat dari API
            const response = await axios.get('http://127.0.0.1:8000/api/addresses', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setAddresses(response.data); // Set data alamat
        } catch (error) {
            console.error('Error fetching addresses:', error);
            // Jika gagal, tampilkan pesan error atau lakukan penanganan lainnya
        }
    };

    // Fungsi untuk menangani pengajuan berlangganan
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert('Anda harus login terlebih dahulu untuk mengajukan permintaan!');
            return;
        }

        if (date && selectedAddress && category) {
            const newSubscription = {
                id: new Date().getTime(),
                category,
                date,
                isActive: true,
                status: 'Proses',
            };

            let subscriptions = JSON.parse(sessionStorage.getItem('subscriptions')) || [];
            subscriptions.push(newSubscription);
            sessionStorage.setItem('subscriptions', JSON.stringify(subscriptions));

            alert('Permintaan Berhasil Diajukan!');
            setCategory('');
            setDate(() => {
                const today = new Date();
                const yyyy = today.getFullYear();
                const mm = (today.getMonth() + 1).toString().padStart(2, '0');
                const dd = today.getDate().toString().padStart(2, '0');
                return `${yyyy}-${mm}-${dd}`;
            });
            setSelectedAddress('');
        } else {
            alert('Harap lengkapi semua data.');
        }
    };

    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
    };

    const handleAddAddress = () => {
        navigate('/alamat');
    };

    return (
        <div className="berlangganan-container">
            <div className="news-section">
            <h2>Layanan Pemasangan Biomassa</h2>
        </div>
            <div className="berlangganan-box">
                <form onSubmit={handleSubmit} className="berlangganan-form">
                    <div className="form-group">
                        <label htmlFor="category">Kategori</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="category-select"
                            required
                        >
                            <option value="" disabled>Pilih Kategori</option>
                            <option value="rumah-tangga">Rumah Tangga</option>
                            <option value="industri">Industri</option>
                        </select>
                    </div>

                    <div className="form-group">
                    <label htmlFor="address">Alamat:</label>
                        <select
                            id="address"
                            value={selectedAddress}
                            onChange={handleAddressChange}
                        >
                            <option value="">Pilih Alamat</option>
                            {addresses.map((address) => (
                                <option key={address.id} value={address.id}>
                                    {address.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="date">Tanggal</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="date-input"
                        />
                    </div>

                    <button type="submit" className="submit-btn">Ajukan Permintaan</button>
                </form>
            </div>
        </div>
    );
};

export default Berlangganan;
