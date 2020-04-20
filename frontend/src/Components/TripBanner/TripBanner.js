import React, {Fragment, useState} from 'react';
import {openModal} from "../Login/redux/actions";
import {connect} from "react-redux";
import "./TripBanner.scss";
import TripChooserModal from "./TripChooser/TripChooserModal";
import TripDisplay from "./TripDisplay/TripDisplay";
import TripCreateModal from "./TripCreate/TripCreateModal";

const TripBanner = ({isUserLoggedIn, currentTrip}) => {

    const [showChooseModal, setShowChooseModal] = useState(false);
    const [showCreateTrip, setShowCreateTrip] = useState(false);

    const actionButtons = <div>
        <button onClick={() => setShowCreateTrip(true)}>create a trip</button>
        <button onClick={() => setShowChooseModal(true)}>choose a trip</button>
    </div>;

        if
    (!isUserLoggedIn)
    {
        return null
    }
    return (
        <div id={"trip-banner"}>
            {currentTrip ? <TripDisplay/> : actionButtons}
            {showChooseModal && <TripChooserModal close={() => setShowChooseModal(false)}/>}
            {showCreateTrip && <TripCreateModal close={() => setShowChooseModal(false)}/>}
        </div>
    )
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {}
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.LoginReducer.loggedIn,
        currentTrip: state.TripReducer.currentTrip
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripBanner);
export default DefaultApp;