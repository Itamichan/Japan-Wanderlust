import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Col, Container, Row} from "reactstrap";
import {setCurrentTrip} from "../../TripBanner/reduxTrip/actions";
import {connect} from "react-redux";
import TripAttractionsInfo from "./TripAttractionsInfo/TripAttractionsInfo";
import {notify} from "react-notify-toast";
import TripsList from "./TripsList/TripsList";

const TripsContainer = ({close, currentTrip, setCurrentTrip}) => {

    const [loading, setLoading] = useState(true);
    const [showAttraction, setShowAttraction] = useState(false);
    const [currentScreen, setCurrentScreen] = useState('tripsList');
    const [executingRequest, setExecutingRequest] = useState(false);

    let screenOption;
    if (currentScreen === 'tripsList') {
        screenOption = <TripsList/>
    }

    return (
        {screenOption}
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
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripsContainer);
export default DefaultApp;