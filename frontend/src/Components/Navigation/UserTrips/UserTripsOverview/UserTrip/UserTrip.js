import React, {useState} from 'react';
import {Button, Col, Row} from "reactstrap";
import {withRouter} from "react-router";
import "./UserTrip.scss";
import axios from "axios";
import {notify} from "react-notify-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UserTrip = ({history, mediaHeading, tripId, removedTrip}) => {

    const [executingRequest, setExecutingRequest] = useState(false);

    const removeTrip = async () => {
        try {
            setExecutingRequest(true);
            await axios.delete(`/api/v1/trips/${tripId}`);
            removedTrip()
        } catch (e) {
            switch (e.response.data.error) {
                //todo write proper notify messages
                case "NoSuchTrip":
                    notify.show('NoSuchTrip', "error", 1700);
                    break;
                default:
                    break;
            }
        } finally {
            setExecutingRequest(false);
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
                    <FontAwesomeIcon icon={['far', 'trash-alt']}/>
                </div>
            </Col>
        </Row>
    )
};

export default withRouter(UserTrip);