import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();

    // 1. Get User Data
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        alert("Logged out successfully");
        navigate('/login');
        window.location.reload(); 
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    🌍 Hidden Places
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* --- PUBLIC LINKS (Always Visible) --- */}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About Us</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>

                        {/* --- VIEWER & ADMIN SHARED LINKS (Must be logged in) --- */}
                        {user && user.role === 'VIEWER' && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/locations">Explore Locations</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/feedback">Give Feedback</NavLink>
                                </li>
                            </>
                        )}

                        {/* --- ADMIN ONLY LINKS --- */}
                        {user && user.role === 'ADMIN' && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-warning" to="/locations/edit">
                                        Manage Locations
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-warning" to="/admin/users">
                                        Manage Users
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {!user ? (
                            // --- GUEST LINKS ---
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary" to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            // --- LOGGED IN USER ---
                            <>
                                <li className="nav-item">
                                    <NavLink 
                                        className="nav-link text-info" 
                                        to={user.role === 'ADMIN' ? "/admin-dashboard" : "/viewer-dashboard"}
                                    >
                                        {user.role === 'ADMIN' ? "Admin Dashboard" : "My Dashboard"}
                                    </NavLink>
                                </li>
                                
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                        Hello, {user.name}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <button className="dropdown-item text-danger" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;