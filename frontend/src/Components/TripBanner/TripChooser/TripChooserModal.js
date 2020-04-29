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
                className={"trip-name"}
                key={trip.id}
                onClick={() => changeCurrentTrip(trip)}>{trip.name}</ListGroupItem>
        )
    });

    return (
        <Modal isOpen={true}>
            <ModalHeader
                toggle={close}
            >
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col>
                        <p>Select from existing trips:</p>
                        {
                            loading ? (
                                "loading"
                            ) : (
                                <ListGroup flush>
                                    {tripNamesList}
                                </ListGroup>
                            )}
                    </Col>
                    <Col>
                        <p><b>OR</b></p>
                    </Col>
                    <Col>
                        <Button className={"action-button"} onClick={() => setShowCreateTrip(true)}>create a new
                            trip</Button>
                        {showCreateTrip && <TripCreate close={() => setShowCreateTrip(false)}/>}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
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