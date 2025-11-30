import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Call Backend
            const response = await axios.post('http://localhost:8080/auth/login', formData);
            
            // 1. Save User object to Local Storage (Navigation uses this)
            localStorage.setItem('user', JSON.stringify(response.data));
            
            // 2. Alert and Redirect
            alert("Login Successful!");
            
            // Redirect based on role
            if (response.data.role === 'ADMIN') {
                navigate('/admin-dashboard'); // Or '/locations-edit'
            } else if (response.data.role === 'VIEWER') {
                navigate('/viewer-dashboard'); // Or '/locations-edit'
            }else {
                navigate('/');
            }
            
            // Force reload to update Navigation bar state
            window.location.reload();

        } catch (err) {
            // Handle Error
            if (err.response && err.response.data) {
                setError(err.response.data); // Message from backend
            } else {
                setError("Login failed. Check console.");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h3 className="text-center mb-4 text-primary fw-bold">Login</h3>
                            
                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>

                            <div className="text-center mt-3">
                                <p className="small">
                                    Don't have an account? <Link to="/register">Register here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;