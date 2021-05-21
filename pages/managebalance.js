
import Head from 'next/head'
import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/client'
import { PageTemplate } from '../components/PageTemplate'
import { Col, Row, Container, Form, Button, Alert } from '@themesberg/react-bootstrap';
import { Formik } from 'formik';

import { object, number } from 'yup';

import { getAuthenticatedUserFromRequest } from '../util/database/userUtil';

const ManageBalance = (props) => {

  const [notSignedIn, setNotSignedIn] = useState(props.notSignedIn || false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [session, loading] = useSession()

  const balanceView = useRef(props.balance);

  return (
    <>
      <Head>
        <title>Change User Balance</title>
      </Head>
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

            <div className="account-border d-flex justify-content-between mb-4" />

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

            <Formik
              initialValues={{ balance: 15 }}
              validationSchema={object({
                balance: number()
                  .moreThan(-1, "Balance must be over $0")
                  .lessThan(1000, "Balance cannot be greater than $1000")
                  .required('Required')
              })}
              onSubmit={async (values) =>
                fetch(`/api/v1/users/${session.user.id}/changebalance`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ balance: values.balance }),
                })
                  .then(response => response.json())
                  .then(data => {
                    console.debug('Success:', data);

                    if (data.error) {
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
              }
            >
              {({ values, handleChange, handleBlur, handleSubmit, errors, isValid, isSubmitting }) => (
                <Form className="py-3" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>New Balance</Form.Label>
                    <Form.Control className="form-control-sm" name="balance" type="text" onChange={handleChange} onBlur={handleBlur} value={values.balance} isInvalid={errors.balance} />
                    <Form.Control.Feedback type="invalid">
                      Please enter a number between 0-1000.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <small>You can set your balance between $0-1000</small>

                  <div className="account-border d-flex justify-content-between" />

                  <Form.Group className="py-3">
                    <Button type="submit" disabled={notSignedIn || (!isValid || isSubmitting)}>Update Balance</Button>
                  </Form.Group>
                  {notSignedIn ? <p className="text-danger">You must be signed in start updating your balance.</p> : null}
                </Form>
              )}
            </Formik>

          </Container>
        </article>
      </PageTemplate>
    </>
  );
};

export async function getServerSideProps(context) {

  return getAuthenticatedUserFromRequest(context.req)
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