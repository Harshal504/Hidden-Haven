import React, { useState, useEffect } from 'react';
import { getAllViewers, deleteUser } from '../service/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- FETCH USERS ---
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllViewers();
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching users", err);
            setError("Failed to load users. Ensure you are logged in as Admin.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // --- DELETE HANDLER ---
    const handleDelete = async (userId) => {
        if(window.confirm(`Are you sure you want to delete user ID: ${userId}? This action cannot be undone.`)) {
            try {
                await deleteUser(userId);
                alert("User deleted successfully.");
                // Refresh the list after deletion
                fetchUsers();
            } catch (err) {
                console.error("Error deleting user:", err);
                alert("Failed to delete user. Please try again.");
            }
        }
    };

    // --- EDIT HANDLER (Placeholder) ---
    const handleEdit = (userId) => {
        // Logic to open an edit modal would go here
        alert(`Edit functionality for User ID ${userId} coming soon!`);
    };

    if (loading) return (
        <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return <div className="alert alert-danger container mt-5">{error}</div>;

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">User Management</h2>
                <span className="badge bg-secondary">Total Users: {users.length}</span>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user.id} className="align-middle">
                                            <td>{user.id}</td>
                                            <td className="fw-bold text-secondary">{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone || "N/A"}</td>
                                            <td>
                                                <span className={`badge ${user.role === 'ADMIN' ? 'bg-warning text-dark' : 'bg-info text-white'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button 
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() => handleEdit(user.id)}
                                                >
                                                    <i className="fas fa-edit"></i> Edit
                                                </button>
                                                
                                                {/* Disable delete if the user is an Admin (Prevent self-lockout) */}
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(user.id)}
                                                    disabled={user.role === 'ADMIN'}
                                                    title={user.role === 'ADMIN' ? "Cannot delete Admins" : "Delete User"}
                                                >
                                                    <i className="fas fa-trash"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;