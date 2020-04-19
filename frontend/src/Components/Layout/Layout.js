import React, {Fragment, useEffect, useState} from 'react';
import AttractionsContainer from "../AttractionsContainer/AttractionsContainer";
import Login from "../Login/Login";
import Navigation from "../Navigation/Navigation";
import Notifications from 'react-notify-toast';
import axios from "axios";
import {login, openModal} from "./redux/actions";
import {connect} from "react-redux";


const Layout = ({loginUser}) => {

    const [loading, setLoading] = useState(true);

    const verifyUser = async () => {
        try {
            const {data} = await axios.post('/api/v1/token/verify', {
                'token': localStorage.getItem("token")
            });
            loginUser(localStorage.getItem("token"), data.user_info);
        } catch (e) {

        } finally {
            setLoading(false)
        }


    };

    useEffect(() => {
        verifyUser()
    }, []);

    return (
        <Fragment>
            {
                loading ? (
                    <div>loading</div>
                ) : (
                    <div>
                        <Notifications options={{zIndex: 10000, width: "100%"}}/>
                        <Navigation/>
                        <AttractionsContainer/>

                        <Login/>
                    </div>
                )
            }
        </Fragment>
    )
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (token, userInfo) => dispatch(login(token, userInfo)),
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {}
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(Layout);
export default DefaultApp;
