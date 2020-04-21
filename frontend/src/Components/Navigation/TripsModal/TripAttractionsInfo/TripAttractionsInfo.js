import React, {useEffect, useState} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {Col, Container, Row, Button} from 'reactstrap';
import {notify} from "react-notify-toast";

const TripAttractionsInfo = ({currentTrip}) => {

    const [attractions, setAttractions] = useState([]);
    const [executingRequest, setExecutingRequest] = useState(false);
    const [cityName, setCityName] = useState(undefined);

    const showTripAttractions = async () => {
        try {
            const {data} = await axios.get(`/api/v1/trips/${currentTrip.id}/attractions`);
            setAttractions(data.attractions)
        } catch (e) {

        } finally {

        }
    };

    const removeAttraction = async (tripId, attractionId) => {
        try {
            setExecutingRequest(true);
            const {data} = await axios.delete(`/api/v1/trips/${tripId}/attractions/${attractionId}`);
            showTripAttractions()
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
    //todo create get city_name by id endpoint?

    // const getCityName = async (tripId) => {
    //     try {
    //         const {data} = await axios.get(`/api/v1/cities`);
    //         setAttractions(data.attractions)
    //     } catch (e) {
    //
    //     } finally {
    //
    //     }
    // };

    const attractionsList = attractions.map(attraction => {
        console.log(attraction);
        return (
            <Row>
                <Col>{attraction.attraction_name}</Col>
                <Col>cityName</Col>
                <Col>
                    <Button disabled={executingRequest}
                            onClick={() => removeAttraction(currentTrip.id, attraction.id)}>delete</Button>
                </Col>
            </Row>
        )
    });

    useEffect(() => {
        showTripAttractions()
    }, []);

    let isGuided = currentTrip.is_guided;
    let inGroup = currentTrip.in_group;

    return (
        <div>
            <div>
                <h3>trip info:</h3>
                <div>{`trip name: ${currentTrip.name}`}</div>
                <div>{`is guided: ${isGuided ? "yes" : "no"}`}</div>
                <div>{`in group: ${inGroup ? "yes" : "no"}`}</div>
                <div>{`max price: ${currentTrip.max_price} YEN`}</div>
            </div>
            <div>
                <h3>attractions:</h3>
                <Container>
                    {attractionsList}
                </Container>

            </div>
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
        currentTrip: state.TripReducer.currentTrip
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripAttractionsInfo);
export default DefaultApp;