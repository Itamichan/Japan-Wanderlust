import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";
import "./TripBanner.scss";
import TripChooserModal from "./TripChooser/TripChooserModal";
import TripInfo from "./TripInfo/TripInfo";
import TripCreate from "./TripModal/TripCreate";
import {Col, Container, Row} from 'reactstrap';
import Button from "reactstrap/es/Button";
import TripUpdate from "./TripModal/TripUpdate";
import {setCurrentTrip} from "./reduxTrip/actions";
import UserAttraction from "../Navigation/UserTrips/UserDetailedTrip/UserAttractionsList/UserAttraction";

const TripBanner = ({isUserLoggedIn, currentTrip, setCurrentTrip}) => {

    const [showChooseModal, setShowChooseModal] = useState(false);
    const [showCreateTrip, setShowCreateTrip] = useState(false);
    const [showUpdateTrip, setShowUpdateTrip] = useState(false);


    const actionButtons = <div>
        <Button onClick={() => setShowCreateTrip(true)}>create a trip</Button>
        <Button onClick={() => setShowChooseModal(true)}>choose a trip</Button>
        {currentTrip && <Button onClick={() => setShowUpdateTrip(true)}>Edit trip</Button>}
    </div>;


    //todo look to use maybe the same conditional for other comp
    if
    (!isUserLoggedIn) {
        return null
    }
    return (
        <Fragment>
            <Container fluid id={"trip-banner"}>
                <Row>
                    <Col>
                        <div>{
                            currentTrip ? (
                                <TripInfo
                                    tripName={currentTrip.name}
                                    isGuided={currentTrip.is_guided ? "yes" : "no"}
                                    inGroup={currentTrip.in_group ? "yes" : "no"}
                                    maxPrice={`${currentTrip.max_price} YEN`}
                                    maxTripDays={`${currentTrip.max_trip_days} days`}
                                />
                            ) : (
                                "start your work on a new trip"
                            )}
                        </div>
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        {actionButtons}
                    </Col>
                </Row>
            </Container>
            {showChooseModal && <TripChooserModal close={() => setShowChooseModal(false)}/>}
            {showCreateTrip && <TripCreate close={() => setShowCreateTrip(false)}/>}
            {showUpdateTrip && <TripUpdate
                close={() => setShowUpdateTrip(false)}
                initialTripName={currentTrip.name}
                initialMaxTripDays={currentTrip.max_trip_days}
                initialIsGuided={currentTrip.isGuided}
                initialInGroup={currentTrip.inGroup}
                initialMaxPrice={currentTrip.max_price}
                tripId={currentTrip.id}
                reloadTripInfo={(update) => {
                    setCurrentTrip({
                        ...currentTrip,
                        ...update
                    })
                }}
            />}
        </Fragment>
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
        isUserLoggedIn: state.LoginReducer.loggedIn,
        currentTrip: state.TripReducer.currentTrip
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripBanner);
export default DefaultApp;