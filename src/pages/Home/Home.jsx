import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

import './Home.css'

function Home() {

    return (
        <div className='home-container'>
            <Container className="profile-container mt-5">
                <Row className="justify-content-center">
                    <Col md={4} className="text-center">
                        <div className="sticker-animation">
                            <span className="floating-heart">💖</span>
                        </div>
                        <Image
                            src="src\assets\profile.jpg"
                            roundedCircle
                            fluid
                            alt="Profile Picture"
                            className="profile-pic mb-3"
                        />
                    </Col>
                    <Col md={8}>
                        <Card className="profile-card">
                            <Card.Body>
                                <h1 className="profile-title">Software Developer</h1>
                                <Card.Text className="profile-text">
                                    Hi, I'm Jittima Oparp, a Software Developer in the making. I'm currently pursuing my Bachelor's Degree in Computer Science at Sripatum University, where I’m gaining skills in web and mobile app development. I’m passionate about learning modern technologies like React, Node.js, and contributing to real-world projects.
                                </Card.Text>
                                <Card.Text className="profile-text">
                                    <strong>Skills:</strong> JavaScript, React, Node.js, HTML, CSS, Git
                                </Card.Text>
                                <Card.Text className="profile-text">
                                    <strong>Education:</strong> Bachelor's Degree in Computer Science (In Progress) at Sripatum University
                                </Card.Text>
                                <Card.Text className="profile-text">
                                    <strong>Experience:</strong> Internship experience in software development and project management.
                                </Card.Text>
                                <Card.Text className="profile-text">
                                    <strong>Contact:</strong> jittima.opa@spumail.net
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;