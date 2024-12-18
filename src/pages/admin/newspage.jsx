import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import '../../css/Admin/news.css';
import Sidebars from '../../component/Admin/sidebars';
import AddNewsForm from '../../component/Admin/addnewsform';
import EditNewsForm from '../../component/Admin/editnewsform';

function News() {
    const [newsList, setNewsList] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchMonth, setSearchMonth] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);

    // Fetch news list from API
    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get('http://127.0.0.1:8000/api/news', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Fetched news:', response.data);
            setNewsList(response.data.data); // Use array from response.data.data
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleSearch = () => {
        // Implement the search logic here if needed
        console.log('Searching for:', searchTitle, searchMonth, searchYear);
        // You could filter the newsList based on the search criteria here.
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setEditingNews(null); // Reset editing news
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://127.0.0.1:8000/api/news/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNewsList(newsList.filter((news) => news.id !== id));
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const handleAddNews = async (newNews) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://127.0.0.1:8000/api/news', newNews, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNewsList([...newsList, response.data]);
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error adding news:', error);
        }
    };

    const handleEditNews = async ({ id, data }) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.put(`http://127.0.0.1:8000/api/news/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNewsList(prevList =>
                prevList.map(news => (news.id === id ? response.data : news))
            );
            setIsEditModalOpen(false); // Close modal after editing
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    const openEditModal = (news) => {
        setEditingNews(news);
        setIsEditModalOpen(true);
    };

    return (
        <div className="dashboard-container">
            <div className="sidebars">
                <Sidebars />
            </div>

            <div className="main-content">
                <section className="profile-details">
                    <h2>News</h2>
                </section>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <input
                        type="month"
                        value={searchMonth}
                        onChange={(e) => setSearchMonth(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        value={searchYear}
                        onChange={(e) => setSearchYear(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    <button onClick={() => setIsAddModalOpen(true)}>Tambah Berita</button>
                </div>

                <table className="news-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Judul</th>
                            <th>Image</th>
                            <th>Tanggal</th>
                            <th>URL</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsList.length > 0 ? (
                            newsList.map((news, index) => (
                                <tr key={news.id}>
                                    <td>{index + 1}</td>
                                    <td>{news.judul_berita}</td>
                                    <td>
                                        <img src={`http://127.0.0.1:8000/storage/${news.image}`} alt="image" className="news-image" />
                                    </td>
                                    <td>{news.tanggal_berita}</td>
                                    <td>
                                        <a href={news.URL} target="_blank" rel="noopener noreferrer">View</a>
                                    </td>
                                    <td className="newsaction-buttons">
                                        <button className="edit-button" onClick={() => openEditModal(news)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(news.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No news available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isAddModalOpen && (
                <AddNewsForm
                    onSubmit={handleAddNews}
                    onClose={handleCloseModal}
                />
            )}

            {isEditModalOpen && editingNews && (
                <EditNewsForm
                    news={editingNews}
                    onSubmit={handleEditNews}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default News;