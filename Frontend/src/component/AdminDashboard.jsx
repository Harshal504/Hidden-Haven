import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocationService from '../service/LocationService';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalLocations: 0,
        totalUsers: 0, // In a real app, fetch this from a UserService
        pendingReviews: 5 // Mock data
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        // 1. Get User Info
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);

        // 2. Fetch Stats (Simulated)
        const fetchStats = async () => {
            try {
                // Get all locations to count them
                const locResponse = await LocationService.getAllLocations();
                
                setStats(prev => ({
                    ...prev,
                    totalLocations: locResponse.data.length
                }));
            } catch (error) {
                console.error("Error fetching stats", error);
            }
        };

        fetchStats();
    }, []);

    if (!user) return <div className="text-center mt-5">Please Login.</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">Admin Dashboard</h2>
                <span className="badge bg-secondary fs-6">Welcome, {user.name}</span>
            </div>

            {/* --- STATS CARDS --- */}
            <div className="row mb-5">
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3 shadow">
                        <div className="card-header">Total Locations</div>
                        <div className="card-body">
                            <h1 className="card-title fw-bold">{stats.totalLocations}</h1>
                            <p className="card-text">Active hidden gems on platform</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3 shadow">
                        <div className="card-header">Total Users</div>
                        <div className="card-body">
                            <h1 className="card-title fw-bold">12</h1> {/* Mock Data */}
                            <p className="card-text">Registered explorers</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning mb-3 shadow">
                        <div className="card-header">Pending Actions</div>
                        <div className="card-body">
                            <h1 className="card-title fw-bold">{stats.pendingReviews}</h1>
                            <p className="card-text">New reviews to moderate</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- QUICK ACTIONS --- */}
            <h4 className="mb-3 border-bottom pb-2">Quick Actions</h4>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card h-100 border-primary">
                        <div className="card-body">
                            <h5 className="card-title text-primary"><i className="fas fa-map-marked-alt me-2"></i>Manage Locations</h5>
                            <p className="card-text text-muted">Add new hidden places, update details, or remove outdated entries.</p>
                            <Link to="/locations-edit" className="btn btn-outline-primary">Go to Manager</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card h-100 border-secondary">
                        <div className="card-body">
                            <h5 className="card-title text-secondary"><i className="fas fa-users me-2"></i>User Management</h5>
                            <p className="card-text text-muted">View registered users and manage permissions (Coming Soon).</p>
                            <button className="btn btn-outline-secondary" disabled>Manage Users</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;