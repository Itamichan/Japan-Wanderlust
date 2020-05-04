import {combineReducers} from "redux";

import LoginReducer from "./Components/Login/redux/reducer";
import TripReducer from "./Components/TripBanner/reduxTrip/reducer";
/*
 * Combines all reducers and their state to be used when creating the store
 */

const combinedReducers = combineReducers({
    LoginReducer,
    TripReducer
});

const rootReducer = (state, action) => combinedReducers(state, action);


export default rootReducer;