import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {closeModal, login} from "./redux/actions";
import {connect} from "react-redux";
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import "./Login.scss";
import {notify} from 'react-notify-toast';

const Login = ({loginUser, isModalOpen, closeModal}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [registerUser, setRegisterUser] = useState(false);

    const [sendingPostRequest, setSendingPostRequest] = useState(false);

    const register = async () => {
        try {
            setSendingPostRequest(true);
            await axios.post('/api/v1/users', {
                'username': username,
                'password': password,
                'email': email
            });
            notify.show('yay!!', "success", 1700);
            login();
        } catch (e) {
            switch (e.response.data.error) {
                //todo write proper notify messages
                case "InvalidUsername":
                    notify.show('Invalid Username!', "error", 1700);
                    break;
                case "InvalidPassword":
                    notify.show('Invalid Password!', "error", 1700);
                    break;
                case "UnavailableUsername":
                    notify.show('Unavailable Username!', "error", 1700);
                    break;
                case "InvalidEmailFormat":
                    notify.show('InvalidEmail Format!', "error", 1700);
                    break;
                default:
                    break;
            }

        } finally {
            setSendingPostRequest(false);
        }
    };

    const login = async () => {
        try {
            setSendingPostRequest(true);
            const {data} = await axios.post('/api/v1/token', {
                'username': username,
                'password': password
            });
            loginUser(data.token, data.user_info)
        } catch (e) {
            console.log(e)
        } finally {
            setSendingPostRequest(false);
        }

    };

    useEffect(() => {
        setUsername("");
        setPassword("");
        setEmail("");
    }, [registerUser, isModalOpen]);


    return (
        <Modal isOpen={isModalOpen} id={"login-form"}>
            <ModalHeader>
                {registerUser ? "Register" : "Login"}
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input disabled={sendingPostRequest} type="text" id={'username'} name={'username'} value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input disabled={sendingPostRequest} type="password" id={'password'} name={'password'}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </FormGroup>
                {
                    registerUser ? (
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input disabled={sendingPostRequest} type="email" name="email" id="email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </FormGroup>
                    ) : (
                        <FormGroup>
                            <h3>Not registered?</h3>
                            <button disabled={sendingPostRequest} onClick={() => setRegisterUser(true)}>register now!
                            </button>
                        </FormGroup>
                    )
                }
            </ModalBody>
            <ModalFooter>
                {registerUser &&
                <Button disabled={sendingPostRequest} onClick={() => setRegisterUser(false)}>Go back to signIn</Button>}
                <Button disabled={sendingPostRequest} onClick={() => {
                    closeModal();
                    setRegisterUser(false)
                }}>Cancel
                </Button>
                <Button disabled={sendingPostRequest} color="primary"
                        onClick={registerUser ? register : login}>Submit</Button>
            </ModalFooter>
        </Modal>
    )
};


//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (token, userInfo) => dispatch(login(token, userInfo)),
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