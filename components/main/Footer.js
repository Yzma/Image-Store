
import React from "react";
import { Row, Col } from '@themesberg/react-bootstrap';

export const Footer = () => {
  return (
    <div>
      <footer className="footer section py-4">
        <Row>
          <Col>
            <p className="text-left ms-4">Copyright © 2021. Andrew Caruso</p>
          </Col>
          <Col >
            <ul className="list-inline list-group-flush list-group-borderless text-right me-4">
              <li className="list-inline-item px-0 px-sm-2">
                <a href="https://github.com/Yzma/Image-Store" target="_blank">Github</a>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <a href="https://github.com/Yzma/Image-Store/blob/master/LICENSE" target="_blank">License</a>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
