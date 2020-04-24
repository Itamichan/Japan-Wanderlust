import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import axios from "axios";
import {connect} from "react-redux";
import {setCurrentTrip} from "../reduxTrip/actions";

const TripChooserModal = ({close, setCurrentTrip}) => {

    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState([]);


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

    const tripName = trips.map(trip => {
        return (
            <div
                key={trip.id}
                onClick={() => {
                    setCurrentTrip(trip);
                    close()
                }}>{trip.name}</div>
        )
    });

    return (
        <Modal isOpen={true}>
            <ModalHeader>

            </ModalHeader>
            <ModalBody>
                {loading ? "loading" : tripName}
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
        setCurrentTrip: (trip) => dispatch(setCurrentTrip(trip))
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {}
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripChooserModal);
export default DefaultApp;