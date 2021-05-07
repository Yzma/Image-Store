
import React from 'react';
import { PageTemplate } from '../../components/PageTemplate'
import { Col, Row, Container, Card } from '@themesberg/react-bootstrap';

import { CannotViewImageError } from '../../components/CannotViewImageError';
import { getImageById } from '../../util/database/imageRepository/localFileImageRepository'
import { ErrorCode } from '../../util/constants';

const ViewImage = (props) => {

    return (
        <PageTemplate>
            <article>
                <Container className="px-0">

                    {props.error ?
                    
                        <CannotViewImageError error={props.error} />

                        :

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
                                            {props.requestedImage.title}
                                        </Card.Text>

                                        <div className="pb-2"></div>

                                        <Card.Title>Description</Card.Title>
                                        <Card.Text>
                                            {props.requestedImage.description}
                                        </Card.Text>

                                        <div className="pb-2"></div>

                                        <Card.Title>Private</Card.Title>
                                        <Card.Text>
                                            {props.requestedImage.private ? "Yes" : "No"}
                                        </Card.Text>

                                        <div className="pb-2"></div>

                                        <Card.Title>Date Uploaded</Card.Title>
                                        <Card.Text>
                                            {props.requestedImage.dateUploaded.toLocaleDateString()}

                                        </Card.Text>

                                        <div className="pb-2"></div>

                                        <Card.Title>Owner User ID</Card.Title>
                                        <Card.Text>
                                            <Card.Link href={`/users/${props.requestedImage.userID}`}>{props.requestedImage.userID}</Card.Link>
                                        </Card.Text>

                                        <div className="pb-2"></div>

                                        <Card.Title>File Type</Card.Title>
                                        <Card.Text>
                                            {props.requestedImage.fileType}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    }

                </Container>
            </article>
        </PageTemplate>
    );
};

export async function getServerSideProps(context) {

    const requestedImage = await getImageById(context.params.imageID)

    if (!requestedImage) {
        return {
            props: {
                error: {
                    code: ErrorCode.NOT_FOUND
                }
            }
        }
    }

    // Check permissions
    if (false) {
        return {
            props: {
                error: {
                    code: ErrorCode.NO_AUTHORIZATION
                }
            }
        }
    }

    return {
        props: {
            requestedImage: requestedImage
        }
    }
}

export default ViewImage