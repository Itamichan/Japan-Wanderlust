import React, {Fragment, useEffect, useState} from 'react';
import {
    Button,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import axios from "axios";
import {notify} from "react-notify-toast";
import {connect} from "react-redux";
import {setCurrentTrip} from "../reduxTrip/actions";
import CustomInput from "reactstrap/es/CustomInput";
import TripInputView from "./TripInputView";

const TripUpdate = ({
                        close, initialTripName,
                        initialMaxTripDays,
                        initialIsGuided,
                        initialInGroup,
                        initialMaxPrice, tripId, updateTripInfo
                    }) => {

    const [sendingRequest, setSendingRequest] = useState(false);
    const [tripName, setTripName] = useState(initialTripName);
    const [maxTripDays, setMaxTripDays] = useState(initialMaxTripDays);
    const [isGuided, setIsGuided] = useState(initialIsGuided);
    const [inGroup, setInGroup] = useState(initialInGroup);
    const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

    const updateTrip = async () => {
        try {
            setSendingRequest(true);
            const {data} = await axios.patch(`/api/v1/trips/${tripId}`, {
                    name: tripName,
                    max_trip_days: maxTripDays,
                    is_guided: isGuided,
                    in_group: inGroup,
                    max_price: maxPrice
                }
            );
            updateTripInfo();
            notify.show('yay!!', "success", 1700);
            close()
        } catch (e) {
            switch (e.response.data.error) {
                //todo write proper notify messages
                case "InvalidName":
                    notify.show('InvalidName!', "error", 1700);
                    break;
                case "InvalidDaysNumber":
                    notify.show('InvalidDaysNumber!', "error", 1700);
                    break;
                case "InvalidPriceNumber":
                    notify.show('InvalidPriceNumber!', "error", 1700);
                    break;
                case "NoParameter":
                    notify.show('NoParameter!', "error", 1700);
                    break;
                case "NoSuchTrip":
                    notify.show('NoSuchTrip!', "error", 1700);
                    break;
            }
        } finally {
            setSendingRequest(false);
        }
    };

    return (
        <Fragment>
            <TripInputView
                tripName={tripName}
                maxTripDays={maxTripDays}
                isGuided={isGuided}
                inGroup={inGroup}
                maxPrice={maxPrice}
                setTripName={setTripName}
                setMaxTripDays={setMaxTripDays}
                setIsGuided={setIsGuided}
                setInGroup={setInGroup}
                setMaxPrice={setMaxPrice}
                close={close}
                submit={updateTrip}
                disable={sendingRequest}
                tripTypeName={"Edit your trip"}
            />
        </Fragment>
    )
};

export default TripUpdate
