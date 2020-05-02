import React, {useState} from 'react';
import {connect} from "react-redux";
import "./TripBanner.scss";
import TripChooserModal from "./TripChooser/TripChooserModal";
import {Col, Container, Row} from 'reactstrap';
import Button from "reactstrap/es/Button";
import TripUpdate from "./TripModal/TripUpdate";
import {setCurrentTrip} from "./reduxTrip/actions";
import {BrowserView} from "react-device-detect";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {notify} from "react-notify-toast";

const TripBanner = ({isUserLoggedIn, currentTrip, setCurrentTrip, currentAttractionsList}) => {

    const [showChooseModal, setShowChooseModal] = useState(false);
    const [showUpdateTrip, setShowUpdateTrip] = useState(false);
    const [executingRequest, setExecutingRequest] = useState(false);


    let getOfferEmail = async () => {
        try {
            setExecutingRequest(true);
            await axios.patch(`/api/v1/trips/${currentTrip.id}`, {
                    finalised: true
                }
            );
            notify.show('Your offer is on the way!', "success", 1700);
        } catch (e) {
        } finally {
            setExecutingRequest(false);
        }
    };

    //todo look to use maybe the same conditional for other comp
    if
    (!isUserLoggedIn) {
        return null
    }

    let bannerBody;

    if (!currentTrip) {
        bannerBody =
            <Col id={"no-trip-container"}>
                <Row>
                    <Col>
                        <h1 className={"text-header-important"}>Add your favourite attractions to a trip</h1>
                    </Col>
                </Row>
                <Row id={"trip-banner-button"}>
                    <Button className={"action-button"} onClick={() => setShowChooseModal(true)}>Select a trip</Button>
                </Row>
            </Col>
    }

    if (currentTrip) {
        bannerBody =
            <Col id={"with-trip-container"}>
                <Row>
                    <Col id={"trip-banner-header"}>
                        <div className={"text-header-important"}>{currentTrip.name}</div>
                        <FontAwesomeIcon
                            id={"window-close-icon"}
                            icon="times"
                            onClick={() => setCurrentTrip(undefined, [])}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={"text-header"}>
                            <FontAwesomeIcon icon="yen-sign"/>
                            {` ${currentTrip.max_price} YEN`}
                        </div>
                        {/*appears only in browser view*/}
                        <BrowserView>
                            <div className={"text-header"}>
                                <FontAwesomeIcon icon="street-view"/>
                                {currentTrip.is_guided ? " Yes" : " No"}
                            </div>
                        </BrowserView>
                    </Col>
                    <Col className={"text-header-important"}>
                        <b>{currentAttractionsList.length}</b>
                        <div className={"text-header"}>Attractions</div>
                    </Col>
                    <Col>
                        <div className={"text-header"}>
                            <FontAwesomeIcon icon={['far', 'calendar-alt']}/>
                            {` ${currentTrip.max_trip_days} days`}
                        </div>
                        {/*appears only in browser view*/}
                        <BrowserView>
                            <div className={"text-header"}>
                                <FontAwesomeIcon icon="users"/>
                                {currentTrip.in_group ? " Yes" : " No"}
                            </div>
                        </BrowserView>
                    </Col>
                </Row>
                <Row>
                    <Col id={"banner-buttons"}>
                        <Button className={"action-button"} onClick={() => setShowUpdateTrip(true)}>Edit trip</Button>
                        <Button
                            className={"action-button"}
                            onClick={getOfferEmail}
                            disabled={executingRequest}
                        >
                            Get an offer now!
                        </Button>
                    </Col>
                </Row>
            </Col>
    }

    return (
        <section id={"trip-banner"}>
            <Container fluid>
                <Row>
                    {bannerBody}
                </Row>
            </Container>
            {showChooseModal && <TripChooserModal close={() => setShowChooseModal(false)}/>}
            {showUpdateTrip && <TripUpdate
                close={() => setShowUpdateTrip(false)}
                initialTripName={currentTrip.name}
                initialMaxTripDays={currentTrip.max_trip_days}
                initialIsGuided={currentTrip.is_guided}
                initialInGroup={currentTrip.in_group}
                initialMaxPrice={currentTrip.max_price}
                tripId={currentTrip.id}
                reloadTripInfo={(update) => {
                    setCurrentTrip({
                        ...currentTrip,
                        ...update
                    }, undefined)
                }}
            />}
        </section>
    )
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTrip: (trip, attractionsList) => dispatch(setCurrentTrip(trip, attractionsList))
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.LoginReducer.loggedIn,
        currentTrip: state.TripReducer.currentTrip,
        currentAttractionsList: state.TripReducer.currentAttractionsList
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripBanner);
export default DefaultApp;