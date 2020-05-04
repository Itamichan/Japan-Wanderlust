import React, {useState} from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';
import "./AttractionCard.scss";
import AttractionCardInfo from "./AttractionCardInfo/AttractionCardInfo";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {openModal} from "../../Login/redux/actions";
import TripChooserModal from "../../TripBanner/TripChooser/TripChooserModal";

const AttractionCard = ({
                            cardTitle, cardImg, cardCity, attractionText, attractionPrice, attractionWebAddress,
                            isUserLoggedIn, currentTrip, removeAttraction, addAttraction, openLoginModal, isAttractionSelected
                        }) => {

    const [showAttractionInfo, setShowAttractionInfo] = useState(false);
    const [showChooseModal, setShowChooseModal] = useState(false);

    const addAttractionToCurrentTrip = () => {
        if (!isUserLoggedIn) {
            return openLoginModal();
        }

        if (currentTrip) {
            addAttraction();
        } else {
            setShowChooseModal(true)
        }
    };

    const removeAttractionFromCurrentTrip = () => {
        if (currentTrip) {
            removeAttraction();
        }
    };

    return (
        <div className={"attraction-container"}>
            <Card className={"card"} >
                <CardImg
                    className={"card-img"}
                    top width="100%"
                    src={cardImg}
                    alt="img of the attraction"
                    onClick={() => setShowAttractionInfo(true)}
                />
                {
                    isAttractionSelected ?
                        (
                            <FontAwesomeIcon
                                className={"filled-heart-icon"}
                                size={"2x"}
                                icon="heart"
                                onClick={removeAttractionFromCurrentTrip}
                            />
                        ) : (
                            <FontAwesomeIcon
                                className={"disabled-heart-icon"}
                                size={"2x"}
                                icon="heart"
                                onClick={addAttractionToCurrentTrip}
                            />
                        )
                }
                <CardBody onClick={() => setShowAttractionInfo(true)}>
                    <CardTitle className={"text-header"}>{cardTitle}</CardTitle>
                    <CardText className={"text-highlight"}>{cardCity}</CardText>
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
            {showChooseModal && <TripChooserModal close={() => setShowChooseModal(false)}/>}
        </div>
    );
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        openLoginModal: () => dispatch(openModal()),
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
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(AttractionCard);
export default DefaultApp;