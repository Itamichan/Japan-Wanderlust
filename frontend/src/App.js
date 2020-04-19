import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Components/Layout/Layout";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Layout/>
            </Provider>
        </div>
    );
}

export default App;
