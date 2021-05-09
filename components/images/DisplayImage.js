
import { Col, Card, Image } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export const DisplayImage = (props) => {

  const { id, title, private: isPrivate, description, fileName } = props.image

  const actualImageURL = `http://localhost:3000/api/v1/images/${fileName}`
  const pageViewURL = `http://localhost:3000/images/${id}`
  return (
    <Col>
      <Card className="h-100">
        <a href={pageViewURL}><Image src={actualImageURL} className="card-img-top" /></a>
        <Card.Body>
          <Card.Title>
            {title} {isPrivate ? <FontAwesomeIcon icon={faLock}/> : null}
          </Card.Title>
          
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
};
