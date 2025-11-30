import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For dropdowns/modals

// Layout Components
import Navigation from './component/Navigation';
import Footer from './component/Footer';

// Page Components
// import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
// import AboutUs from './component/AboutUs';
// import ContactUs from './component/ContactUs';
import Locations from './component/Locations';
import LocationsEdit from './component/LocationsEdit';
// import Feedback from './component/Feedback';

// // Dashboard Components
import AdminDashboard from './component/AdminDashboard';
import ViewerDashboard from './component/ViewerDashboard';

function App() {
  return (
    <Router>
      {/* d-flex flex-column min-vh-100:
        This creates a flex container that takes up at least 100% of the viewport height.
        This forces the Footer to the bottom.
      */}
      <div className="d-flex flex-column min-vh-100">
        
        {/* Navigation is placed outside Routes so it appears on every page */}
        <Navigation />

        {/* flex-grow-1: 
          This div will expand to fill empty space, pushing the Footer down.
          container mt-4: Adds standard Bootstrap padding/margins.
        */}
        <div className="container mt-4 flex-grow-1">
          <Routes>
            {/* Public Routes */}
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/about" element={<AboutUs />} /> */}
            {/* <Route path="/contact" element={<ContactUs />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Location Routes */}
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/edit" element={<LocationsEdit />} />
            
            {/* Protected Routes 
              (In a real app, you would wrap these in a PrivateRoute component 
              to check if the user is logged in) 
            */}
            {/* <Route path="/feedback" element={<Feedback />} /> */}
            <Route path="/viewer-dashboard" element={<ViewerDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            {/* Assuming Edit takes an ID parameter */}
            {/* <Route path="/locations/edit/:id" element={<LocationsEdit />} /> */}

            {/* Catch-all for 404 (Optional) */}
            {/* <Route path="*" element={<div className="text-center mt-5"><h2>404 - Page Not Found</h2></div>} /> */}
          </Routes>
        </div>

        {/* Footer is placed outside Routes so it appears on every page */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;