import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import axios from "axios";
import {connect} from "react-redux";
import {setCurrentTrip} from "../reduxTrip/actions";
import TripCreate from "../TripModal/TripCreate";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import "./TripChooserModal.scss";
import Spinner from "reactstrap/es/Spinner";

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
        let tripAttractions = data.attractions.map(attraction => {
            return attraction.id
        });
        setCurrentTrip(trip, tripAttractions);
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
        tripsBody =  <Spinner color="warning" />
    }

    if (trips.length === 0) {
        tripsBody =
            <h1 id={"trips-body-empty"} className={"text-header"}>You don't have any trips at the moment</h1>
    } else {
        tripsBody =
            <div id={"trips-body"}>
                <div id={"trips-body-header"}>
                    <h1 className={"text-header"}>Select from existing trips:</h1>
                </div>
                <div>
                    <ListGroup>
                        {tripNamesList}
                    </ListGroup>
                </div>
                <div id={"trips-body-choice"} className={"text-highlight"}>
                    <b>OR</b>
                </div>
            </div>
    }

    return (
        <Modal isOpen={true} id={"trip-choose-modal"}>
            <ModalHeader
                id={"modal-header"}
                toggle={close}
            >
            </ModalHeader>
            <ModalBody>
                <div id={"modal-body"}>
                    <div>
                        {tripsBody}
                    </div>
                    <div id={"create-trip-button"}>
                        <Button className={"action-button"} onClick={() => setShowCreateTrip(true)}>
                            Create a trip
                        </Button>
                    </div>
                </div>
                {showCreateTrip && <TripCreate
                    close={() => setShowCreateTrip(false)}
                    update={(data) => setTrips([...trips, data])}
                />}
            </ModalBody>
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