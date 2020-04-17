import React from 'react';
import AttractionsContainer from "../AttractionsContainer/AttractionsContainer";
import Login from "../Login/Login";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "../../reducers";
import Navbar from "../Navbar/Navbar";

const store = createStore(rootReducer);

const Layout = (props) => {
    return (
        <Provider store={store}>
            <Navbar/>
            <AttractionsContainer/>
            <Login/>
        </Provider>
    )
};

export default Layout;