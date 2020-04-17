import React from 'react';
import {Modal, Button, Form, FormGroup, Label, Input, FormText, ModalFooter, ModalHeader, ModalBody} from "reactstrap";
import {closeModal, login, openModal} from "../Layout/redux/actions";
import {connect} from "react-redux";
import "./Registration.scss";


const Registration = ({modal}) => {


    return (
        <Modal isOpen={modal}>
            <ModalHeader>title</ModalHeader>
            <ModalBody>
                <Form id={"reg-form"}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="with a placeholder"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder"/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button>Submit</Button>
            </ModalFooter>
        </Modal>
    )
};

export default Registration