export const setCurrentTrip = (trip, attractionCount) => {
    return {
        type: "SET_CURRENT_TRIP",
        trip: trip,
        attractionCount: attractionCount
    }
};


