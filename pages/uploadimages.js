
import React from 'react';
import { PageTemplate } from '../components/PageTemplate'
import { Col, Row, Form, Container, Button } from '@themesberg/react-bootstrap';


// Public image searching
const MyImages = () => {
  return (
    <PageTemplate>
      <article>
        <Container className="px-0">
          <Row className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
            <Col className="d-block mb-4 mb-md-0">
              <h1 className="h2">New Post</h1>
            </Col>
          </Row>

          <div className="account-border d-flex justify-content-between" />

          <Form className="py-3">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" className="form-control-sm" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description (optional)</Form.Label>
              <Form.Control type="text" className="form-control-sm" />
            </Form.Group>

            <div className="account-border d-flex justify-content-between" />

            <Form.Group className="py-3">

              <fieldset>
                <Form.Check
                  defaultChecked
                  type="radio"
                  defaultValue="option1"
                  label="Public"
                  name="publicRadios"
                  id="publicSetting"
                  htmlFor="publicSetting"
                />

                <Form.Check
                  type="radio"
                  defaultValue="option2"
                  label="Private"
                  name="publicRadios"
                  id="privateSetting"
                  htmlFor="privateSetting"
                />
              </fieldset>
                
            </Form.Group>
            <div className="account-border d-flex justify-content-between" />

            <Form.Group className="py-3">
             <Button type="submit">Upload Image</Button>
            </Form.Group>

          </Form>

          <div className="select-file"></div>

        </Container>
      </article>
    </PageTemplate>
  );
};

export default MyImages