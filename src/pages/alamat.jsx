import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormAlamat from '../component/formalamat';
import FormEditAlamat from '../component/formeditalamat';
import '../css/alamat.css';
import Sidebar from '../component/sidebar';

function Alamat() {
    const [userData, setUserData] = useState({
        nama: '',
        email: '',
        phone: '',
        username: '',
        alamat: [], // Properti alamat untuk menyimpan data dari API
    });

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentAlamat, setCurrentAlamat] = useState(null);

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setUserData((prevData) => ({
                ...prevData,
                username,
            }));
        }
    }, []);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/alamats', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('API Response:', response.data); // Debug respons API
                setUserData((prevData) => ({
                    ...prevData,
                    alamat: Array.isArray(response.data.data) ? response.data.data : [], // Gunakan data dari response.data.data
                }));
            })
            .catch((error) => console.error('Error fetching alamat:', error));
    }, [token]);

    const handleAddAlamat = (newAlamat) => {
        axios
            .post(
                'http://127.0.0.1:8000/api/alamats',
                {
                    alamat: newAlamat.alamat,
                    longitude: 0,
                    latitude: 0,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                setUserData((prevData) => ({
                    ...prevData,
                    alamat: [...prevData.alamat, response.data], // Tambahkan data baru ke state
                }));
                setIsFormVisible(false);
            })
            .catch((error) => console.error('Error adding alamat:', error));
    };

    const handleDeleteAlamat = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/alamats/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setUserData((prevData) => ({
                    ...prevData,
                    alamat: prevData.alamat.filter((alamat) => alamat.id !== id), // Filter data untuk menghapus alamat
                }));
            })
            .catch((error) => console.error('Error deleting alamat:', error));
    };

    const handleEditAlamat = (alamat) => {
        setCurrentAlamat(alamat);
        setIsEditModalVisible(true);
    };

    const handleSaveEditedAlamat = (editedAlamat) => {
        axios
            .put(
                `http://127.0.0.1:8000/api/alamats/${editedAlamat.id}`,
                {
                    alamat: editedAlamat.alamat,
                    longitude: 0,
                    latitude: 0,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                setUserData((prevData) => ({
                    ...prevData,
                    alamat: prevData.alamat.map((alamat) =>
                        alamat.id === editedAlamat.id ? editedAlamat : alamat
                    ), // Update data di state
                }));
                setIsEditModalVisible(false);
            })
            .catch((error) => console.error('Error editing alamat:', error));
    };

    return (
        <div className="alamatmain-content">
            <div className="sidebar">
                <Sidebar />
            </div>
            <section className="profile-details">
                <h2 className="alamat-h2">Alamat</h2>
            </section>

            <section className="alamat-section">
                <div className="container-new-button-alamat">
                    <button
                        className="new-button-alamat"
                        onClick={() => setIsFormVisible(true)}
                    >
                        Tambah Alamat
                    </button>
                </div>

                <table className="alamat-table">
                    <thead>
                        <tr>
                            <th className="alamat-th">No</th>
                            <th className="alamat-th">Alamat</th>
                            <th className="alamat-th">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(userData.alamat) && userData.alamat.length > 0 ? (
                            userData.alamat.map((alamat, index) => (
                                <tr key={alamat.id}>
                                    <td className="alamat-td">{index + 1}</td>
                                    <td className="alamat-td">{alamat.alamat}</td>
                                    <td className="alamat-td row-action">
                                        <div className="alamat-action-buttons">
                                            <button
                                                className="alamat-edit-button"
                                                onClick={() => handleEditAlamat(alamat)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="alamat-delete-button"
                                                onClick={() => handleDeleteAlamat(alamat.id)}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>
                                    Tidak ada alamat tersedia
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>


                {isFormVisible && (
                    <div className="form-container">
                        <FormAlamat
                            onSubmit={handleAddAlamat}
                            onCancel={() => setIsFormVisible(false)}
                        />
                    </div>
                )}

                {isEditModalVisible && currentAlamat && (
                    <FormEditAlamat
                        alamat={currentAlamat}
                        onClose={() => setIsEditModalVisible(false)}
                        onSave={handleSaveEditedAlamat}
                    />
                )}
            </section>
        </div>
    );
}

export default Alamat;
