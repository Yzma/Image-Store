import React from 'react';
import { PageTemplate } from '../components/PageTemplate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, InputGroup, Card, Image } from '@themesberg/react-bootstrap';

// Public image searching
const PublicImageSearch = () => {

  const imageObjects = [
    {
      title: "Image title",
      description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      imageURL: "https://mdbootstrap.com/img/new/standard/city/041.jpg"
    },

    {
      title: "Image title",
      description: "Image description",
      imageURL: "https://mdbootstrap.com/img/new/standard/city/042.jpg"
    },

    {
      title: "Image title",
      description: "Image description",
      imageURL: "https://mdbootstrap.com/img/new/standard/city/043.jpg"
    },

    {
      title: "Image title",
      description: "Image description",
      imageURL: "https://mdbootstrap.com/img/new/standard/city/044.jpg"
    }
  ]

  const DisplayImage = (props) => {

    const { title, description, imageURL } = props.imageObject

    return (
      <Col>
        <Card className="h-100">
          <a href="/"><Image src={imageURL} className="card-img-top" /></a>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
  }

  return (
    <PageTemplate>

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Image Search</h4>
          <p className="mb-0"><b>TODO: Change this 15</b> public photos available</p>
        </div>
      </div>

      <Row className="justify-content-between align-items-center my-3">
        <Col xs={8} md={6} lg={3} xl={4}>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Search Images" />
          </InputGroup>
        </Col>
      </Row>

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {imageObjects.map((imageObject, index) => <DisplayImage key={index} imageObject={imageObject} />)}
      </div>

    </PageTemplate>
  );
};

export default PublicImageSearch