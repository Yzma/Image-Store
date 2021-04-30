
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Dropdown, Card, Form, ListGroup, Button, InputGroup, Nav, Tab, Container, Badge } from '@themesberg/react-bootstrap';

export const ProfileTabs = () => {

  const ListItem = (props) => {
    return (
      <div>
        <Row className="align-items-center py-4">
          <Col className="ms--2">
            <h5><a style={{ color: "#0366d6" }} href="/">{props.name}</a> {props.isEnabled ? <Badge bg="dark">Private</Badge> : null}</h5>
            <p>{props.description}</p>
            <small>Last Updated: {props.lastUpdated}</small>
          </Col>
        </Row>
        <div className="account-border d-flex justify-content-between" />
      </div>
    )
  }

  return (
      <Tab.Container defaultActiveKey="overview">
          <Row>
          <Col lg={12}>
            <Nav className="nav-tabs">
              <Nav.Item>
                <Nav.Link eventKey="overview" className="mb-sm-3 mb-md-0">
                  Overview
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="projects" className="mb-sm-3 mb-md-0">
                  Projects
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="organizations" className="mb-sm-3 mb-md-0">
                  Organizations
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={12}>
            <Tab.Content>
              <Tab.Pane eventKey="overview" className="py-4">

                <p>Overview page here</p>

              </Tab.Pane>
              <Tab.Pane eventKey="projects" className="py-4">

                {/* Start (No Projects) */}

                <div className="d-flex justify-content-center">
                  <Row>
                    <Col xs={12} className="text-center d-flex">
                      <div>
                        {/* <Image src={NotFoundImage} className="img-fluid w-75" /> */}
                        <h4 className="text-primary mt-5">
                          No Projects
                        </h4>
                        <p className="lead my-4">
                          Looks like theres no projects here!
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* End */}

                {/* Start (With Projects) */}
  {/* 
                <div className="account-border d-flex justify-content-between" />
                <ListItem name="Bug-Smash" isEnabled={true} description="Description here" lastUpdated={0} />
                <ListItem name="Bug-Smash" isEnabled={false} description="Description here" lastUpdated={0} /> */}

                {/* End */}

              </Tab.Pane>
              <Tab.Pane eventKey="organizations" className="py-4">

                <div className="account-border d-flex justify-content-between" />
                <ListItem name="Organization 1" isEnabled={true} description="Description here" lastUpdated={0} />
                <ListItem name="Bug-Smash" isEnabled={false} description="Description here" lastUpdated={0} />

              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
  );
};
