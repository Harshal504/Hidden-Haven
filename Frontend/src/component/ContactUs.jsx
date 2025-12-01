import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal, InputGroup } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Commented out to prevent build error if package is missing
// Assuming Font Awesome is available based on existing icon usage.

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        // Logic to send data to backend would go here
        console.log("Form Submitted:", formData);
        setShowModal(true);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div style={{ background: 'linear-gradient(to right, #eef2f3, #8e9eab)', minHeight: '100vh', padding: '40px 0' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-lg border-0 rounded-4" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <i className="fas fa-envelope-open-text text-primary" style={{ fontSize: '3rem' }}></i>
                                    <h2 className="fw-bold mt-3 text-primary">Get in Touch</h2>
                                    <p className="text-muted">
                                        We'd love to hear from you. Fill out the form below.
                                    </p>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    {/* Name Field */}
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label className="fw-semibold">Name</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-white border-end-0"><i className="fas fa-user text-muted"></i></InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="border-start-0 ps-0"
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    {/* Email Field */}
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label className="fw-semibold">Email address</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-white border-end-0"><i className="fas fa-envelope text-muted"></i></InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="border-start-0 ps-0"
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    {/* Subject Field */}
                                    <Form.Group className="mb-3" controlId="formSubject">
                                        <Form.Label className="fw-semibold">Subject</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-white border-end-0"><i className="fas fa-tag text-muted"></i></InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="border-start-0 ps-0"
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    {/* Message Field */}
                                    <Form.Group className="mb-4" controlId="formMessage">
                                        <Form.Label className="fw-semibold">Message</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-white border-end-0 align-items-start pt-2"><i className="fas fa-comment-alt text-muted"></i></InputGroup.Text>
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                placeholder="Your message..."
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                style={{ resize: 'none' }}
                                                className="border-start-0 ps-0"
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    {/* Submit Button */}
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit" size="lg" className="fw-bold rounded-pill shadow-sm">
                                            <i className="fas fa-paper-plane me-2"></i> Send Message
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Success Modal */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton className="border-0 pb-0"></Modal.Header>
                    <Modal.Body className="text-center pt-0 pb-4">
                        <div className="mb-3">
                            <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                        </div>
                        <h3 className="fw-bold text-success">Thank You!</h3>
                        <p className="text-muted">
                            Your message has been sent successfully. We'll get back to you shortly.
                        </p>
                        <Button variant="success" onClick={handleCloseModal} className="px-5 mt-3 rounded-pill fw-bold shadow-sm">
                            Close
                        </Button>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default ContactUs;