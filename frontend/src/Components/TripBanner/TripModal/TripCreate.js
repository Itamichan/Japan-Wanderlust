import React, {Fragment, useState} from 'react';
import axios from "axios";
import {notify} from "react-notify-toast";
import TripInputView from "./TripInputView";

const TripCreate = ({close}) => {

    const [sendingRequest, setSendingRequest] = useState(false);
    const [tripName, setTripName] = useState("");
    const [maxTripDays, setMaxTripDays] = useState("");
    const [isGuided, setIsGuided] = useState(false);
    const [inGroup, setInGroup] = useState(false);
    const [maxPrice, setMaxPrice] = useState("");

    const createTrip = async () => {
        try {
            setSendingRequest(true);
            await axios.post('/api/v1/trips', {
                    name: tripName,
                    max_trip_days: maxTripDays,
                    is_guided: isGuided,
                    in_group: inGroup,
                    max_price: maxPrice
                }
            );
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
                case "InvalidDataEntry":
                    notify.show('InvalidDataEntry!', "error", 1700);
                    break;
                case "ParameterError":
                    notify.show('ParameterError!', "error", 1700);
                    break;
                case "Unauthorized":
                    notify.show('Invalid Token!', "error", 1700);
                    break;
                default:
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
                submit={createTrip}
                disable={sendingRequest}
                tripTypeName={"Create a new trip"}
            />
        </Fragment>
    )
};

export default TripCreate
