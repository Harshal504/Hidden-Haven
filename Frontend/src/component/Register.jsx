import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Removed to prevent build errors if package is missing

const Register = () => {
    const navigate = useNavigate();
    
    // Default role is set to 'VIEWER' here
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '', // Added for validation
        phone: '',
        role: 'VIEWER' 
    });
    
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. Password Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            // 2. Prepare Data (Exclude confirmPassword from payload)
            const { confirmPassword, ...dataToSend } = formData;

            // 3. Call Backend
            await axios.post('http://localhost:8080/auth/register', dataToSend);
            
            alert("Registration Successful! Please Login.");
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data); // Error from backend (e.g., Email already exists)
            } else {
                setError("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h3 className="text-center mb-4 text-success fw-bold">Create Account</h3>
                            
                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Name */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    
                                    {/* Phone */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                                </div>

                                <div className="row">
                                    {/* Password */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            name="password" 
                                            value={formData.password} 
                                            onChange={handleChange} 
                                            required 
                                            minLength="6"
                                        />
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Confirm Password</label>
                                        <input 
                                            type="password" 
                                            className={`form-control ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'is-invalid' : ''}`}
                                            name="confirmPassword" 
                                            value={formData.confirmPassword} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                        <div className="invalid-feedback">
                                            Passwords must match.
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success w-100 mt-3">Register</button>
                            </form>

                            <div className="text-center mt-3">
                                <p className="small">
                                    Already have an account? <Link to="/login">Login here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;