import React, { useState, useEffect } from 'react';
import LocationService from '../service/LocationService';
import LocationEditModal from './LocationEditModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const LocationsEdit = () => {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- FILTERS ---
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedState, setSelectedState] = useState('All');
    const [searchTerm, setSearchTerm] = useState(''); // NEW: Search Filter
    
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [locationToEdit, setLocationToEdit] = useState(null);

    const fetchLocations = async () => {
        try {
            const response = await LocationService.getAllLocations();
            setLocations(response.data);
            setFilteredLocations(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching locations:", err);
            setError("Could not load locations.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    // --- FILTER LOGIC (Updated) ---
    useEffect(() => {
        let result = locations;
        if (selectedCategory !== 'All') result = result.filter(loc => loc.category === selectedCategory);
        if (selectedState !== 'All') result = result.filter(loc => loc.state === selectedState);
        // Search Logic
        if (searchTerm) {
            result = result.filter(loc => 
                loc.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredLocations(result);
    }, [selectedCategory, selectedState, searchTerm, locations]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await LocationService.deleteLocation(id);
                alert("Deleted!");
                fetchLocations();
            } catch (err) {
                alert("Failed to delete.");
            }
        }
    };

    const handleEditClick = (location) => { setLocationToEdit(location); setShowEditModal(true); };
    const handleCloseEditModal = () => { setShowEditModal(false); setLocationToEdit(null); };
    const handleViewClick = (location) => { setSelectedLocation(location); setShowViewModal(true); };
    const handleCloseViewModal = () => { setShowViewModal(false); setSelectedLocation(null); };

    const uniqueCategories = ['All', ...new Set(locations.map(loc => loc.category))];
    const uniqueStates = ['All', ...new Set(locations.map(loc => loc.state))];

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    if (error) return <div className="alert alert-danger container mt-5">{error}</div>;

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4 fw-bold text-warning">Manage Locations (Admin)</h2>
            
            {/* --- FILTER SECTION (Updated) --- */}
            <div className="row mb-4 p-3 bg-light rounded shadow-sm align-items-end g-2">
                <div className="col-md-4">
                    <label className="fw-bold mb-1">Search by Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Type location name..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                    <button className="btn btn-secondary w-100" onClick={() => { setSelectedCategory('All'); setSelectedState('All'); setSearchTerm(''); }}>Reset</button>
                </div>
            </div>

            {/* List View */}
            <div className="row">
                {filteredLocations.length > 0 ? (
                    filteredLocations.map((loc) => (
                        <div className="col-12 my-3" key={loc.id}>
                            <div className="card shadow-sm border-0 d-flex flex-row overflow-hidden" style={{ height: '220px' }}>
                                <div style={{ width: '35%', minWidth: '200px' }}>
                                    <img src={loc.imageUrl} className="img-fluid h-100 w-100" alt={loc.title} style={{ objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x220?text=No+Image'; }} />
                                </div>
                                <div className="card-body d-flex flex-column p-4" style={{ width: '65%' }}>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div><h4 className="card-title fw-bold mb-1">{loc.title}</h4><span className="badge bg-secondary">{loc.category}</span></div>
                                    </div>
                                    <p className="text-muted mt-3 mb-auto text-truncate" style={{ maxWidth: '90%' }}><i className="fas fa-map-marker-alt me-2 text-danger"></i> {loc.city}, {loc.state}</p>
                                    <div className="mt-3 d-flex gap-2">
                                        <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => handleViewClick(loc)}>View</button>
                                        <button className="btn btn-warning rounded-pill px-4" onClick={() => handleEditClick(loc)}><i className="fas fa-edit me-1"></i> Edit</button>
                                        <button className="btn btn-danger rounded-pill px-4" onClick={() => handleDelete(loc.id)}><i className="fas fa-trash me-1"></i> Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center text-muted mt-5"><h4>No locations found.</h4></div>
                )}
            </div>

            {/* View Modal */}
            {showViewModal && selectedLocation && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedLocation.title}</h5>
                                <button className="btn-close" onClick={handleCloseViewModal}></button>
                            </div>
                            <div className="modal-body">
                                <img src={selectedLocation.imageUrl} className="img-fluid mb-3 w-100 rounded" style={{maxHeight:'300px', objectFit:'cover'}} alt="view" />
                                <p><strong>Description:</strong> {selectedLocation.description}</p>
                                <p><strong>Address:</strong> {selectedLocation.address}, {selectedLocation.city}, {selectedLocation.state}</p>
                            </div>
                            <div className="modal-footer"><button className="btn btn-secondary" onClick={handleCloseViewModal}>Close</button></div>
                        </div>
                    </div>
                </div>
            )}

            <LocationEditModal 
                show={showEditModal} 
                handleClose={handleCloseEditModal} 
                locationData={locationToEdit} 
                refreshLocations={fetchLocations} 
            />
        </div>
    );
};

export default LocationsEdit;