import React, { useState, useEffect } from 'react';
import Header from '../component/headerbisa.jsx';
import Footer from '../component/footer.jsx';
import Hero from '../component/hero.jsx';
import image from '../assset/1.png';
import '../css/header.css';
import '../css/footer.css';
import '../css/hero.css';
import '../css/landing.css';
import { Link } from 'react-router-dom'; // Ensure Link is imported from react-router-dom
import axios from 'axios'; // Import axios for fetching data

const LandingPage = () => {
    const [news, setNews] = useState([]); // State for news
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error
    const BiomassSection = () => {
        return (
            <section className="biomass">
                <div className="container">
                    <img src={image} alt="Apa Itu Biomassa?" />
                    <div className="container-bio">
                        <h2>Apa Itu Biomassa?</h2>
                        <p>Biomassa dari sampah merupakan sumber energi alternatif yang mengubah limbah
                            organik menjadi listrik melalui berbagai teknologi konversi. Metode ini mengurangi
                            volume sampah di TPA sambil menghasilkan energi terbarukan, mendukung
                            keberlanjutan lingkungan, dan mengurangi ketergantungan pada bahan bakar fosil.
                            Dengan demikian, pemanfaatan biomassa dari sampah menawarkan solusi efektif
                            untuk manajemen limbah dan produksi energi bersih secara bersamaan.
                        </p>
                    </div>
                </div>
            </section>
        );
    };

    useEffect(() => {
        // Ambil token dari localStorage atau sumber lain
        const token = localStorage.getItem('access_token');

        // Fetch news data from API
        axios.get('http://127.0.0.1:8000/api/news', {
            headers: {
                Authorization: `Bearer ${token}`, // Tambahkan token di header
            },
        })
            .then((response) => {
                console.log('Response:', response.data); // Log the response
                setNews(response.data.data); // Set news from API response
                setLoading(false); // Mark loading as finished
            })
            .catch((err) => {
                console.error('Error fetching news:', err); // Log the error
                setError('Gagal mengambil data berita'); // Handle error
                setLoading(false); // Mark loading as finished even if error
            });
    }, []);


    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    return (
        <div className="landing-page">
            <Header />
            <Hero />
            <BiomassSection />
            <div className="container">
                <div className="news-section">
                    <h2>Berita Terbaru</h2>
                    <div className="news-list">
                        {news.length > 0 ? (
                            news.map((item) => (
                                <div key={item.id} className="news-item">
                                    <img src={`http://127.0.0.1:8000/storage/${item.image}`} alt={item.judul_berita} />
                                    <h3>{item.judul_berita}</h3>
                                    <Link to={`/news/${item.id}`}>Baca Selengkapnya</Link>
                                </div>
                            ))
                        ) : (
                            <p>Tidak ada berita yang tersedia.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

};

export default LandingPage;