import React, {useEffect, useState} from 'react';
import axios from "axios";
import {notify} from "react-notify-toast";
import {Button, Col, Row} from "reactstrap";
import {setCurrentTrip} from "../../../TripBanner/reduxTrip/actions";
import {connect} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import {withRouter} from "react-router";

const TripsList = ({history}) => {

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
                    <Button color="success" onClick={() => history.push(`/trips/${trip.id}`)}>see
                        more
                    </Button>
                </Col>
                <Col>
                    <Button disabled={executingRequest} color="danger" onClick={() => removeTrip(trip.id)}>Remove
                        trip</Button>
                </Col>
            </Row>
        )
    });

    return (
        <div>
            {loading ? "loading" : tripsList}
        </div>
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
const DefaultApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(TripsList));
export default DefaultApp;