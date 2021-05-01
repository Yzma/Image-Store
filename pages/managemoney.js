import React from 'react';
import { PageTemplate } from '../components/PageTemplate'
import { Col, Row, Form, Container, Button } from '@themesberg/react-bootstrap';

const ManageMoney = () => {

  const handleSubmit = async (event) => {
    event.preventDefault()


    

  };

  return (
    <PageTemplate>
      <article>
        <Container className="px-0">
          <Row className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
            <Col className="d-block mb-4 mb-md-0">
              <h1 className="h2">Manage Money</h1>
              <p className="mb-0">
                This page is used to edit your money to test buying images.
              </p>
            </Col>
          </Row>

          <div className="account-border d-flex justify-content-between mb-5" />

          <h5>Your Current Money</h5>
          <p className="mb-0">
            $0.00
          </p>

          <Form className="py-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>New Money Amount</Form.Label>
              <Form.Control type="text" className="form-control-sm" isInvalid />
              <Form.Control.Feedback type="invalid">
                Please enter a number between 0-1000.
              </Form.Control.Feedback>
            </Form.Group>
            <small>Set the amount of money you want between $0-1000</small>

            <div className="account-border d-flex justify-content-between" />

            <Form.Group className="py-3">
                <Button type="submit">Set My Money</Button>
            </Form.Group>

          </Form>
        </Container>
      </article>
    </PageTemplate>
  );
};

export default ManageMoney