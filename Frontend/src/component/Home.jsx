import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is imported in App.js or index.js

const Home = () => {
  // Styles for the Hero Section Background
  const heroStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "85vh",
    position: "relative",
  };

  // Overlay to make text readable against the background
  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* --- HERO SECTION --- */}
      <div className="d-flex align-items-center text-white" style={heroStyle}>
        <div style={overlayStyle}></div>
        <Container style={contentStyle}>
          <Row>
            <Col md={8} lg={6}>
              <h1 className="display-3 fw-bold mb-3">Discover The <span className="text-success">Hidden Places</span></h1>
              <p className="lead mb-4">
                Escape the tourist crowds. Explore lesser-known destinations, 
                secret trails, and untouched nature shared by a community of real travelers.
              </p>
              <Link to="/locations">
                <Button variant="success" size="lg" className="px-5 py-3 rounded-pill shadow">
                  Explore Now
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* --- FEATURED SECTION --- */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">Featured Hidden Destinations</h2>
          <p className="text-muted">Curated picks for your next adventure</p>
        </div>

        <Row className="g-4">
          {/* Card 1 */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 hover-effect">
              <Card.Img 
                variant="top" 
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" 
                style={{ height: "250px", objectFit: "cover" }} 
              />
              <Card.Body className="text-center">
                <Card.Title className="fw-bold">Mystic Forest</Card.Title>
                <Card.Text className="text-muted">
                  A quiet, fog-covered forest far away from the noise of the city.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2 */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 hover-effect">
              <Card.Img 
                variant="top" 
                src="https://images.unsplash.com/photo-1508615070457-7baeba4003ab" 
                style={{ height: "250px", objectFit: "cover" }} 
              />
              <Card.Body className="text-center">
                <Card.Title className="fw-bold">Silver Waterfall</Card.Title>
                <Card.Text className="text-muted">
                  Hidden waterfall deep in the Himalayan foothills, accessible only by foot.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3 */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 hover-effect">
              <Card.Img 
                variant="top" 
                src="https://images.unsplash.com/photo-1525104885110-205d0a52e2fe" 
                style={{ height: "250px", objectFit: "cover" }} 
              />
              <Card.Body className="text-center">
                <Card.Title className="fw-bold">Crystal Caves</Card.Title>
                <Card.Text className="text-muted">
                  Unexplored limestone caves known only to local villagers.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* --- EXTRA: CALL TO ACTION --- */}
      <div className="bg-light py-5 mt-5">
        <Container className="text-center">
          <h3 className="mb-3">Know a hidden gem?</h3>
          <p className="text-muted mb-4">Join our community and share your discoveries with the world.</p>
          <Link to="/register">
            <Button variant="outline-primary" size="lg">Join the Community</Button>
          </Link>
        </Container>
      </div>

      {/* Inline CSS for Hover Effect */}
      <style>
        {`
          .hover-effect {
            transition: transform 0.3s ease-in-out;
          }
          .hover-effect:hover {
            transform: translateY(-10px);
          }
        `}
      </style>
    </div>
  );
};

export default Home;