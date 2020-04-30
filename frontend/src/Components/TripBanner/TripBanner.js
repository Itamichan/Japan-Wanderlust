import React, {useState} from 'react';
import {connect} from "react-redux";
import "./TripBanner.scss";
import TripChooserModal from "./TripChooser/TripChooserModal";
import TripInfo from "./TripInfo/TripInfo";
import {Col, Container, Row} from 'reactstrap';
import Button from "reactstrap/es/Button";
import TripUpdate from "./TripModal/TripUpdate";
import {setCurrentTrip} from "./reduxTrip/actions";
import {isBrowser} from "react-device-detect";

const TripBanner = ({isUserLoggedIn, currentTrip, setCurrentTrip, currentAttractionCount}) => {

    const [showChooseModal, setShowChooseModal] = useState(false);
    const [showUpdateTrip, setShowUpdateTrip] = useState(false);


    //todo look to use maybe the same conditional for other comp
    if
    (!isUserLoggedIn) {
        return null
    }

    let bannerBody;

    if (!currentTrip) {
        bannerBody =
            <Col>
                <Row>
                    <Col>
                        <h1 className={"text-header"}>Add your favourite attractions to a trip</h1>
                    </Col>
                </Row>
                <Row>
                    <Button className={"action-button"} onClick={() => setShowChooseModal(true)}>Select a trip</Button>
                </Row>
            </Col>
    }

    if (currentTrip) {
        bannerBody =
            <Col>
                <Row>
                    <Col>
                        <div>{`trip name: ${currentTrip.name}`}</div>
                        <button onClick={() => setCurrentTrip(undefined)}>x</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>{`max price: ${currentTrip.max_price} YEN`}</div>
                        {isBrowser &&
                        <div>
                            {`is guided: ${currentTrip.is_guided ? "yes" : "no"}`}
                        </div>}
                    </Col>
                    <Col>
                        {currentAttractionCount}
                    </Col>
                    <Col>
                        <div>{`max trip days: ${currentTrip.max_trip_days} days`}</div>
                        {isBrowser &&
                        <div>
                            {`in group: ${currentTrip.in_group ? "yes" : "no"}`}
                        </div>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className={"action-button"} onClick={() => setShowUpdateTrip(true)}>Edit trip</Button>
                        <Button>Get an offer now!</Button>
                    </Col>
                </Row>
            </Col>

    }

    {/*<TripInfo*/
    }
    {/*    tripName={currentTrip.name}*/
    }
    {/*    isGuided={currentTrip.is_guided ? "yes" : "no"}*/
    }
    {/*    inGroup={currentTrip.in_group ? "yes" : "no"}*/
    }
    {/*    maxPrice={`${currentTrip.max_price} YEN`}*/
    }
    {/*    maxTripDays={`${currentTrip.max_trip_days} days`}*/
    }
    {/*/>*/
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
        </section>
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
        currentTrip: state.TripReducer.currentTrip,
        currentAttractionCount: state.TripReducer.currentAttractionCount
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripBanner);
export default DefaultApp;