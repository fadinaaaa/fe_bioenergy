import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Admin/alamatpage.css';
import Sidebars from '../../component/Admin/sidebars';
import AddAlamatForm from '../../component/Admin/addalamatform';
import EditAlamatForm from '../../component/Admin/editalamatform';

function AlamatPage() {
    const [alamatList, setAlamatList] = useState([]);
    const [searchAddress, setSearchAddress] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editAlamat, setEditAlamat] = useState(null);

    const token = localStorage.getItem('access_token'); // Ambil token dari localStorage

    // Fetch Alamat dari API
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/alamats', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('Fetched Data:', response.data);
                setAlamatList(response.data.data); // Simpan data alamat ke state
            })
            .catch((error) => console.error('Error fetching alamat:', error));
    }, [token]);

    // Handle Add Alamat
    const handleAddAlamat = (newAlamat) => {
        axios
            .post(
                'http://127.0.0.1:8000/api/alamats',
                newAlamat,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                setAlamatList([...alamatList, response.data]); // Tambahkan alamat baru ke state
                setShowAddModal(false);
            })
            .catch((error) => console.error('Error adding alamat:', error));
    };

    // Handle Update/Edit Alamat
    const handleUpdateAlamat = (updatedAlamat) => {
        axios
            .put(
                `http://127.0.0.1:8000/api/alamats/${updatedAlamat.id}`,
                updatedAlamat,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                const updatedList = alamatList.map((alamat) =>
                    alamat.id === updatedAlamat.id ? response.data : alamat
                );
                setAlamatList(updatedList);
                setShowEditModal(false);
            })
            .catch((error) => console.error('Error updating alamat:', error));
    };

    // Handle Delete Alamat
    const handleDelete = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/alamats/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                const updatedList = alamatList.filter((alamat) => alamat.id !== id);
                setAlamatList(updatedList);
            })
            .catch((error) => console.error('Error deleting alamat:', error));
    };

    // Filter Alamat Berdasarkan Pencarian
    const handleSearch = () => {
        if (searchAddress.trim()) {
            const filteredList = alamatList.filter((alamat) =>
                alamat.alamat.toLowerCase().includes(searchAddress.toLowerCase())
            );
            setAlamatList(filteredList);
        } else {
            // Fetch ulang data jika input pencarian kosong
            axios
                .get('http://127.0.0.1:8000/api/alamats', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => setAlamatList(response.data.data))
                .catch((error) => console.error('Error fetching alamat:', error));
        }
    };

    return (
        <div className="dashboard-container alamat-admin">
            <div className="sidebars">
                <Sidebars />
            </div>

            <div className="main-content alamat-admin-main">
                <section className="profile-details">
                    <h2>Alamat</h2>
                </section>

                {/* Search bar */}
                <div className="search-container alamat-admin-search">
                    <input
                        type="text"
                        placeholder="Search by Address"
                        value={searchAddress}
                        onChange={(e) => setSearchAddress(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    <button onClick={() => setShowAddModal(true)}>Add Alamat</button>
                </div>

                {/* Table for Alamat */}
                <table className="alamat-admin-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Alamat</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alamatList.map((alamat, index) => (
                            <tr key={alamat.id}>
                                <td>{index + 1}</td>
                                <td>{alamat.alamat}</td>
                                <td>{alamat.longitude}</td>
                                <td>{alamat.latitude}</td>
                                <td className="row-action">
                                    <button
                                        className="alamat-edit-button"
                                        onClick={() => {
                                            setEditAlamat(alamat);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Show Add Alamat Modal */}
                {showAddModal && (
                    <AddAlamatForm onAdd={handleAddAlamat} onCancel={() => setShowAddModal(false)} />
                )}

                {/* Show Edit Alamat Modal */}
                {showEditModal && editAlamat && (
                    <EditAlamatForm
                        alamat={editAlamat}
                        onUpdate={handleUpdateAlamat}
                        onCancel={() => setShowEditModal(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default AlamatPage;
