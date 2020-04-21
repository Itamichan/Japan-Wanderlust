import React, {useEffect, useState} from 'react';
import axios from "axios";
import {setCurrentTrip} from "../reduxTrip/actions";
import {connect} from "react-redux";
import {notify} from "react-notify-toast";

const TripDisplay = ({currentTripId}) => {

    console.log(`currentTripId: ${currentTripId}`);

    const [loading, setLoading] = useState(true);
    const [tripInfo, setTripInfo] = useState(undefined);

    const showTripInfo = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get(`/api/v1/trips/${currentTripId}`);

            setTripInfo(data)

        } catch (e) {
            switch (e.response.data.error) {
                //todo write proper notify messages
                case "NoSuchTrip":
                    notify.show('No Such Trip!', "error", 1700);
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        showTripInfo()
    }, [currentTripId]);

    return (
        <div>{loading ? "loading" : <div>{tripInfo}</div>}</div>
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
        currentTripId: state.TripReducer.currentTrip.id
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripDisplay);
export default DefaultApp;