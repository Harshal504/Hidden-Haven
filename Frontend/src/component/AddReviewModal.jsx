import React, { useState } from 'react';
import LocationService from '../service/LocationService';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddReviewModal = ({ show, handleClose, locationId, locationTitle }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Get User ID (Fallback to 1 if not logged in)
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        const userId = user ? user.id : 1; 

        // 2. Prepare Payload
        // Note: Make sure your Backend DTO expects 'userId' and 'locationId'
        const reviewData = {
            rating: parseInt(rating),
            comment: comment,
            userId: userId,
            locationId: locationId
        };

        try {
            await LocationService.addReview(reviewData);
            alert("Review submitted successfully!");
            // Reset form
            setRating(5);
            setComment("");
            handleClose(); // Close modal
        } catch (error) {
            console.error("Error submitting review", error);
            alert("Failed to submit review.");
        }
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1070 }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">Write a Review for {locationTitle}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {/* Rating Input */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Rating</label>
                                <select 
                                    className="form-select" 
                                    value={rating} 
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    <option value="5">5 Stars - Excellent</option>
                                    <option value="4">4 Stars - Very Good</option>
                                    <option value="3">3 Stars - Average</option>
                                    <option value="2">2 Stars - Poor</option>
                                    <option value="1">1 Star - Terrible</option>
                                </select>
                            </div>

                            {/* Comment Input */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Your Experience</label>
                                <textarea 
                                    className="form-control" 
                                    rows="4" 
                                    placeholder="Tell us what you liked or disliked..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                            <button type="submit" className="btn btn-success">Submit Review</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReviewModal;