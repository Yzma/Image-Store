
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck, faCog, faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Dropdown, Card, Form, Button, InputGroup, Nav, Tab, Table, ButtonGroup, Pagination } from '@themesberg/react-bootstrap';
import { UploadButton } from '../UploadButton'

import { ImageDisplayGrid } from '../images/ImageDisplayGrid'

export const ProfileTabs = (props) => {

    const { images } = props.images
    console.log('2nd', props.images)

    // TODO: Transaction ID, Photo name, Seller, amount paid, purchase date
    const transactions = [
      {
          "invoiceNumber": 300499,
          "status": "Paid",
          "subscription": "Platinum Subscription Plan",
          "price": "799,00",
          "issueDate": 'some date',
          "dueDate": 'some date'
      },
      {
          "invoiceNumber": 300498,
          "status": "Paid",
          "subscription": "Platinum Subscription Plan",
          "price": "799,00",
          "issueDate": 'some date',
          "dueDate": 'some date'
      },
      {
          "invoiceNumber": 300497,
          "status": "Paid",
          "subscription": "Flexible Subscription Plan",
          "price": "233,42",
          "issueDate": 'some date',
          "dueDate": 'some date'
      },
      {
          "invoiceNumber": 300496,
          "status": "Due",
          "subscription": "Gold Subscription Plan",
          "price": "533,42",
          "issueDate": 'some date',
          "dueDate": 'some date'
      },
      {
          "invoiceNumber": 300495,
          "status": "Due",
          "subscription": "Gold Subscription Plan",
          "price": "533,42",
          "issueDate": 'some date',
          "dueDate": 'some date'
      },
      {
          "invoiceNumber": 300494,
          "status": "Due",
          "subscription": "Flexible Subscription Plan",
          "price": "233,42",
          "issueDate": 'some date',
          "dueDate": 'some date'
      },
      {
          "invoiceNumber": 300493,
          "status": "Canceled",
          "subscription": "Gold Subscription Plan",
          "price": "533,42",
          "issueDate": 'some date',
          "dueDate": 'some date'
      },
      {
          "invoiceNumber": 300492,
          "status": "Canceled",
          "subscription": "Platinum Subscription Plan",
          "price": "799,00",
          "issueDate": 'some date',
          "dueDate": 'some date'
      },
      {
          "invoiceNumber": 300491,
          "status": "Paid",
          "subscription": "Platinum Subscription Plan",
          "price": "799,00",
          "issueDate": 'some date',
          "dueDate": 'some date'
      }
    ]
    
    const totalTransactions = transactions.length;
  
    const TableRow = (props) => {
      const { invoiceNumber, subscription, price, issueDate, dueDate, status } = props;
      const statusVariant = status === "Paid" ? "success"
        : status === "Due" ? "warning"
          : status === "Canceled" ? "danger" : "primary";
  
      return (
        <tr>
          <td>
            <Card.Link className="fw-normal">
              {invoiceNumber}
            </Card.Link>
          </td>
          <td>
            <span className="fw-normal">
              {subscription}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {issueDate}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {dueDate}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              ${parseFloat(price).toFixed(2)}
            </span>
          </td>
          <td>
            <span className={`fw-normal text-${statusVariant}`}>
              {status}
            </span>
          </td>
          <td>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                </Dropdown.Item>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Dropdown.Item>
                <Dropdown.Item className="text-danger">
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
              <Row className="justify-content-between align-items-center pb-4">
                <Col xs={8} md={6} lg={3} xl={4}>

                {/* TODO: Only show search bar when user has images */}

                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder="Search" />
                    </InputGroup>

                </Col>
                <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
                  <UploadButton />
                </Col>
              </Row>

              {/* <div className="d-flex justify-content-center">
                <Row>
                  <Col xs={12} className="text-center d-flex">
                    <div>
                      <Image src={NotFoundImage} className="img-fluid w-75" />
                      <h4 className="text-primary mt-5">
                        No Images Found!
                      </h4>
                      <p className="lead my-4">
                        Try uploading some now!
                      </p>
                    </div>
                  </Col>
                </Row>
              </div> */}

              <ImageDisplayGrid images={props.images} />
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
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder="Search" />
                    </InputGroup>
                  </Col>
                  <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                        <span className="icon icon-sm icon-gray">
                          <FontAwesomeIcon icon={faCog} />
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                        <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                        <Dropdown.Item className="d-flex fw-bold">
                          10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                        </Dropdown.Item>
                        <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                        <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
                        <th className="border-bottom">Seller ID</th>
                        <th className="border-bottom">Total</th>
                        <th className="border-bottom">Purchase Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
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
