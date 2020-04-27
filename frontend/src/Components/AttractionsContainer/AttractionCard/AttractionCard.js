import React, {useState} from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';
import "./AttractionCard.scss";
import AttractionCardInfo from "./AttractionCardInfo/AttractionCardInfo";
import {decrementCurrentCount, incrementCurrentCount, setCurrentTrip} from "../../TripBanner/reduxTrip/actions";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AttractionCard = ({
                            cardTitle, cardImg, cardCity, attractionText, attractionPrice, attractionWebAddress,
                            isUserLoggedIn, currentTrip, decrementCount, incrementCount, removeAttraction, addAttraction
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
                    {isUserLoggedIn &&
                    <Button color={"danger"} onClick={removeAttraction}>remove from trip</Button>}
                    {isUserLoggedIn &&
                    <Button color={"success"} onClick={addAttraction}>add to trip</Button>}
                    <FontAwesomeIcon icon="heart" />
                    <FontAwesomeIcon icon={['far', 'heart']} />
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
        decrementCount: (tripId) => dispatch(decrementCurrentCount(tripId)),
        incrementCount: (tripId) => dispatch(incrementCurrentCount(tripId))
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.LoginReducer.loggedIn
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(AttractionCard);
export default DefaultApp;