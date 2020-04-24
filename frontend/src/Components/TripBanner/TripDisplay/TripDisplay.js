import React from 'react';
import {setCurrentTrip} from "../reduxTrip/actions";
import {connect} from "react-redux";

const TripDisplay = ({currentTrip}) => {

    let isGuided = currentTrip.is_guided;
    let inGroup = currentTrip.in_group;

    return (
        <div>
            <div>trip info:</div>
            <div>{`trip name: ${currentTrip.name}`}</div>
            <div>{`is guided: ${isGuided ? "yes" : "no"}`}</div>
            <div>{`in group: ${inGroup ? "yes" : "no"}`}</div>
            <div>{`max price: ${currentTrip.max_price} YEN`}</div>
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
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripDisplay);
export default DefaultApp;