import {combineReducers} from "redux";

import LoginReducer from "./Components/Layout/redux/reducer";
/*
 * Combines all reducers and their state to be used when creating the store
 */

const combinedReducers = combineReducers({
    LoginReducer
});

//todo search what is a rootreducer - optional
const rootReducer = (state, action) => combinedReducers(state, action);


export default rootReducer;