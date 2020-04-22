import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Col, Container, Row} from "reactstrap";
import {setCurrentTrip} from "../../TripBanner/reduxTrip/actions";
import {connect} from "react-redux";
import TripAttractionsInfo from "./TripAttractionsInfo/TripAttractionsInfo";
import {notify} from "react-notify-toast";

const TripsModal = ({close, currentTrip, setCurrentTrip}) => {

    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState([]);
    const [showAttraction, setShowAttraction] = useState(false);
    const [framestate, setframeState] = useState('trips');
    const [executingRequest, setExecutingRequest] = useState(false);

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

    const editTripInfo = async () => {
        try {
            const {data} = await axios.patch('/api/v1/trips');

        } catch (e) {

        } finally {
        }
    };

    const removeTrip = async (tripId) => {
        try {
            setExecutingRequest(true);
            const {data} = await axios.delete(`/api/v1/trips/${tripId}`);
            loadTrips()
        } catch (e) {
            switch (e.response.data.error) {
                //todo write proper notify messages
                case "NoSuchTrip":
                    notify.show('NoSuchTrip', "error", 1700);
                    break;
            }
        } finally {
            setExecutingRequest(false);
        }
    };

    useEffect(() => {
        loadTrips()
    }, []);


    const tripsList = trips.map(trip => {
        console.log(trip);
        return (
            <Row>
                <Col>{trip.name}</Col>
                <Col>
                    <Button color="success" onClick={() => {
                        setCurrentTrip(trip);
                        setShowAttraction(true)
                    }}>See your trip</Button>
                </Col>
                <Col>
                    <Button disabled={executingRequest} color="danger" onClick={() => removeTrip(trip.id)}>Remove
                        trip</Button>
                </Col>
            </Row>
        )
    });

    const tripFrame = (
        <Fragment>
            <ModalHeader>
                "Your trips"
            </ModalHeader>
            <ModalBody>
                <Container>
                    {tripsList}
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button onClick={close}>close</Button>
            </ModalFooter>
        </Fragment>
    )


    return (
        <Modal isOpen={true}>

            {framestate === "trips" && tripFrame}
            {framestate === "trip" && tripFrame}
            {framestate === "trips" && tripFrame}




            <ModalHeader>
                {showAttraction ? (
                    <Row>
                        <Col>
                            <h3>{currentTrip.name}</h3>
                        </Col>
                        <Col xs="auto">
                            <Button color={"warning"} onClick={editTripInfo}>update your Trip</Button>
                        </Col>
                    </Row>
                ) : (
                    "Your trips"
                )}
            </ModalHeader>
            <ModalBody>
                {
                    loading ?
                        ("loading") :

                        (<div>
                            {showAttraction ? (
                                <TripAttractionsInfo/>
                            ) : (
                                <Container>
                                    {tripsList}
                                </Container>
                            )}
                        </div>)
                }
            </ModalBody>
            <ModalFooter>
                {showAttraction && <Button onClick={() => setShowAttraction(false)}>go back</Button>}
                <Button onClick={close}>close</Button>

            </ModalFooter>
        </Modal>

    )
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTrip: (trip) => dispatch(setCurrentTrip(trip))
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        currentTrip: state.TripReducer.currentTrip
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripsModal);
export default DefaultApp;