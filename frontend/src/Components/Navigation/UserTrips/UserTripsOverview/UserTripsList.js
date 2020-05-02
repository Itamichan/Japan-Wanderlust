import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Container} from "reactstrap";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import UserTrip from "./UserTrip";
import "./UserTripsList.scss";
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";
import Button from "reactstrap/es/Button";
import TripCreate from "../../../TripBanner/TripModal/TripCreate";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tooltip from "reactstrap/es/Tooltip";

const UserTripsList = ({isUserLoggedIn, history}) => {

    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState([]);
    const [showCreateTrip, setShowCreateTrip] = useState(false);
    const [error, setError] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const loadTrips = async () => {
        try {
            setLoading(true);
            setError(false);
            const {data} = await axios.get('/api/v1/trips', {
                timeout: 750
            });
            setTrips(data.trips)
        } catch (e) {
            setError(true)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTrips()
    }, []);

    const tripsList = trips.map(trip => {
        return (
            <ListGroupItem>
                <UserTrip
                    key={trip.id}
                    mediaHeading={trip.name}
                    tripId={trip.id}
                    removedTrip={() => setTrips(prevState => {
                        return prevState.filter(element => element.id !== trip.id)
                    })}
                />
            </ListGroupItem>
        )
    });

    return (
        <div>
            {isUserLoggedIn ? (
                <Container fluid="lg" id={"user-trips-container"}>
                    <Row>
                        <Col xs={"8"} id={"user-trips-heading"}>
                            <h1 className={"text-header-important"}>Your Trips:</h1>
                        </Col>
                        <Col xs={"4"} id={"add-trip"}>
                            {
                                error ? (
                                    <div>
                                        <p>something went wrong</p>
                                        <Button onClick={loadTrips}>reload</Button>
                                    </div>
                                ) : (
                                    <div>
                                        <span id={"icon-add"} onClick={() => setShowCreateTrip(true)}>
                                            <FontAwesomeIcon size={"2x"} icon="plus"/>
                                            <Tooltip placement="right" isOpen={tooltipOpen} target="icon-add"
                                                     toggle={toggle}>
                                            Create a new Trip
                                            </Tooltip>
                                        </span>
                                        {showCreateTrip && <TripCreate
                                            close={() => setShowCreateTrip(false)}
                                            update={(data) => setTrips([...trips, data])}/>}
                                    </div>
                                )
                            }
                        </Col>
                    </Row>
                    {loading ? (
                        "loading"
                    ) : (
                        <div id={"trips-list"}>
                            <ListGroup>
                                {tripsList}
                            </ListGroup>
                        </div>
                    )}
                </Container>
            ) : (
                history.push("/")
            )}
        </div>
    )
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {}
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.LoginReducer.loggedIn
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTripsList));
export default DefaultApp;