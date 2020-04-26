import React, {useState} from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';
import "./AttractionCard.scss";
import AttractionCardInfo from "./AttractionCardInfo/AttractionCardInfo";
import {decrementCurrentCount, setCurrentTrip} from "../../TripBanner/reduxTrip/actions";
import {connect} from "react-redux";

const AttractionCard = ({
                            cardTitle, cardImg, cardCity, attractionText, attractionPrice, attractionWebAddress,
                            isUserLoggedIn, currentTrip, currentAttractionCount, decrementCount
                        }) => {

    const [showAttractionInfo, setShowAttractionInfo] = useState(false);

    return (
        <div>
            <Card className={"card-body"}>
                <CardImg
                    className={"card-img"}
                    top width="100%"
                    src={cardImg}
                    alt="img of the attraction"/>
                <CardBody>
                    <CardTitle>{cardTitle}</CardTitle>
                    <CardText>{cardCity}</CardText>
                    <Button color={"info"} onClick={() => setShowAttractionInfo(true)}>read more</Button>
                    <Button color={"success"} onClick={() => decrementCount(currentTrip.id)}>add to the trip</Button>
                </CardBody>
            </Card>
            {showAttractionInfo && <AttractionCardInfo
                close={() => setShowAttractionInfo(false)}
                attractionName={cardTitle}
                attractionCity={cardCity}
                attractionText={attractionText}
                attractionPrice={attractionPrice}
                attractionWebAddress={attractionWebAddress}
                attractionImg={cardImg}
            />}
        </div>
    );
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTrip: (trip) => dispatch(setCurrentTrip(trip)),
        decrementCount: (tripId) => dispatch(decrementCurrentCount(tripId)),
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
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(AttractionCard);
export default DefaultApp;