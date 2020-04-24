import React, {useState} from 'react';
import {Button, Col, Row} from "reactstrap";
import {withRouter} from "react-router";
import "./UserTrip.scss";
import axios from "axios";
import {notify} from "react-notify-toast";

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
            <Col xs={"8"} className={"user-trip-heading"}>
                <h4> {mediaHeading}</h4>
            </Col>
            <Col xs={"4"}>
                <Row>
                    <Col>
                        <Button color="success"
                                disabled={executingRequest}
                                onClick={() => history.push(`/trips/${tripId}`)}>see
                            more
                        </Button>
                    </Col>
                    <Col>
                        <Button disabled={executingRequest} color="danger" onClick={removeTrip}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export default withRouter(UserTrip);