//a reducer takes a previous state, modifies it and return the new state

const initialState = {
    currentTrip: undefined,
    currentAttractionCount: undefined
};

const TripReducer = (state, action) => {

    if (typeof state === "undefined") {
        return initialState
    }
    switch (action.type) {
        case "SET_CURRENT_TRIP":
            return {
                //unwraps the state dict
                ...state,
                currentTrip: action.trip,
                currentAttractionCount: action.attractionCount === undefined? state.currentAttractionCount : action.attractionCount
            };
        case "DECREMENT_CURRENT_ATTRACTION_COUNT":

            if (action.tripId === state.currentTrip.id && state.currentAttractionCount !== 0) {
                return {
                    ...state,
                    currentAttractionCount: state.currentAttractionCount - 1
                }
            }
            return state;
        case "INCREMENT_CURRENT_ATTRACTION_COUNT":

            if (action.tripId === state.currentTrip.id) {
                return {
                    ...state,
                    currentAttractionCount: state.currentAttractionCount + 1
                }
            }
            return state;
        default:
            return state
    }
};

export default TripReducer;