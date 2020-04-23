import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";
import "./TripBanner.scss";
import TripChooserModal from "./TripChooser/TripChooserModal";
import TripDisplay from "./TripDisplay/TripDisplay";
import TripCreate from "./TripModal/TripCreate";
import {Col, Container, Row} from 'reactstrap';
import Button from "reactstrap/es/Button";

const TripBanner = ({isUserLoggedIn, currentTrip}) => {

    const [showChooseModal, setShowChooseModal] = useState(false);
    const [showCreateTrip, setShowCreateTrip] = useState(false);

    const actionButtons = <div>
        <Button onClick={() => setShowCreateTrip(true)}>create a trip</Button>
        <Button onClick={() => setShowChooseModal(true)}>choose a trip</Button>
    </div>;

    if
    (!isUserLoggedIn) {
        return null
    }
    return (
        <Fragment>
            <Container fluid id={"trip-banner"}>
                <Row>
                    <Col>
                        <div>{currentTrip? <TripDisplay/> : "start your work on a new trip"}</div>
                    </Col>
                    <Col>
                        <div>{actionButtons}</div>
                    </Col>
                </Row>
            </Container>
            {showChooseModal && <TripChooserModal close={() => setShowChooseModal(false)}/>}
            {showCreateTrip && <TripCreate close={() => setShowCreateTrip(false)}/>}
        </Fragment>
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