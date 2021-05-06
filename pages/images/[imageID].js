
import React from 'react';
import { PageTemplate } from '../../components/PageTemplate'
import { Col, Row, Form, Container, Button, Dropdown, Nav, Image, Card } from '@themesberg/react-bootstrap';

const ViewImage = (props) => {

    return (
        <PageTemplate>
            <article>
                <Container className="px-0">
                    <Row>

                        <Col >
                            <Card>
                                <Card.Img variant="top" src="https://mdbootstrap.com/img/new/standard/city/041.jpg" />
                            </Card>
                        </Col>

                        <Col className="d-flex justify-content-end">
                            <Card style={{ width: '25rem' }}>
                                <Card.Body>
                                    <Card.Title>Title</Card.Title>
                                    <Card.Text>
                                        Title of Image
                                    </Card.Text>

                                    <div className="pb-2"></div>

                                    <Card.Title>Description</Card.Title>
                                    <Card.Text>
                                        Description here
                                    </Card.Text>

                                    <div className="pb-2"></div>

                                    <Card.Title>Private</Card.Title>
                                    <Card.Text>
                                        Yes
                                    </Card.Text>

                                    <div className="pb-2"></div>

                                    <Card.Title>Date Uploaded</Card.Title>
                                    <Card.Text>
                                        May 6th, 2021 at 5:30pm
                                    </Card.Text>

                                    <div className="pb-2"></div>

                                    <Card.Title>Owner User ID</Card.Title>
                                    <Card.Text>
                                        <Card.Link href={`/users/1`}>1</Card.Link>
                                    </Card.Text>

                                    <div className="pb-2"></div>

                                    <Card.Title>File Type</Card.Title>
                                    <Card.Text>
                                        png
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            </article>
        </PageTemplate>
    );
};

export default ViewImage