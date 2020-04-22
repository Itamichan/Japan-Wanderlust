import React, {useEffect, useState} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {Col, Container, Row, Button} from 'reactstrap';
import {notify} from "react-notify-toast";
import {useLocation, useParams, withRouter} from "react-router";


const TripAttractionsInfo = ({history}) => {

    const [tripInfo, setTripInfo] = useState({});
    const [attractions, setAttractions] = useState([]);
    const [executingRequest, setExecutingRequest] = useState(false);

    let tripId = useLocation().state.tripId;

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
            const {data} = await axios.delete(`/api/v1/trips/${tripId}/attractions/${attractionId}`);
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
            }
        } finally {
            setExecutingRequest(false);
        }
    };

    const attractionsList = attractions.map(attraction => {
        return (
            <Row>
                <Col>{attraction.attraction_name}</Col>
                <Col>{attraction.city.name}</Col>
                <Col>
                    {/*todo implement get attraction_info*/}
                    <Button color="warning">More Info</Button>
                </Col>
                <Col>
                    <Button color="danger" disabled={executingRequest}
                            onClick={() => removeAttraction(tripId, attraction.id)}>delete</Button>
                </Col>

            </Row>
        )
    });

    useEffect(() => {
        loadTripInfo();
        loadTripAttractions();
    }, []);

    let isGuided = tripInfo.is_guided;
    let inGroup = tripInfo.in_group;

    return (
        <div>
            <Container>
                <Row>
                    <Col>{`trip name: ${tripInfo.name}`}</Col>
                    <Col>{`is guided: ${isGuided ? "yes" : "no"}`}</Col>
                </Row>
                <Row>
                    <Col>{`in group: ${inGroup ? "yes" : "no"}`}</Col>
                    <Col>{`max price: ${tripInfo.max_price} YEN`}</Col>
                </Row>
            </Container>
            <div>trip's id: {tripId}</div>
            <Container>
                <Row>
                    <Col>
                        <h3>attractions:</h3>
                    </Col>
                </Row>
                {attractionsList}
            </Container>
            <Button onClick={() => history.goBack()}>back to all the trips</Button>
        </div>
    )
};

export default withRouter(TripAttractionsInfo)
