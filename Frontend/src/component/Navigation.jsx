import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getUser, removeUser } from '../Service/UserRoleService';
import { removeToken } from '../Service/TokenService';

const Navigation = () => {
    const navigate = useNavigate();

    // 1. Get User Data from Service
    const user = getUser();

    const handleLogout = () => {
        removeUser();
        removeToken();
        alert("Logged out successfully");
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold" to={user ? (user.role === 'ADMIN' ? "/admin-dashboard" : "/viewer-dashboard") : "/"}>
                    🌍 Hidden Places
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        {/* --- SCENARIO A: NOT LOGGED IN (Guest View) --- */}
                        {!user && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">About Us</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/feedback">Give Feedback</NavLink>
                                </li>
                            </>
                        )}

                        {/* --- SCENARIO B: LOGGED IN (Common for Admin & Viewer) --- */}
                        {user && user.role === 'VIEWER' &&(
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/locations">Explore Locations</NavLink>
                                </li>
                                
                            </>
                        )}

                        {/* --- SCENARIO C: ADMIN ONLY --- */}
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
                            // --- GUEST BUTTONS ---
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary" to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            // --- LOGGED IN USER DROPDOWN ---
                            <>
                                <li className="nav-item">
                                    <NavLink 
                                        className="nav-link text-info me-2" 
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