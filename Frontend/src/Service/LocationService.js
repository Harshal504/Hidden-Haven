import axios from 'axios';

const API_URL = "http://localhost:8080/location";
const REVIEW_API_URL = "http://localhost:8080/reviews";

class LocationService {
    
    // 1. GET ALL
    getAllLocations() {
        return axios.get(API_URL);
    }

    // 2. GET BY ID (Optional, helpful for view details)
    getLocationById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    // 3. UPDATE (PUT)
    updateLocation(id, locationData) {
        return axios.put(`${API_URL}/${id}`, locationData);
    }

    // 4. DELETE
    deleteLocation(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    getReviewsByLocationId(locationId) {
        return axios.get(`${REVIEW_API_URL}/location/${locationId}`);
    }

    addReview(reviewData) {
        // reviewData should look like: { rating: 5, comment: "...", userId: 1, locationId: 5 }
        return axios.post(REVIEW_API_URL, reviewData);
    }
}

export default new LocationService();