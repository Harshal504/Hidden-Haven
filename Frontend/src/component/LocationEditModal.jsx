import React, { useState, useEffect } from 'react';
import LocationService from '../service/LocationService';
import 'bootstrap/dist/css/bootstrap.min.css';

const LocationEditModal = ({ show, handleClose, locationData, refreshLocations }) => {
    // Local state for the form
    const [formData, setFormData] = useState({
        id: '', title: '', description: '', category: 'BEACH', 
        imageUrl: '', address: '', city: '', state: '', 
        latitude: '', longitude: ''
    });

    // When locationData prop changes (user clicked Edit), update local state
    useEffect(() => {
        if (locationData) {
            setFormData(locationData);
        }
    }, [locationData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await LocationService.updateLocation(formData.id, formData);
            alert("Location updated successfully!");
            handleClose(); // Close Modal
            refreshLocations(); // Refresh Parent List
        } catch (err) {
            alert("Failed to update location.");
            console.error(err);
        }
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header bg-warning text-white">
                            <h5 className="modal-title">Edit Location</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3">
                                {/* Title */}
                                <div className="col-md-12">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} required />
                                </div>
                                {/* Category */}
                                <div className="col-md-6">
                                    <label className="form-label">Category</label>
                                    <select className="form-select" name="category" value={formData.category} onChange={handleInputChange} required>
                                        <option value="BEACH">BEACH</option>
                                        <option value="FOREST">FOREST</option>
                                        <option value="MOUNTAIN">MOUNTAIN</option>
                                        <option value="WATERFALL">WATERFALL</option>
                                        <option value="HISTORICAL">HISTORICAL</option>
                                        <option value="HOLYPLACES">HOLYPLACES</option>
                                    </select>
                                </div>
                                {/* Image URL */}
                                <div className="col-md-6">
                                    <label className="form-label">Image URL</label>
                                    <input type="text" className="form-control" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} />
                                </div>
                                {/* Description */}
                                <div className="col-12">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleInputChange} required></textarea>
                                </div>
                                {/* City & State */}
                                <div className="col-md-6">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleInputChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">State</label>
                                    <input type="text" className="form-control" name="state" value={formData.state} onChange={handleInputChange} required />
                                </div>
                                {/* Address */}
                                <div className="col-12">
                                    <label className="form-label">Full Address</label>
                                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} required />
                                </div>
                                {/* Coordinates */}
                                <div className="col-md-6">
                                    <label className="form-label">Latitude</label>
                                    <input type="number" step="any" className="form-control" name="latitude" value={formData.latitude} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Longitude</label>
                                    <input type="number" step="any" className="form-control" name="longitude" value={formData.longitude} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LocationEditModal;