//a reducer takes a previous state, modifies it and return the new state

const initialState = {
    currentTrip: undefined,
    currentAttractionsList: []
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
                currentAttractionsList: action.attractionsList
            };
        case "REMOVE_ATTRACTION_FROM_TRIP":
            if (action.tripId === state.currentTrip.id) {
                let updatedList = state.currentAttractionsList.filter(item => {
                    if (item !== action.attractionId) {
                        return item
                    }
                });
                return {
                    ...state,
                    currentAttractionsList: updatedList
                };
            }
            return state;
        case "ADD_ATTRACTION_TO_TRIP":
            if (action.tripId === state.currentTrip.id) {
                return {
                    ...state,
                    currentAttractionsList: [...state.currentAttractionsList, action.attractionId]
                };
            }
            return state;
        default:
            return state
    }
};

export default TripReducer;