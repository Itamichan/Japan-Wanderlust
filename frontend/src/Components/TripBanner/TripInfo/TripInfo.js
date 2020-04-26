import React from 'react';

const TripInfo = ({tripName, isGuided, inGroup, maxPrice, maxTripDays}) => {

    return (
        <div>
            <div>trip info:</div>
            <div>{`trip name: ${tripName}`}</div>
            <div>{`is guided: ${isGuided}`}</div>
            <div>{`in group: ${inGroup}`}</div>
            <div>{`max price: ${maxPrice}`}</div>
            <div>{`max trip days: ${maxTripDays}`}</div>
        </div>
    )
};

export default TripInfo;