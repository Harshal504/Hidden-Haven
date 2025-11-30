import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

const AboutUs = () => {
    const intro = `The Hidden Places is a community-driven platform built to help travelers
    uncover unexplored, underrated, and breathtaking destinations around the world.
    Our goal is to create a seamless experience where users can discover new places,
    share their own hidden gems, and explore nature beyond mainstream tourism.`;

    const mission =
        'To inspire travel enthusiasts to explore untouched locations, preserve natural beauty, and build a global community based on storytelling and adventure.';

    const vision =
        'To become the largest digital platform for discovering authentic hidden travel destinations while promoting sustainable and responsible tourism.';

    const team = [
        {
            name: 'Shreya Raj',
            image: '../assets/cdpms.jpg',
            description:
                'Shreya designed and implemented core frontend features using React, including the Home page, About Us page, Feedback form, and Reviews UI. She also collaborated on designing application routes, component structure, and styling. On the backend, she integrated the Spring Boot APIs with the frontend and contributed to authentication, validation, and data flow.',
            github: 'https://github.com/shreyarajcmaug25-kh',
        },
        {
            name: 'Harshal Tarmale',
            image: '/images/harshal.jpg',
            description:
                'Harshal developed the backend entities, database integration, and API architecture using Spring Boot and Hibernate. He also contributed to securing the application using JWT authentication and implemented the Admin-side modules for managing locations, reviews, and user data.',
            github: 'https://github.com/Harshal504',
        },
        {
            name: 'Vaishnavi Jagtap',
            image: '/images/rachana.jpg',
            description:
                'Vaishnavi created UI components for user interaction, including the Contact page, Login page, Register page, query submission modules, and feedback management. She also contributed to responsive UI design, layout styling, and system navigation to ensure a smooth user experience.',
            github: 'https://github.com/vaishnavijagtap3',
        },
    ];

    const finalNote =
        'The project was developed collaboratively from start to finish — from designing the database schema and defining the API structure to frontend integration, routing, and secure authentication. Each team member contributed equally to delivering a seamless full-stack application.';

    return (

        <>
        <Container className="my-5">

            {/* Page Header */}
            <h2
                className="text-center mb-4 fw-bold"
                style={{
                    color: '#2E8B57',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                About The Hidden Places
            </h2>

            {/* Intro Section */}
            <p
                className="text-center mx-auto mb-5"
                style={{
                    maxWidth: '900px',
                    fontSize: '1.08rem',
                    color: '#4a4a4a',
                    lineHeight: '1.7',
                }}
            >
                {intro}
            </p>

            {/* Mission & Vision */}
            <Row className="mb-5">
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm border-0" style={{ borderRadius: '12px' }}>
                        <Card.Body>
                            <h4 className="fw-bold" style={{ color: '#2E8B57' }}>
                                Our Mission
                            </h4>
                            <p style={{ color: '#555', lineHeight: '1.6' }}>{mission}</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} className="mb-4">
                    <Card className="shadow-sm border-0" style={{ borderRadius: '12px' }}>
                        <Card.Body>
                            <h4 className="fw-bold" style={{ color: '#2E8B57' }}>
                                Our Vision
                            </h4>
                            <p style={{ color: '#555', lineHeight: '1.6' }}>{vision}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Team Section */}
            <h3
                className="text-center fw-bold mb-4"
                style={{ color: '#2E8B57', fontFamily: 'Poppins, sans-serif' }}
            >
                Meet the Developers
            </h3>

            {team.map((person, index) => (
                <Card
                    key={index}
                    className="shadow-sm border-0 mb-4"
                    style={{
                        borderRadius: '15px',
                        background: 'linear-gradient(180deg, #f7fff8 0%, #ffffff 100%)',
                    }}
                >
                    <Row className="align-items-center p-3">
                        <Col md={4} className="text-center mb-3 mb-md-0">
                            <Image
                                src={person.image}
                                alt={person.name}
                                roundedCircle
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'cover',
                                    border: '4px solid #2E8B57',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                }}
                            />
                        </Col>

                        <Col md={8}>
                            <h4 className="fw-bold" style={{ color: '#145a32' }}>
                                {person.name}
                            </h4>

                            <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6' }}>
                                {person.description}
                            </p>

                            <a
                                href={person.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-success fw-semibold"
                            >
                                GitHub Profile
                            </a>
                        </Col>
                    </Row>
                </Card>
            ))}

            {/* Final Note */}
            <p
                className="text-center mt-4 fw-semibold"
                style={{
                    fontSize: '1.08rem',
                    color: '#145a32',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                {finalNote}
            </p>
        </Container>
        <p>Hello Shreya</p>
        </>
    );
}

export default AboutUs;
