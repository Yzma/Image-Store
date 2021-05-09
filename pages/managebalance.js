import React, { useRef, useState } from 'react';
import { PageTemplate } from '../components/PageTemplate'
import { Col, Row, Form, Container, Button, Alert } from '@themesberg/react-bootstrap';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { getAuthenticatedUserFromRequest } from '../util/database/userUtil';

const ManageBalance = (props) => {

  const [notSignedIn, setNotSignedIn] = useState(props.notSignedIn || false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const balanceView = useRef(props.balance);
  const formik = useFormik({
    initialValues: { balance: 15 },

    validationSchema: Yup.object({
      balance: Yup.number()
        .moreThan(0, "Balance must be over $0")
        .lessThan(1000, "Balance cannot be greater than $1000")
        .required('Required')
    }),

    onSubmit: async (values) =>
      fetch('http://localhost:3000/api/v1/users/1/changebalance', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance: values.balance }),
      })
        .then(response => response.json())
        .then(data => {
          console.debug('Success:', data);

          if(data.error) {
            setShowErrorAlert(true)
          } else {
            balanceView.current = parseInt(data.balance)
            setShowSuccessAlert(true)
          }

        })
        .catch((error) => {
          console.debug('Error:', error);
          setShowErrorAlert(true)
        })
  })

  return (
    <PageTemplate>
      <article>
        <Container className="px-0">
          <Row className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
            <Col className="d-block mb-4 mb-md-0">
              <h1 className="h2">Manage Balance</h1>
              <p className="mb-0">
                This page is used to edit your balance to test buying images. The page makes a <kbd>PATCH</kbd> request to the <kbd>/api/changebalance</kbd> route to update the users balance.
                There is not auth checks in this route as it's only purpose is to edit the users balance to purchase images.
                <br />

                <a className="text-danger">NOTE: Make sure you are signed in to begin making changes to your balance.</a>
                
              </p>
            </Col>
          </Row>

          <div className="account-border d-flex justify-content-between mb-5" />

          <Alert show={showSuccessAlert} variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
            <Alert.Heading>Success!</Alert.Heading>
            <p>
              Your balance has been updated to ${balanceView.current}
            </p>
          </Alert>

          <Alert show={showErrorAlert} variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
            <Alert.Heading>Error!</Alert.Heading>
            <p>
              Looks like an error occurred on the backend. Please try again. If the error persists, please open a ticket on GitHub.
            </p>
          </Alert>

          <h5>Your Current Balance</h5>
          <p className="mb-0">
            ${balanceView.current}
          </p>

          <Form onSubmit={formik.handleSubmit} className="py-3">
            <Form.Group className="mb-3">
              <Form.Label>New Balance</Form.Label>
              <Form.Control name="balance" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.balance} className="form-control-sm" isInvalid={formik.errors.balance}/>
              <Form.Control.Feedback type="invalid">
                Please enter a number between 0-1000.
              </Form.Control.Feedback>
            </Form.Group>
            <small>You can set your balance between $0-1000</small>

            <div className="account-border d-flex justify-content-between" />

            <Form.Group className="py-3">
                <Button type="submit" disabled={notSignedIn}>Update Balance</Button>
            </Form.Group>
            {notSignedIn ? <p className="text-danger">You must be signed in start updating your balance.</p> : null}
          </Form>
        </Container>
      </article>
    </PageTemplate>
  );
};

export async function getServerSideProps(context) {

  return await getAuthenticatedUserFromRequest(context.req)
    .then((data) => {
      return {
        props: {
          balance: parseInt(data.balance)
        }
      }
    })
    .catch((error) => {
      return {
        props: {
          notSignedIn: true
        }
      }
    })
}


export default ManageBalance