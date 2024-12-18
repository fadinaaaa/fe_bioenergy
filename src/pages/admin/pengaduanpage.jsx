import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Admin/pengaduanpage.css';
import Sidebars from '../../component/Admin/sidebars'; // Import Sidebar component
import AddPengaduanForm from '../../component/Admin/addpengaduanform'; // Import AddPengaduanForm component
import EditPengaduanForm from '../../component/Admin/editpengaduanform'; // Import EditPengaduanForm component
import axios from 'axios';

function PengaduanPage() {
    const [pengaduanList, setPengaduanList] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
    const [searchMonth, setSearchMonth] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [filteredPengaduan, setFilteredPengaduan] = useState([]);
    const [error, setError] = useState('');

    // State untuk kontrol modal
    const [showAddModal, setShowAddModal] = useState(false); // Menyimpan status modal Add Pengaduan
    const [showEditModal, setShowEditModal] = useState(false); // Menyimpan status modal Edit Pengaduan
    const [editPengaduan, setEditPengaduan] = useState(null); // Menyimpan data pengaduan yang sedang diedit

    useEffect(() => {
        const token = localStorage.getItem("token")
        // Ambil data pengaduan dari API saat komponen dimuat
        const fetchPengaduan = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/pengaduan', {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Kirim token di header
                        'Content-Type': 'multipart/form-data',
                    }
                });
                if (response.data && Array.isArray(response.data)) {
                    setPengaduanList(response.data);  // Menyimpan data pengaduan dari API
                    setFilteredPengaduan(response.data);  // Menyaring data pengaduan sesuai kriteria
                } else {
                    setPengaduanList([]);  // Jika data tidak valid, set sebagai array kosong
                    setFilteredPengaduan([]);
                }
            } catch (error) {
                console.error('Terjadi kesalahan saat mengambil data pengaduan:', error);
                setPengaduanList([]);  // Jika terjadi error, set sebagai array kosong
                setFilteredPengaduan([]);
            }
        };

        fetchPengaduan();  // Panggil fungsi untuk mengambil data pengaduan
    }, []);

    const handleSearch = () => {
        if (!pengaduanList || pengaduanList.length === 0) return;  // Cek apakah ada data

        const filtered = pengaduanList.filter(pengaduan => {
            const matchesCategory = searchCategory ? pengaduan.kategori.includes(searchCategory) : true;
            const matchesMonth = searchMonth ? pengaduan.tanggalPengaduan.includes(searchMonth) : true;
            const matchesYear = searchYear ? pengaduan.tanggalPengaduan.includes(searchYear) : true;

            return matchesCategory && matchesMonth && matchesYear;
        });

        setFilteredPengaduan(filtered);
    };

    const handleAddPengaduan = async (newPengaduan) => {
        try {
            const token = localStorage.getItem('access_token');
            
            if (!token) {
                throw new Error("Token tidak ditemukan. Harap login terlebih dahulu.");
            }
    
            // Kirim data pengaduan baru ke backend API dengan header Authorization
            const response = await axios.post('http://127.0.0.1:8000/api/pengaduan', newPengaduan, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Kirim token di header
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            // Menambahkan pengaduan yang baru ke daftar
            setPengaduanList([...pengaduanList, response.data]);
            setFilteredPengaduan([...filteredPengaduan, response.data]);
    
            setShowAddModal(false);
        } catch (error) {
            console.error('Terjadi kesalahan saat menambahkan pengaduan:', error);
            if (error.response) {
                setError(error.response.data.message || 'Terjadi kesalahan saat menambahkan pengaduan');
            } else {
                setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
            }
        }
    };

    const handleEdit = (pengaduan) => {
        // Set pengaduan yang dipilih untuk diedit
        setEditPengaduan(pengaduan);
        // Tampilkan modal EditPengaduanForm
        setShowEditModal(true);
    };

    const handleUpdatePengaduan = async (updatedPengaduan) => {
        try {
            // Kirim data yang telah diperbarui ke backend API menggunakan PUT
            const response = await axios.put(`http://127.0.0.1:8000/api/pengaduan/${updatedPengaduan.id}`, updatedPengaduan);

            // Update pengaduan yang sudah diperbarui dalam daftar
            const updatedList = pengaduanList.map((pengaduan) =>
                pengaduan.id === updatedPengaduan.id ? response.data : pengaduan
            );

            setPengaduanList(updatedList);
            setFilteredPengaduan(updatedList);

            setShowEditModal(false);
        } catch (error) {
            console.error('Terjadi kesalahan saat mengupdate pengaduan:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Menghapus pengaduan menggunakan DELETE
            await axios.delete(`http://127.0.0.1:8000/api/pengaduan/${id}`);

            // Menghapus pengaduan dari daftar setelah berhasil dihapus
            const updatedList = pengaduanList.filter((pengaduan) => pengaduan.id !== id);
            setPengaduanList(updatedList);
            setFilteredPengaduan(updatedList);
        } catch (error) {
            console.error('Terjadi kesalahan saat menghapus pengaduan:', error);
        }
    };

    const handleDetailClick = (id) => {
        // Redirect ke halaman detail pengaduan
        console.log("Detail pengaduan ID:", id);
    };

    return (
        <div className="dashboard-container pengaduan-admin">
            <div className="sidebars">
                <Sidebars />
            </div>

            <div className="main-content pengaduan-admin-main">
                <section className="profile-details">
                    <h2>Pengaduan</h2>
                </section>

                <div className="search-container pengaduan-admin-search">
                    <input
                        type="text"
                        placeholder="Search by Category"
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by Month"
                        value={searchMonth}
                        onChange={(e) => setSearchMonth(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by Year"
                        value={searchYear}
                        onChange={(e) => setSearchYear(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    <button onClick={() => setShowAddModal(true)}>Tambah Pengaduan</button>
                </div>

                <table className="pengaduan-admin-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Keterangan Masalah</th>
                            <th>Kategori</th>
                            <th>Foto Pengaduan</th>
                            <th>Tanggal Pengaduan</th>
                            <th>Foto Penyelesaian</th>
                            <th>Tanggal Penyelesaian</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPengaduan && filteredPengaduan.length > 0 ? (
                            filteredPengaduan.map((pengaduan, index) => (
                                <tr key={pengaduan.id}>
                                    <td>{index + 1}</td>
                                    <td>{pengaduan.keteranganMasalah}</td>
                                    <td>{pengaduan.kategori}</td>
                                    <td><img src={pengaduan.fotoPengaduan} alt="Complaint" width="50" height="50" /></td>
                                    <td>{pengaduan.tanggalPengaduan}</td>
                                    <td><img src={pengaduan.fotoPenyelesaian} alt="Completed" width="50" height="50" /></td>
                                    <td>{pengaduan.tanggalPenyelesaian}</td>
                                    <td>{pengaduan.status}</td>
                                    <td className="action-button">
                                        <button onClick={() => handleEdit(pengaduan)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(pengaduan.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center' }}>Tidak ada data pengaduan yang ditemukan</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Pengaduan Modal */}
            {showAddModal && (
                <AddPengaduanForm
                    onSubmit={handleAddPengaduan}
                    onClose={() => setShowAddModal(false)}
                />
            )}

            {/* Edit Pengaduan Modal */}
            {showEditModal && editPengaduan && (
                <EditPengaduanForm
                    pengaduan={editPengaduan}
                    onUpdate={handleUpdatePengaduan}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </div>
    );
}

export default PengaduanPage;
