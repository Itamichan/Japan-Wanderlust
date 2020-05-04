import React, {Fragment, useState} from 'react';
import axios from "axios";
import {notify} from "react-notify-toast";
import TripInputView from "./TripInputView";

const TripUpdate = ({
                        close, initialTripName,
                        initialMaxTripDays,
                        initialIsGuided,
                        initialInGroup,
                        initialMaxPrice, tripId, reloadTripInfo
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
            await axios.patch(`/api/v1/trips/${tripId}`, {
                    name: tripName,
                    max_trip_days: maxTripDays,
                    is_guided: isGuided,
                    in_group: inGroup,
                    max_price: maxPrice
                }
            );
            notify.show('Your trip is successfully updated', "success", 1700);
            reloadTripInfo({
                name: tripName,
                max_trip_days: maxTripDays,
                is_guided: isGuided,
                in_group: inGroup,
                max_price: maxPrice
            });
            close()
        } catch (e) {
            switch (e.response.data.error) {
                case "InvalidName":
                    notify.show('Invalid Name!', "error", 1700);
                    break;
                case "InvalidDaysNumber":
                    notify.show('Invalid Days Number!', "error", 1700);
                    break;
                case "InvalidPriceNumber":
                    notify.show('Invalid Price Number!', "error", 1700);
                    break;
                case "NoParameter":
                    notify.show('No Parameter!', "error", 1700);
                    break;
                case "NoSuchTrip":
                    notify.show('No Such Trip!', "error", 1700);
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
                submit={updateTrip}
                disable={sendingRequest}
                tripTypeName={"Edit your trip"}
            />
        </Fragment>
    )
};

export default TripUpdate
