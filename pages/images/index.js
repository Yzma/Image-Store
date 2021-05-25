import React from 'react';
import { PageTemplate } from 'components/PageTemplate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, InputGroup, Button} from '@themesberg/react-bootstrap';

import { ImageDisplayGrid } from 'components/images/ImageDisplayGrid'
import { getPublicImages, getPaginationResultsFromImages } from 'util/database/imageRepository/localFileImageRepository';


// Public image searching
const PublicImageSearch = (props) => {

  return (
    <PageTemplate>

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Public Images</h4>
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

      <ImageDisplayGrid images={props.publicImages}/>

      <div className="pb-5"/>

      {props.result.back ? <Button href={`/images?page=${props.page - 1}`} className="primary">Back</Button> : null}
      {props.result.forward ? <Button href={`/images?page=${props.page + 1}`} className="primary">Forward</Button> : null}

    </PageTemplate>
  );
};

export async function getServerSideProps(context) {

  let currentPage

  try {
    currentPage = parseInt(context.query.page) || 0
  } catch(e) {
    currentPage = 0
  }

  return getPublicImages(currentPage)
    .then((images) => getPaginationResultsFromImages(currentPage, images))
    .then((images) => {
      return {
        props: {
          result: images.result,
          page: images.page,
          publicImages: images.images
        }
      }
    })
    .catch((error) => {
      return {
        props: {
          error: true
        }
      }
    })
}


export default PublicImageSearch