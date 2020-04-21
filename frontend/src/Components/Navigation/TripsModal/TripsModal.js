import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {setCurrentTrip} from "../../TripBanner/reduxTrip/actions";
import {connect} from "react-redux";
import TripAttractionsInfo from "./TripAttractionsInfo/TripAttractionsInfo";

const TripsModal = ({close, setCurrentTrip}) => {

    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState([]);
    const [showAttraction, setShowAttraction] = useState(false);

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

    const tripsList = trips.map(trip => {
        return (
            <div onClick={() => {
                setCurrentTrip(trip);
                setShowAttraction(true)
            }}>{trip.name}</div>
        )
    });

    return (
        <Modal isOpen={true}>
            <ModalHeader>
                {showAttraction ? "Your attractions" : "Your trips"}
            </ModalHeader>
            <ModalBody>
                {
                    loading ?
                        ("loading") :

                        (<div>
                            {showAttraction ? <TripAttractionsInfo/> : tripsList}
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
    return {}
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripsModal);
export default DefaultApp;