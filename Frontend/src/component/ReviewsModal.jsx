import React, { useState, useEffect } from 'react';
import LocationService from '../service/LocationService';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewsModal = ({ show, handleClose, locationTitle, locationId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show && locationId) {
            setLoading(true);
            LocationService.getReviewsByLocationId(locationId)
                .then(response => {
                    setReviews(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching reviews", error);
                    setLoading(false);
                });
        }
    }, [show, locationId]);

    const renderStars = (rating) => {
        return (
            <span className="text-warning">
                {'★'.repeat(rating)}
                {'☆'.repeat(5 - rating)}
            </span>
        );
    };

    const formatDate = (dateString) => {
        if(!dateString) return "";
        return new Date(dateString).toLocaleDateString();
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Reviews for {locationTitle}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body bg-light">
                        {loading ? (
                            <div className="text-center p-3">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review.id} className="card mb-3 border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="card-subtitle fw-bold text-primary">
                                                <i className="fas fa-user-circle me-1"></i> {review.userName}
                                            </h6>
                                            <small className="text-muted">{formatDate(review.createdOn)}</small>
                                        </div>
                                        <div className="mb-2">
                                            {renderStars(review.rating)}
                                        </div>
                                        <p className="card-text text-secondary">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-4 text-muted">
                                <h5>No reviews yet.</h5>
                                <p>Be the first to share your experience!</p>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsModal;