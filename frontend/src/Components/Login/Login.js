import React, {useState} from 'react';
import axios from 'axios';
import {closeModal, login} from "./redux/actions";
import {connect} from "react-redux";
import Modal from "reactstrap/es/Modal";



const Login = ({loginUser, isUserLoggedIn, isModalOpen, closeModal}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    console.log(username);
    console.log(password);


    const login = async () => {
        const response = await axios.post('https://authorization-api-cristina.herokuapp.com/api/v1/login', {
            'username': username,
            'password': password
        });
        const data = response.data;
        loginUser(data.token)
    };



    return (
        <Modal isOpen={isModalOpen}>
            <button onClick={closeModal}>close</button>
            <label htmlFor="username">Username </label>
            <input type="text" id={'username'} name={'username'} value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="password"> Password </label>
            <input type="password" id={'password'} name={'password'} value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={() => login()}>Submit</button>
            <div>{isUserLoggedIn ? "is logged in" : "is not logged in"}</div>
        </Modal>
    )
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (token) => dispatch(login(token)),
        closeModal: () => dispatch(closeModal())
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.LoginReducer.loggedIn,
        isModalOpen: state.LoginReducer.modalOpen
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(Login);
export default DefaultApp;