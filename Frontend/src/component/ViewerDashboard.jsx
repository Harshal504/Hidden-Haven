import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewerDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);
    }, []);

    if (!user) return <div className="text-center mt-5">Please Login.</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                {/* --- PROFILE SIDEBAR --- */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <div className="mb-3">
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                                    alt="Profile" 
                                    className="rounded-circle img-thumbnail" 
                                    style={{ width: '120px' }}
                                />
                            </div>
                            <h4 className="card-title fw-bold">{user.name}</h4>
                            <p className="text-muted mb-1">{user.email}</p>
                            <span className="badge bg-info text-dark mb-3">{user.role}</span>
                            
                            <hr />
                            <div className="text-start">
                                <p><strong>Phone:</strong> {user.phone || "Not Provided"}</p>
                                <p><strong>Member Since:</strong> {new Date().getFullYear()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <div className="col-md-8">
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body p-4">
                            <h3 className="card-title mb-4">Welcome back, Explorer! 🌍</h3>
                            <p className="lead text-muted">
                                Ready to discover your next adventure? Check out the latest hidden gems added to our collection.
                            </p>
                            <Link to="/locations" className="btn btn-primary btn-lg rounded-pill px-5">
                                Start Exploring
                            </Link>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="card h-100 border-0 shadow-sm bg-light">
                                <div className="card-body">
                                    <h5 className="card-title"><i className="fas fa-star text-warning me-2"></i>My Reviews</h5>
                                    <p className="card-text small text-muted">You haven't written any reviews yet. Visit a location to share your thoughts!</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card h-100 border-0 shadow-sm bg-light">
                                <div className="card-body">
                                    <h5 className="card-title"><i className="fas fa-comment-alt text-success me-2"></i>Feedback</h5>
                                    <p className="card-text small text-muted">Have a suggestion for us? Let us know how we can improve.</p>
                                    <Link to="/feedback" className="btn btn-sm btn-outline-success">Give Feedback</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewerDashboard;