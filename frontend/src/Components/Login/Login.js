import React, {useState} from 'react';
import axios from 'axios';
import {closeModal, login, openModal} from "../Layout/redux/actions";
import {connect, Provider} from "react-redux";
import {Modal, ModalHeader, Button, ModalFooter, ModalBody, FormGroup, Input, Label} from "reactstrap";
import "./Login.scss";
import Registration from "../Registration/Registration";

const Login = ({loginUser, isUserLoggedIn, isModalOpen, closeModal, openRegistrationModal}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    console.log(username);
    console.log(password);


    const login = async () => {
        const response = await axios.post('/api/v1/token', {
            'username': username,
            'password': password
        });
        const data = response.data;
        loginUser(data.token)
    };

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <Modal isOpen={isModalOpen} id={"login-form"}>
            <ModalHeader>
                Modal title
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" id={'username'} name={'username'} value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" id={'password'} name={'password'} value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <h3>Not registered?</h3>
                    <Button onClick={toggle}>Join now!</Button>
                    <Registration modal={modal}/>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => login()}>Submit</Button>{' '}
                <Button color="secondary" onClick={closeModal}>Cancel</Button>
            </ModalFooter>
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