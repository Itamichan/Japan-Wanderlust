import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import axios from "axios";
import {connect} from "react-redux";
import {setCurrentTrip} from "../reduxTrip/actions";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import TripCreate from "../TripModal/TripCreate";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import "./TripChooserModal.scss";

const TripChooserModal = ({close, setCurrentTrip}) => {

    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState([]);
    const [showCreateTrip, setShowCreateTrip] = useState(false);


    const loadTrips = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get('/api/v1/trips');
            setTrips(data.trips)
        } catch (e) {

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTrips()
    }, []);

    const changeCurrentTrip = async (trip) => {
        const {data} = await axios.get(`/api/v1/trips/${trip.id}/attractions`);

        setCurrentTrip(trip, data.attractions.length);
        close()
    };

    const tripNamesList = trips.map(trip => {
        return (
            <ListGroupItem
                className={"trip-name text-highlight"}
                key={trip.id}
                onClick={() => changeCurrentTrip(trip)}>{trip.name}</ListGroupItem>
        )
    });

    let tripsBody;

    if (loading) {
        tripsBody = "loading"
    }

    if (trips.length === 0) {
        tripsBody =
            <h1 className={"text-header"}>You don't have any trips at the moment</h1>
    } else {
        tripsBody =
            <Row id={"trips-body"}>
                <Col xs={"8"}>
                    <h1 className={"text-header"}>Select from existing trips:</h1>
                    <ListGroup flush>
                        {tripNamesList}
                    </ListGroup>
                </Col>
                <Col xs={"4"} className={"text-highlight"} id={"trips-body-middle"}>
                    <div><b>OR</b></div>
                </Col>
            </Row>
    }

    return (
        <Modal isOpen={true} id={"trip-choose-modal"}>
            <ModalHeader
                id={"modal-header"}
                toggle={close}
            >
            </ModalHeader>
            <ModalBody>
                <Row id={"modal-body"}>
                    <Col xs={"8"}>
                        {tripsBody}
                    </Col>
                    <Col xs={"4"}>
                        <Button className={"action-button"} onClick={() => setShowCreateTrip(true)}>create a
                            trip</Button>
                        {showCreateTrip && <TripCreate
                            close={() => setShowCreateTrip(false)}
                            update={(data) => setTrips([...trips, data])}
                        />}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter id={"modal-footer"}>
                <Button onClick={close}>close</Button>
            </ModalFooter>
        </Modal>

    )
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTrip: (trip, attractionCount) => dispatch(setCurrentTrip(trip, attractionCount))
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {}
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripChooserModal);
export default DefaultApp;