import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Admin/accountadmin.css';
import Sidebars from '../../component/Admin/sidebars';
import AddAdminForm from '../../component/Admin/addadminform'; // Import AddAdminForm
import EditAdminForm from '../../component/Admin/editadminform'; // Import EditAdminForm

function AccountUser() {
    const [userList, setUserList] = useState([]);
    const [searchUsername, setSearchUsername] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchRole, setSearchRole] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const token = localStorage.getItem('access_token'); // Ambil token dari localStorage

    // Fetch data pengguna dari API
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log('Fetched Users:', response.data);
                setUserList(response.data);
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, [token]);

    // Fungsi pencarian
    const handleSearch = () => {
        const filteredUsers = userList.filter((user) => {
            const matchUsername = user.username
                .toLowerCase()
                .includes(searchUsername.toLowerCase());
            const matchEmail = user.email
                .toLowerCase()
                .includes(searchEmail.toLowerCase());
            const matchRole = searchRole
                ? user.role.toLowerCase() === searchRole.toLowerCase()
                : true;

            return matchUsername && matchEmail && matchRole;
        });
        setUserList(filteredUsers);
    };

    // Tambah user baru
    const handleAddUser = (newUser) => {
        axios
            .post(
                'http://127.0.0.1:8000/api/users',
                newUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                setUserList([...userList, response.data]); // Tambahkan user baru ke state
                setShowAddModal(false);
            })
            .catch((error) => console.error('Error adding user:', error));
    };

    // Edit user
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    // Update user yang diedit
    const handleUpdateUser = (updatedUser) => {
        axios
            .put(
                `http://127.0.0.1:8000/api/users/${updatedUser.id}`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                const updatedList = userList.map((user) =>
                    user.id === updatedUser.id ? response.data : user
                );
                setUserList(updatedList);
                setShowEditModal(false);
            })
            .catch((error) => console.error('Error updating user:', error));
    };

    // Hapus user
    const handleDeleteUser = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setUserList(userList.filter((user) => user.id !== id));
            })
            .catch((error) => console.error('Error deleting user:', error));
    };

    // Toggle status user
    const toggleStatus = (id) => {
        const user = userList.find((user) => user.id === id);
        if (user) {
            const updatedUser = {
                ...user,
                status: user.status === 'Aktif' ? 'Nonaktif' : 'Aktif',
            };

            handleUpdateUser(updatedUser); // Perbarui status di backend dan state
        }
    };

    return (
        <div className="dashboard-container account-admin">
            <div className="sidebars">
                <Sidebars />
            </div>

            <div className="main-content account-admin-main">
                <section className="profile-details">
                    <h2>User Management</h2>
                </section>

                <div className="search-container account-admin-search">
                    <input
                        type="text"
                        placeholder="Search by Username"
                        value={searchUsername}
                        onChange={(e) => setSearchUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by Email"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                    />
                    <select
                        value={searchRole}
                        onChange={(e) => setSearchRole(e.target.value)}
                    >
                        <option value="">Search by Role</option>
                        <option value="Pengguna">Pengguna</option>
                        <option value="Admin">Admin</option>
                        <option value="SuperAdmin">SuperAdmin</option>
                    </select>
                    <button onClick={handleSearch}>Search</button>
                    <button onClick={() => setShowAddModal(true)}>Tambah User</button>
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>No Telp</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.no_telp || '-'}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className={`status-btn ${user.status === 'Aktif' ? 'active' : 'inactive'}`}
                                        onClick={() => toggleStatus(user.id)}
                                    >
                                        {user.status || 'Nonaktif'}
                                    </button>
                                </td>
                                <td className="row-action">
                                    <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showAddModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <AddAdminForm
                                setShowAddModal={setShowAddModal}
                                setUserList={setUserList}
                            />
                        </div>
                    </div>
                )}

                {showEditModal && selectedUser && (
                    <div className="modal">
                        <div className="modal-content">
                            <EditAdminForm
                                selectedUser={selectedUser}
                                setShowEditModal={setShowEditModal}
                                setUserList={setUserList}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AccountUser;
