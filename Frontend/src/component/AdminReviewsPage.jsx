import React, { useEffect, useState } from "react";
import LocationService from "../service/LocationService";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllReviews();
    }, []);

    const fetchAllReviews = () => {
        setLoading(true);
        LocationService.getAllReviews()   // <-- You will add this API
            .then(response => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching reviews", error);
                setLoading(false);
            });
    };

    const deleteReview = (reviewId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (!confirmDelete) return;

        LocationService.deleteReview(reviewId)   // <-- API call
            .then(() => {
                setReviews(prev => prev.filter(r => r.id !== reviewId));
            })
            .catch(error => {
                console.error("Error deleting review", error);
                alert("Failed to delete review.");
            });
    };

    const renderStars = (rating) => (
        <span className="text-warning">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
        </span>
    );

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="container py-4">
            <h2 className="text-primary mb-4">All Reviews (Admin Panel)</h2>

            {loading ? (
                <div className="text-center p-4">
                    <div className="spinner-border text-primary"></div>
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center text-muted">
                    <h5>No Reviews Found</h5>
                </div>
            ) : (
                <div className="row">
                    {reviews.map(review => (
                        <div key={review.id} className="col-md-6 col-lg-4 mb-3">
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h6 className="fw-bold text-primary">
                                        <i className="fas fa-user-circle me-1"></i> {review.userName}
                                    </h6>

                                    <small className="text-muted">
                                        {formatDate(review.createdOn)}
                                    </small>

                                    <div className="my-2">
                                        {renderStars(review.rating)}
                                    </div>

                                    <p className="text-secondary">
                                        "{review.comment}"
                                    </p>

                                    <button
                                        className="btn btn-danger btn-sm w-100"
                                        onClick={() => deleteReview(review.id)}
                                    >
                                        Delete Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminReviewsPage;
