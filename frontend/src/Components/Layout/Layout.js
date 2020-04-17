import React from 'react';
import AttractionsContainer from "../AttractionsContainer/AttractionsContainer";
import Login from "../Login/Login";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "../../reducers";

const store = createStore(rootReducer);

const Layout = (props) => {
    return (
        <Provider store={store}>
            <AttractionsContainer/>
            <Login/>
        </Provider>
    )
};

export default Layout;