
import React from "react";
import { Row, Col, Card } from '@themesberg/react-bootstrap';

export const Footer = () => {
  return (
    <div>
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © 2021. Andrew Caruso
            </p>
            <p>
              Created with <a href="https://themesberg.com/product/dashboard/volt-react">Volt</a>, <a href="https://nextjs.org/">NextJS</a> and <a href="https://www.postgresql.org/">PostgreSQL</a>
            </p>
          </Col>
          <Col xs={12} lg={6}>
            <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
              <li className="list-inline-item px-0 px-sm-2">
                <a href="https://github.com/Yzma/Shopify-Backend-Internship-Challenge" target="_blank">Github</a>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <a href="https://github.com/Yzma/Shopify-Backend-Internship-Challenge" target="_blank">License</a>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
