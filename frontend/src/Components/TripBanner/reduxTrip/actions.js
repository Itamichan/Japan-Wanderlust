export const setCurrentTrip = (trip, attractionsList) => {
    return {
        type: "SET_CURRENT_TRIP",
        trip: trip,
        attractionsList: attractionsList
    }
};

export const removeAttractionFromTrip = (tripId, attractionId) => {
    return {
        type: "REMOVE_ATTRACTION_FROM_TRIP",
        attractionId: attractionId,
        tripId: tripId
    }
};

export const addAttractionToTrip = (tripId, attractionId) => {
    return {
        type: "ADD_ATTRACTION_TO_TRIP",
        attractionId: attractionId,
        tripId: tripId
    }
};


