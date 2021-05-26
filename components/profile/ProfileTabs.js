
import React, { useState } from 'react';
import { useSession } from 'next-auth/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Form, Button, InputGroup, Nav, Tab, Table, Pagination, Modal } from '@themesberg/react-bootstrap';
import { Formik, Form as FormikForm } from "formik";

import * as yup from "yup";
import useSWR from 'swr'

import { ImageDisplayGrid } from 'components/images/ImageDisplayGrid'
import { UploadImages } from 'components/profile/upload/UploadImages';
import { MAX_FILE_SIZE_IN_BYTES, ACCEPTED_FILE_UPLOAD_MIME_TYPES } from 'util/constants';

const fetcher = (url) => fetch(url).then((r) => r.json());

export const ProfileTabs = (props) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [session, loading] = useSession()

  const { data, error } = useSWR(`http://localhost:3000/api/v1/users/${props.user.id}/images`, fetcher);

  const { images, imagesError } = useSWR(
    ["http://localhost:3000/api/v1/users/1/images", session],
    fetcher,
    // {
    //   revalidateOnFocus: false,
    //   revalidateOnMount:false,
    //   revalidateOnReconnect: false,
    //   refreshWhenOffline: false,
    //   refreshWhenHidden: false,
    //   refreshInterval: 0
    // }
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  // const { transactions, error } = useSWR(
  //   ["http://localhost:3000/api/v1/users/1/transactions?option=bought", session],
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnMount:false,
  //     revalidateOnReconnect: false,
  //     refreshWhenOffline: false,
  //     refreshWhenHidden: false,
  //     refreshInterval: 0
  //   }
  // );

  const transactions = null

  const totalTransactions = transactions?.length || 0;

  const TableRow = (props) => {
    const { tableNumber, id, image, imageID, sellerUserID, amount, datePurchased } = props;

    return (
      <tr>
        <td>
          <Card.Link className="fw-normal">
            {tableNumber}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {id}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {image.title}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {imageID}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {sellerUserID}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {amount}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {datePurchased}
          </span>
        </td>
      </tr>
    )
  }

  return (
    <Tab.Container defaultActiveKey="myimages">
      <Row>
        <Col lg={12}>
          <Nav className="nav-tabs">
            <Nav.Item>
              <Nav.Link eventKey="myimages" className="mb-sm-3 mb-md-0">
                My Images
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="purchasedImages" className="mb-sm-3 mb-md-0">
                Purchased Images
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="transactions" className="mb-sm-3 mb-md-0">
                Transactions
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col >
          <Tab.Content>

            {/* My Images Tab */}

            <Tab.Pane eventKey="myimages" className="py-4">

              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-4">
                <Form className="navbar-search">
                  <Form.Group id="topbarSearch">
                    <InputGroup className="input-group-merge search-bar">
                      <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                      <Form.Control type="text" placeholder="Search" />
                    </InputGroup>
                  </Form.Group>
                </Form>

                <Button variant="primary" className="me-2" onClick={handleShow}>
                  <FontAwesomeIcon icon={faPlus} className="me-1" /> Upload Images
                </Button>
              </div>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Upload Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <Formik
                    initialValues={{
                      images: [],
                    }}

                    validationSchema={yup.object({
                      images: yup.array().of(
                        yup
                          .mixed()
                          .required("A file is required")
                          .test(
                            "fileSize",
                            "File too large",
                            value => value && value.size <= MAX_FILE_SIZE_IN_BYTES
                          )
                          .test(
                            "type",
                            "Unsupported Format",
                            value => value && ACCEPTED_FILE_UPLOAD_MIME_TYPES.includes(value.type)
                          )
                      ).min(1)
                    })}

                    onSubmit={async (values) => {
                      console.log('Values: ', values)

                      const formData = new FormData();
                      values.images.forEach(element => {
                        formData.append('images', element);
                      });

                      console.log('Your session ', session)

                      return fetch(`/api/v1/users/${session.user.id}/images`, {
                        method: 'POST',
                        body: formData,
                      })
                        .then(response => response.json())
                        .then(data => {
                          console.debug('Success:', data);

                        })
                        .catch((error) => {
                          console.debug('Error:', error);
                        })
                    }}
                  >
                    {({ values, setFieldValue, errors, isValid, isSubmitting }) => (
                      <FormikForm>
                        <div className="form-group">

                          <div className="pb-4">
                            <UploadImages name="images" setFieldValue={setFieldValue} />
                          </div>

                          {(!isValid || isSubmitting) ? null :
                            <div className="d-flex justify-content-end">
                              <Button type="submit" variant="primary" disabled={!isValid || isSubmitting}>
                                <FontAwesomeIcon icon={faUpload} className="me-1" />Confirm Upload
                              </Button>
                            </div>
                          }

                        </div>
                        {/* <ErrorMessage name="images" />
                        <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                      </FormikForm>
                    )}
                  </Formik>

                </Modal.Body>
              </Modal>

              {data && data.length == 0 ? <div className="d-flex justify-content-center">
                <Row>
                  <Col xs={12} className="text-center d-flex">
                    <div>
                      <h4 className="text-primary mt-5">
                        No Images Found!
                      </h4>
                      <p className="lead my-4">
                        Try uploading some now!
                      </p>
                    </div>
                  </Col>
                </Row>
              </div> : null}

              <ImageDisplayGrid images={data} />

            </Tab.Pane>

            {/* Purchased Images Tab */}

            <Tab.Pane eventKey="purchasedImages" className="py-4">

              <Row className="justify-content-between align-items-center">
                <Col xs={8} md={6} lg={3} xl={4}>

                  {/* TODO: Only show search bar when user has images  */}
                  {/* <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder="Search" />
                    </InputGroup> */}

                </Col>
              </Row>

              <div className="d-flex justify-content-center">
                <Row>
                  <Col xs={12} className="text-center d-flex">
                    <div>
                      {/* <Image src={NotFoundImage} className="img-fluid w-75" /> */}
                      <h4 className="text-primary mt-5">
                        No Purchased Images
                      </h4>
                      <p className="lead my-4">
                        Go on and buy some images!
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Tab.Pane>

            {/* Transactions Tab */}

            <Tab.Pane eventKey="transactions" className="py-4">

              <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                  <Col xs={8} md={6} lg={3} xl={4}>
                    <Form>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Transactions Filter</Form.Label>
                        <Form.Control as="select">
                          <option>Bought</option>
                          <option>Sold</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </div>

              <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                  <Table hover className="user-table align-items-center">
                    <thead>
                      <tr>
                        <th className="border-bottom">#</th>
                        <th className="border-bottom">Transaction ID</th>
                        <th className="border-bottom">Photo Name</th>
                        <th className="border-bottom">Photo ID</th>
                        <th className="border-bottom">Seller ID</th>
                        <th className="border-bottom">Total</th>
                        <th className="border-bottom">Purchase Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {data && data.map((transaction, index) => {
                        console.log(transaction)
                        return <TableRow key={`transaction-${transaction.id}`} tableNumber={index + 1} {...transaction} />
                      })} */}
                    </tbody>
                  </Table>
                  <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <Nav>
                      <Pagination className="mb-2 mb-lg-0">
                        <Pagination.Prev>
                          Previous
                        </Pagination.Prev>
                        <Pagination.Item active>1</Pagination.Item>
                        <Pagination.Item>2</Pagination.Item>
                        <Pagination.Item>3</Pagination.Item>
                        <Pagination.Item>4</Pagination.Item>
                        <Pagination.Item>5</Pagination.Item>
                        <Pagination.Next>
                          Next
                        </Pagination.Next>
                      </Pagination>
                    </Nav>
                    <small className="fw-bold">
                      Showing <b>{totalTransactions}</b> out of <b>25</b> entries
                    </small>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Tab.Pane>

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};
