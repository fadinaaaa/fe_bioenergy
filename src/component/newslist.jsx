import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from './newscard';
import { Link } from 'react-router-dom';

const NewsList = () => {
    const [newsData, setNews] = useState([]); // Untuk menyimpan data berita
    const [loading, setLoading] = useState(true); // Untuk status loading
    const [error, setError] = useState(null); // Untuk menyimpan error

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
                setNews(response.data.data || []); // Set news from API response
                setLoading(false); // Mark loading as finished
            })
            .catch((err) => {
                console.error('Error fetching news:', err); // Log the error
                setError('Gagal mengambil data berita'); // Handle error
                setLoading(false); // Mark loading as finished even if error
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Placeholder saat loading
    }

    if (error) {
        return <div>{error}</div>; // Placeholder untuk error
    }

    return (
        <section id="news" className="news-section">
            <h2>News</h2>
            <div className="news-grid">
                {Array.isArray(newsData) && newsData.map((news, index) => (
                    <NewsCard
                        key={index}
                        image={`http://127.0.0.1:8000/storage/${news.image || 'default.jpg'}`} // Default image jika kosong
                        title={news.judul_berita || 'Untitled'} // Default title jika kosong
                        link={news.URL || '#'} // Default link jika kosong
                    />
                ))}
            </div>
            <Link to="/" className="back-button">Back</Link>
        </section>
    );
};

export default NewsList;
