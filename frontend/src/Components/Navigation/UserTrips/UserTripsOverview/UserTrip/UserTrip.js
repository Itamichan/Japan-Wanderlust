import React, {useState} from 'react';
import {Button, Col, Row} from "reactstrap";
import {withRouter} from "react-router";
import "./UserTrip.scss";
import axios from "axios";
import {notify} from "react-notify-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UserTrip = ({history, mediaHeading, tripId, removedTrip}) => {

    const removeTrip = async () => {
        try {
            await axios.delete(`/api/v1/trips/${tripId}`);
            removedTrip()
        } catch (e) {
        } finally {
        }
    };

    return (
        <Row className={"user-trip-container"}>
            <Col xs={"10"} className={"user-trip-heading"}>
                <h1 className={"text-header"} onClick={() => history.push(`/trips/${tripId}`)}> {mediaHeading}</h1>
            </Col>
            <Col xs={"2"}>
                <div className={"icon-delete"}
                     onClick={removeTrip}>
                    <FontAwesomeIcon size={"lg"} icon={['far', 'trash-alt']}/>
                </div>
            </Col>
        </Row>
    )
};

export default withRouter(UserTrip);