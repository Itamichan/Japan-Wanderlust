export const setCurrentTrip = (trip, attractionCount) => {
    return {
        type: "SET_CURRENT_TRIP",
        trip: trip,
        attractionCount: attractionCount
    }
};

export const decrementCurrentCount = (tripId) => {
    return {
        type: "DECREMENT_CURRENT_ATTRACTION_COUNT",
        tripId: tripId
    }
};

export const incrementCurrentCount = (tripId) => {
    return {
        type: "INCREMENT_CURRENT_ATTRACTION_COUNT",
        tripId: tripId
    }
};



