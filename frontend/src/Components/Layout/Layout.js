import React, {Fragment, useEffect, useState} from 'react';
import AttractionsContainer from "../AttractionsContainer/AttractionsContainer";
import Login from "../Login/Login";
import Navigation from "../Navigation/Navigation";
import Notifications from 'react-notify-toast';
import axios from "axios";
import {login, logout, openModal} from "../Login/redux/actions";
import {connect} from "react-redux";


const Layout = ({loginUser, logout}) => {

    const [loading, setLoading] = useState(true);

    const verifyUser = async () => {
        const token = localStorage.getItem("token");
        try {
            if (token) {
                const {data} = await axios.post('/api/v1/token/verify', {
                    'token': token
                });
                loginUser(token, data.user_info);
            }
        } catch (e) {

        } finally {
            setLoading(false)
        }

    };


    useEffect(() => {
        axios.interceptors.request.use(
            function (config) {
                // Do something before request is sent
                const token = localStorage.getItem("token");
                if (token !== null && token !== undefined && token !== "" && token !== "null") {
                    config.headers.Authorization = 'JWT ' + token;
                }
                return config;
            },
            function (error) {
                // Do something with request error
                return Promise.reject(error);
            }
        );
        axios.interceptors.response.use(
            function (response) {
                // Do something with response data
                return response;
            },
            function (error) {
                // Logout if 401
                if (error.response) {
                    if (error.response.status === 401) {
                        // Unauthorized, bad token
                        logout();
                        return Promise.reject(error);
                    } else {
                        return Promise.reject(error);
                    }
                } else {
                    return Promise.reject(error);
                }
            }
        );
        verifyUser();
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
        logout: () => dispatch(logout())
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {}
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(Layout);
export default DefaultApp;
