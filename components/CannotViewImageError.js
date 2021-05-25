
import React from "react";
import { Row, Col, Card } from '@themesberg/react-bootstrap';
import { ErrorCode } from "util/constants";

export const CannotViewImageError = (props) => {
    return (
        <>

            {props.error.code == ErrorCode.NO_AUTHORIZATION ?

                <Row className="d-flex flex-wrap flex-md-nowrap text-center align-items-center py-4">
                    <Col className="d-block mb-4 mb-md-0">
                        <h1 className="h2">No Authorization</h1>
                        <p className="mb-0">
                            You do not have permission to view this image.
                        </p>
                    </Col>
                </Row>

                : null}

            {props.error.code == ErrorCode.NOT_FOUND ?
                <Row className="d-flex flex-wrap flex-md-nowrap text-center align-items-center py-4">
                    <Col className="d-block mb-4 mb-md-0">
                        <h1 className="h2">Image Not Found</h1>
                        <p className="mb-0">
                            The requested image could not be found.
                        </p>
                    </Col>
                </Row>

                :
                null
            }
        </>
    )
}
