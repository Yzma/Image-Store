
import { Col, Card, Image } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export const DisplayImage = (props) => {

  const { id, title, private: isPrivate, description, imageURL, fileName } = props.image

  const actualImageURL = `http://localhost:3000/api/v1/images/${fileName}`
  return (
    <Col>
      <Card className="h-100">
        <a href={actualImageURL}><Image src={actualImageURL} className="card-img-top" /></a>
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
