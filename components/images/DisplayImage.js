
import { Col, Card, Image } from '@themesberg/react-bootstrap';

export const DisplayImage = (props) => {

  const { title, description, imageURL } = props.image

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
};
