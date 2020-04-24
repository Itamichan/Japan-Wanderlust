import React from 'react';
import {Button, Col, Row} from "reactstrap";
import {withRouter} from "react-router";
import "./UserTrip.scss";

const UserTrip = ({disabled, history, mediaHeading, tripId, removeTrip}) => {
    return (
        <Row className={"user-trip-container"}>
            <Col xs={"8"} className={"user-trip-heading"}>
                <h4> {mediaHeading}</h4>
            </Col>
            <Col xs={"4"}>
                <Row>
                    <Col>
                        <Button color="success" onClick={() => history.push(`/trips/${tripId}`)}>see
                            more
                        </Button>
                    </Col>
                    <Col>
                        <Button disabled={disabled} color="danger" onClick={removeTrip}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export default withRouter(UserTrip);