import React, { useState, useEffect } from 'react';
import LocationService from '../service/LocationService';
import ReviewsModal from './ReviewsModal'; 
import AddReviewModal from './AddReviewModal'; // 1. IMPORT NEW MODAL
import 'bootstrap/dist/css/bootstrap.min.css';

// Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- FILTERS ---
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedState, setSelectedState] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    // Review Display Modal State
    const [showReviewsModal, setShowReviewsModal] = useState(false);
    const [reviewLocationId, setReviewLocationId] = useState(null);
    const [reviewLocationTitle, setReviewLocationTitle] = useState("");

    // --- 2. ADD REVIEW MODAL STATE ---
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);

    // Fetch Data
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await LocationService.getAllLocations();
                setLocations(response.data);
                setFilteredLocations(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching locations:", err);
                setError("Could not load locations. Is backend running?");
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = locations;
        if (selectedCategory !== 'All') result = result.filter(loc => loc.category === selectedCategory);
        if (selectedState !== 'All') result = result.filter(loc => loc.state === selectedState);
        if (searchTerm) result = result.filter(loc => loc.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredLocations(result);
    }, [selectedCategory, selectedState, searchTerm, locations]);

    const uniqueCategories = ['All', ...new Set(locations.map(loc => loc.category))];
    const uniqueStates = ['All', ...new Set(locations.map(loc => loc.state))];

    // --- HANDLERS ---
    const handleViewClick = (location) => { setSelectedLocation(location); setShowModal(true); };
    const handleCloseModal = () => { setShowModal(false); setSelectedLocation(null); };
    
    const handleOpenReviews = () => {
        if (selectedLocation) {
            setReviewLocationId(selectedLocation.id);
            setReviewLocationTitle(selectedLocation.title);
            setShowReviewsModal(true);
        }
    };
    const handleCloseReviews = () => { setShowReviewsModal(false); setReviewLocationId(null); };

    // --- 3. HANDLERS FOR ADD REVIEW ---
    const handleOpenAddReview = () => {
        if (selectedLocation) {
            // Close the details modal first? Optional. Let's keep it stacked.
            // Or close main modal to focus on review:
            // setShowModal(false); 
            setShowAddReviewModal(true);
        }
    };
    const handleCloseAddReview = () => {
        setShowAddReviewModal(false);
    };

    const renderStars = (rating) => {
        const safeRating = rating || 0; 
        const rounded = Math.round(safeRating);
        return ( <span className="text-warning me-2">{'★'.repeat(rounded)}{'☆'.repeat(5 - rounded)}</span> );
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    if (error) return <div className="alert alert-danger container mt-5">{error}</div>;

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4 fw-bold text-primary">Explore Hidden Gems</h2>
            
            {/* Filter Section */}
            <div className="row mb-4 p-3 bg-light rounded shadow-sm align-items-end g-2">
                <div className="col-md-4">
                    <label className="fw-bold mb-1">Search by Name:</label>
                    <input type="text" className="form-control" placeholder="Type location name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                <div className="col-md-3">
                    <label className="fw-bold mb-1">Category:</label>
                    <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {uniqueCategories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="fw-bold mb-1">State:</label>
                    <select className="form-select" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                        {uniqueStates.map(st => (<option key={st} value={st}>{st}</option>))}
                    </select>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-secondary w-100" onClick={() => { setSelectedCategory('All'); setSelectedState('All'); setSearchTerm(''); }}>Reset Filters</button>
                </div>
            </div>

            {/* List View */}
            <div className="row">
                {filteredLocations.map((loc) => (
                    <div className="col-12 my-3" key={loc.id}>
                        <div className="card shadow-sm border-0 d-flex flex-row overflow-hidden" style={{ height: '220px' }}>
                            <div style={{ width: '35%', minWidth: '200px' }}>
                                <img src={loc.imageUrl} className="img-fluid h-100 w-100" alt={loc.title} style={{ objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x220?text=No+Image'; }} />
                            </div>
                            <div className="card-body d-flex flex-column p-4" style={{ width: '65%' }}>
                                <div className="d-flex justify-content-between align-items-start">
                                    <div><h4 className="card-title fw-bold mb-1">{loc.title}</h4><span className="badge bg-secondary">{loc.category}</span></div>
                                    <div className="text-end"><div className="mb-1">{renderStars(loc.averageRating)}</div><small className="text-muted">({loc.averageRating ? loc.averageRating : 0}/5)</small></div>
                                </div>
                                <p className="text-muted mt-3 mb-auto text-truncate" style={{ maxWidth: '90%' }}><i className="fas fa-map-marker-alt me-2 text-danger"></i>{loc.city}, {loc.state}</p>
                                <div className="mt-3"><button className="btn btn-primary px-4 rounded-pill" onClick={() => handleViewClick(loc)}>View Details</button></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- DETAILS MODAL --- */}
            {showModal && selectedLocation && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title fw-bold">{selectedLocation.title}</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <img src={selectedLocation.imageUrl} className="img-fluid rounded shadow-sm" alt={selectedLocation.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }} />
                                    </div>
                                    <div className="col-md-6">
                                        <span className="badge bg-secondary mb-3">{selectedLocation.category}</span>
                                        <h6 className="fw-bold mt-2">Description</h6>
                                        <p className="text-muted" style={{ fontSize: '0.95rem' }}>{selectedLocation.description}</p>
                                        <h6 className="fw-bold">Address</h6>
                                        <p className="text-muted mb-2"><i className="fas fa-map-marker-alt me-2 text-danger"></i>{selectedLocation.address}, {selectedLocation.city}, {selectedLocation.state}</p>
                                        <div className="border rounded overflow-hidden mb-3" style={{ height: '250px' }}>
                                            <MapContainer center={[selectedLocation.latitude, selectedLocation.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
                                                <Marker position={[selectedLocation.latitude, selectedLocation.longitude]}><Popup>{selectedLocation.title}</Popup></Marker>
                                            </MapContainer>
                                        </div>
                                        <div className="alert alert-info p-2 mb-0"><strong>Average Rating: </strong> {selectedLocation.averageRating || 0} / 5 Stars</div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                
                                {/* 4. ADD REVIEW BUTTON */}
                                <button type="button" className="btn btn-success me-2" onClick={handleOpenAddReview}>
                                    <i className="fas fa-pen me-1"></i> Write a Review
                                </button>

                                <button type="button" className="btn btn-primary" onClick={handleOpenReviews}>
                                    See Reviews
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews List Modal */}
            <ReviewsModal 
                show={showReviewsModal} 
                handleClose={handleCloseReviews} 
                locationId={reviewLocationId} 
                locationTitle={reviewLocationTitle} 
            />

            {/* 5. ADD REVIEW FORM MODAL */}
            <AddReviewModal 
                show={showAddReviewModal} 
                handleClose={handleCloseAddReview}
                locationId={selectedLocation ? selectedLocation.id : null}
                locationTitle={selectedLocation ? selectedLocation.title : ""}
            />
        </div>
    );
};

export default Locations;