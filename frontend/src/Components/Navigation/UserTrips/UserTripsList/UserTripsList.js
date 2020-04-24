import React, {useEffect, useState} from 'react';
import axios from "axios";
import {notify} from "react-notify-toast";
import {Container} from "reactstrap";
import {setCurrentTrip} from "../../../TripBanner/reduxTrip/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import UserTrip from "./UserTrip";
import "./UserTripsList.scss";

const UserTripsList = (props) => {

    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState([]);
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

    const removeTrip = async (tripId) => {
        try {
            setExecutingRequest(true);
            await axios.delete(`/api/v1/trips/${tripId}`);
            loadTrips()
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

    useEffect(() => {
        loadTrips()
    }, []);

    const tripsList = trips.map(trip => {
        return (
            <UserTrip
                key={trip.id}
                disabled={executingRequest}
                mediaHeading={trip.name}
                tripId={trip.id}
                removeTrip={() => removeTrip(trip.id)}
            />
        )
    });

    return (
        <Container fluid="lg" id={"user-trips-container"}>
            {loading ? "loading" : tripsList}
        </Container>
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
const DefaultApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTripsList));
export default DefaultApp;