import React, { useState, useEffect } from 'react';
import '../../css/Admin/layananpage.css';
import Sidebars from '../../component/Admin/sidebars';
import AddLayananForm from '../../component/Admin/addlayananform'; // Import AddLayananForm
import EditLayananForm from '../../component/Admin/editlayananform'; // Import EditLayananForm

function LayananPage() {
    const [layananList, setLayananList] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
    const [searchMonth, setSearchMonth] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedLayanan, setSelectedLayanan] = useState(null);

    useEffect(() => {
        setLayananList([
            { id: 1, category: 'industri', address: 'Jl. Merdeka No.1', date: '2024-01-15', status: 'selesai', isActive: true },
            { id: 2, category: 'rumah tangga', address: 'Jl. Sudirman No.5', date: '2024-02-20', status: 'diajukan', isActive: true },
        ]);
    }, []);

    const handleSearch = () => {
        console.log(`Searching by Category: ${searchCategory}, Month: ${searchMonth}, Year: ${searchYear}`);
    };

    const handleAddLayanan = (newLayanan) => {
        setLayananList([...layananList, { ...newLayanan, id: layananList.length + 1 }]);
        setShowAddModal(false); // Close modal after adding
    };

    const handleUpdateLayanan = (updatedLayanan) => {
        const updatedList = layananList.map((layanan) =>
            layanan.id === updatedLayanan.id ? updatedLayanan : layanan
        );
        setLayananList(updatedList);
        setShowEditModal(false); // Close modal after updating
        setSelectedLayanan(null);
    };

    const handleDeleteLayanan = (id) => {
        const updatedList = layananList.filter((layanan) => layanan.id !== id);
        setLayananList(updatedList);
    };

    const openEditModal = (layanan) => {
        setSelectedLayanan(layanan);
        setShowEditModal(true); // Show edit modal
    };

    return (
        <div className="dashboard-container layanan-admin">
            <div className="sidebars">
                <Sidebars />
            </div>

            <div className="main-content layanan-admin-main">
                <section className="profile-details">
                    <h2>Layanan</h2>
                </section>

                <div className="search-container layanan-admin-search">
                    <input
                        type="text"
                        placeholder="Search by Category"
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Search by Month"
                        value={searchMonth}
                        onChange={(e) => setSearchMonth(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Search by Year"
                        value={searchYear}
                        onChange={(e) => setSearchYear(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    <button onClick={() => setShowAddModal(true)}>Tambah Layanan</button>
                </div>

                <table className="layanan-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kategori</th>
                            <th>Tanggal</th>
                            <th>Alamat</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {layananList.map((layanan, index) => (
                            <tr key={layanan.id}>
                                <td>{index + 1}</td>
                                <td>{layanan.category}</td>
                                <td>{layanan.date}</td>
                                <td>{layanan.address}</td>
                                <td>{layanan.status}</td>
                                <td className="row-action">
                                    <button onClick={() => openEditModal(layanan)}>Edit</button>
                                    <button onClick={() => handleDeleteLayanan(layanan.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal Add Layanan */}
                {showAddModal && (
                    <AddLayananForm onAdd={handleAddLayanan} onCancel={() => setShowAddModal(false)} />
                )}

                {/* Modal Edit Layanan */}
                {showEditModal && selectedLayanan && (
                    <EditLayananForm
                        layanan={selectedLayanan}
                        onUpdate={handleUpdateLayanan}
                        onCancel={() => setShowEditModal(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default LayananPage;
