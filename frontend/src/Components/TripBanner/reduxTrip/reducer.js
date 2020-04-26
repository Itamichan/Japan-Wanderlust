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
                currentAttractionCount: action.attractionCount
            };
        default:
            return state
    }
};

export default TripReducer;