import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Col, Container, Row} from 'reactstrap';
import {notify} from "react-notify-toast";
import {useParams, withRouter} from "react-router";
import TripUpdate from "../../../TripBanner/TripModal/TripUpdate";
import UserAttraction from "./UserAttractionsList/UserAttraction";
import {connect} from "react-redux";
import "./UserDetailedTrip.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tooltip from "reactstrap/es/Tooltip";


const UserDetailedTrip = ({isUserLoggedIn, history}) => {

    const [tripInfo, setTripInfo] = useState({});
    const [attractions, setAttractions] = useState([]);
    const [executingRequest, setExecutingRequest] = useState(false);
    const [showUpdateTrip, setShowUpdateTrip] = useState(false);
    const [BackIconOpen, setBackIconOpen] = useState(false);
    const [EditIconOpen, setEditIconOpen] = useState(false);

    const toggleBackIcon = () => setBackIconOpen(!BackIconOpen);
    const toggleEditIcon = () => setEditIconOpen(!EditIconOpen);

    //value from history's state
    let {tripId} = useParams();

    const loadTripInfo = async () => {
        try {
            const {data} = await axios.get(`/api/v1/trips/${tripId}`);
            setTripInfo(data)
        } catch (e) {
        } finally {

        }
    };

    const loadTripAttractions = async () => {
        try {
            const {data} = await axios.get(`/api/v1/trips/${tripId}/attractions`);
            setAttractions(data.attractions)
        } catch (e) {

        } finally {

        }
    };

    const removeAttraction = async (tripId, attractionId) => {
        try {
            setExecutingRequest(true);
            await axios.delete(`/api/v1/trips/${tripId}/attractions/${attractionId}`);
            loadTripAttractions()
        } catch (e) {
            switch (e.response.data.error) {
                case "NoSuchTrip":
                    notify.show('No Such Trip', "error", 1700);
                    break;
                case "NoSuchAttraction":
                    notify.show('No Such Attraction', "error", 1700);
                    break;
                default:
                    break;
            }
        } finally {
            setExecutingRequest(false);
        }
    };

    const attractionsList = attractions.map(attraction => {
        return (
            <Row key={attraction.id}>
                <Col>
                    <UserAttraction
                        mediaImg={attraction.picture_url}
                        mediaHeading={attraction.attraction_name}
                        mediaCity={attraction.city.name}
                        removeAttraction={() => removeAttraction(tripId, attraction.id)}
                        disabled={executingRequest}
                        attractionText={attraction.description}
                        attractionPrice={attraction.price}
                        attractionWebAddress={attraction.web_link}
                    />
                </Col>
            </Row>
        )
    });

    let getOfferEmail = async () => {
        try {
            setExecutingRequest(true);
            await axios.patch(`/api/v1/trips/${tripId}`, {
                    finalised: true
                }
            );
            notify.show('Your offer is on the way!', "success", 1700);
        } catch (e) {
        } finally {
            setExecutingRequest(false);
        }
    };

    useEffect(() => {
        loadTripInfo();
        loadTripAttractions();
    }, []);

    //renders component only for logged in users
    if
    (!isUserLoggedIn) {
        return null
    }

    return (
        <div id={"detailed-trip-container"}>
            <Container>
                <Row>
                    <Col xs={"6"}>
                        <div id={"back-button"}>
                            <FontAwesomeIcon
                                id={"back-icon"}
                                size={"2x"}
                                icon="chevron-left"
                                onClick={() => history.goBack()}
                            />
                            <Tooltip placement="right" isOpen={BackIconOpen} target="back-icon"
                                     toggle={toggleBackIcon}>
                                Go to your Trips
                            </Tooltip>
                        </div>
                    </Col>
                    <Col xs={"6"}>
                        <div id={"edit-button"}>
                            <FontAwesomeIcon
                                id={"edit-icon"}
                                size={"2x"}
                                icon="edit"
                                onClick={() => setShowUpdateTrip(true)}
                            />
                            <Tooltip placement="right" isOpen={EditIconOpen} target="edit-icon"
                                     toggle={toggleEditIcon}>
                                Edit your Trip
                            </Tooltip>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col id={"trip-info"}>
                        <Row>
                            <Col>
                                <h1 className={"text-header-important"} id={"trip-name"}>{tripInfo.name}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={"text-header"}>
                                    <FontAwesomeIcon size={"lg"} icon="yen-sign"/>
                                    {` ${tripInfo.max_price} YEN`}
                                </div>
                                <div className={"text-header"}>
                                    <FontAwesomeIcon size={"lg"} icon="street-view"/>
                                    {tripInfo.is_guided ? " Yes" : " No"}
                                </div>
                            </Col>
                            <Col>
                                <div className={"text-header"}>
                                    <FontAwesomeIcon size={"lg"} icon={['far', 'calendar-alt']}/>
                                    {` ${tripInfo.max_trip_days} days`}
                                </div>

                                <div className={"text-header"}>
                                    <FontAwesomeIcon size={"lg"} icon="users"/>
                                    {tripInfo.in_group ? "Yes" : "No"}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col id={"attractions-list-container"}>
                        {attractionsList}
                    </Col>
                </Row>
                <Row>
                    <Col id={"offer-button"}>
                        <Button
                            className={"action-button"}
                            onClick={getOfferEmail}
                            disabled={executingRequest}
                        >
                            Get an offer now!
                        </Button>
                    </Col>
                </Row>
                {showUpdateTrip && <TripUpdate
                    close={() => setShowUpdateTrip(false)}
                    initialTripName={tripInfo.name}
                    initialMaxTripDays={tripInfo.max_trip_days}
                    initialIsGuided={tripInfo.is_guided}
                    initialInGroup={tripInfo.in_group}
                    initialMaxPrice={tripInfo.max_price}
                    tripId={tripId}
                    reloadTripInfo={(update) => {
                        setTripInfo({
                            ...tripInfo,
                            ...update
                        })
                    }}
                />}
            </Container>
        </div>
    );
};

// export default withRouter(UserDetailedTrip)
//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {}
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.LoginReducer.loggedIn
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetailedTrip));
export default DefaultApp;
