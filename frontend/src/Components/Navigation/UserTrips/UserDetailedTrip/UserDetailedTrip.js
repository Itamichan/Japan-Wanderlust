import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Col, Container, Row} from 'reactstrap';
import {notify} from "react-notify-toast";
import {useParams, withRouter} from "react-router";
import TripUpdate from "../../../TripBanner/TripModal/TripUpdate";
import UserAttraction from "./UserAttractionsList/UserAttraction";
import TripInfo from "../../../TripBanner/TripInfo/TripInfo";


const UserDetailedTrip = ({isUserLoggedIn, history}) => {

    const [tripInfo, setTripInfo] = useState({});
    const [attractions, setAttractions] = useState([]);
    const [executingRequest, setExecutingRequest] = useState(false);
    const [showUpdateTrip, setShowUpdateTrip] = useState(false);

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
                //todo write proper notify messages
                case "NoSuchTrip":
                    notify.show('NoSuchTrip', "error", 1700);
                    break;
                case "NoSuchAttraction":
                    notify.show('NoSuchAttraction', "error", 1700);
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

    useEffect(() => {
        loadTripInfo();
        loadTripAttractions();
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <TripInfo
                            tripName={tripInfo.name}
                            isGuided={tripInfo.is_guided ? "yes" : "no"}
                            inGroup={tripInfo.in_group ? "yes" : "no"}
                            maxPrice={`${tripInfo.max_price} YEN`}
                            maxTripDays={`${tripInfo.max_trip_days} days`}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => setShowUpdateTrip(true)}>Edit trip</Button>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <h3>attractions:</h3>
                    </Col>
                </Row>
                {attractionsList}
            </Container>
            <Button onClick={() => history.goBack()}>back to all the trips</Button>
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
        </div>
    );
};

export default withRouter(UserDetailedTrip)
