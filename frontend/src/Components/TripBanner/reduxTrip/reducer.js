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

            let tripAttractionsList = [];

            if (action.attractionsList) {
                tripAttractionsList = action.attractionsList
            } else if (action.attractionsList === undefined) {
                tripAttractionsList = state.currentAttractionsList
            } else if (action.attractionsList === []) {
                tripAttractionsList = []
            }
            return {
                //unwraps the state dictionary
                ...state,
                currentTrip: action.trip,
                currentAttractionsList: tripAttractionsList
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