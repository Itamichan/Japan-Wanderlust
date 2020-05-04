import React, {useState} from 'react';
import {connect} from "react-redux";
import TripChooserModal from "./TripChooser/TripChooserModal";
import {Col, Container, Row, Button, Tooltip} from 'reactstrap';
import TripUpdate from "./TripModal/TripUpdate";
import {setCurrentTrip} from "./reduxTrip/actions";
import {BrowserView} from "react-device-detect";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {notify} from "react-notify-toast";
import "./TripBanner.scss";

const TripBanner = ({isUserLoggedIn, currentTrip, setCurrentTrip, currentAttractionsList}) => {

    const [showChooseModal, setShowChooseModal] = useState(false);
    const [showUpdateTrip, setShowUpdateTrip] = useState(false);
    const [executingRequest, setExecutingRequest] = useState(false);

    //tooltips for trip details icons
    const [moneyIconOpen, setMoneyIconOpen] = useState(false);
    const [timeIconOpen, setTimeIconOpen] = useState(false);
    const [guideIconOpen, setGuideIconOpen] = useState(false);
    const [groupIconOpen, setGroupIconOpen] = useState(false);

    const toggleMoneyIcon = () => setMoneyIconOpen(!moneyIconOpen);
    const toggleTimeIcon = () => setTimeIconOpen(!timeIconOpen);
    const toggleGuideIcon = () => setGuideIconOpen(!guideIconOpen);
    const toggleGroupIcon= () => setGroupIconOpen(!groupIconOpen);


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

    let bannerBody;
    //the visualisation when no trip is selected.
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

    //the visualisation when a trip is selected.
    if (currentTrip) {
        bannerBody =
            <Col id={"with-trip-container"}>
                <Row>
                    <Col id={"trip-banner-header"}>
                        <div className={"text-header-important"}>{currentTrip.name}</div>
                        <FontAwesomeIcon
                            id={"window-close-icon"}
                            icon="times"
                            size={"2x"}
                            onClick={() => setCurrentTrip(undefined, [])}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={"text-header"}>
                            <FontAwesomeIcon icon="yen-sign" id={"money-icon"} size={"2x"}/>
                            {` ${currentTrip.max_price} YEN`}
                            <Tooltip placement="left" isOpen={moneyIconOpen} target="money-icon"
                                     toggle={toggleMoneyIcon}>
                                Your Budget
                            </Tooltip>
                        </div>
                        {/*appears only in browser view*/}
                        <BrowserView>
                            <div className={"text-header"}>
                                <FontAwesomeIcon icon="street-view" id={"guide-icon"} size={"2x"}/>
                                {currentTrip.is_guided ? " Yes" : " No"}
                                <Tooltip placement="left" isOpen={guideIconOpen} target="guide-icon"
                                         toggle={toggleGuideIcon}>
                                    Travel with Guide
                                </Tooltip>
                            </div>
                        </BrowserView>
                    </Col>
                    <Col className={"text-header-important"}>
                        <b>{currentAttractionsList.length}</b>
                        <div className={"text-header"}>Attractions</div>
                    </Col>
                    <Col>
                        <div className={"text-header"}>
                            <FontAwesomeIcon icon={['far', 'calendar-alt']} id={"time-icon"} size={"2x"}/>
                            {` ${currentTrip.max_trip_days} days`}
                            <Tooltip placement="left" isOpen={timeIconOpen} target="time-icon"
                                     toggle={toggleTimeIcon}>
                                Duration
                            </Tooltip>
                        </div>
                        {/*appears only in browser view*/}
                        <BrowserView>
                            <div className={"text-header"}>
                                <FontAwesomeIcon icon="users" id={"group-icon"} size={"2x"}/>
                                {currentTrip.in_group ? " Yes" : " No"}
                                <Tooltip placement="left" isOpen={groupIconOpen} target="group-icon"
                                         toggle={toggleGroupIcon}>
                                    Travel in Group
                                </Tooltip>
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

    if
    (!isUserLoggedIn) {
        return null
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