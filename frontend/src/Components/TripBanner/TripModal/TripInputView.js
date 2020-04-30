import React from 'react';
import {
    Button, FormGroup, Input, InputGroup, InputGroupAddon, Label, Modal,
    ModalBody, ModalFooter, ModalHeader, FormText, CustomInput
} from "reactstrap";
import {connect} from "react-redux";
import {setCurrentTrip} from "../reduxTrip/actions";
import "./TripInputView.scss";

const TripInputView = ({
                           close, submit, disabled, tripTypeName, tripName, maxTripDays, isGuided, inGroup, maxPrice,
                           setTripName, setMaxTripDays, setIsGuided, setInGroup, setMaxPrice
                       }) => {

    return (
        <Modal
            id={"trip-input-modal"}
            isOpen={true}
            toggle={close}>
            <ModalHeader
                id={"trip-input-header"}
                toggle={close}>
                <h1 className={"text-header"}>{tripTypeName}</h1>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="tripName" className={"text-highlight"}>Trip Name:</Label>
                    <Input
                        id={'tripName'}
                        disabled={disabled}
                        type="text"
                        name={'tripName'}
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}/>
                </FormGroup>
                <FormText>Maximum length 25 characters.</FormText>
                <FormGroup>
                    <Label className={"text-highlight"} for="maxTripDays">For how long do you want to travel?</Label>
                    <InputGroup>
                        <Input disabled={disabled} type="number" id={'maxTripDays'} name={'maxTripDays'}
                               value={maxTripDays} min={0} max={100}
                               onChange={(e) => setMaxTripDays(e.target.value)}/>
                        <InputGroupAddon addonType="append">days</InputGroupAddon>
                    </InputGroup>
                    <FormText>Maximum trip duration is 30 days.</FormText>
                </FormGroup>
                <FormGroup id={"trip-input-switchers"}>
                    <Label className={"text-highlight"} for="isGuided">Do you want to have a guide?</Label>
                    {isGuided ? (
                        <CustomInput type="switch" id={"isGuided"} name="isGuided" label={"yes"} defaultChecked
                                     onChange={(e) => setIsGuided(!isGuided)}/>
                    ) : (
                        <CustomInput type="switch" id={"isGuided"} name="isGuided" label={"yes"}
                                     onChange={(e) => setIsGuided(!isGuided)}/>
                    )}
                    <Label className={"text-highlight"} for="InGroup">Do you want to travel in group?</Label>

                    {inGroup ? (
                        <CustomInput type="switch" id={"InGroup"} name="InGroup" label={"yes"} defaultChecked
                                     onChange={(e) => setInGroup(!inGroup)}/>
                    ) : (
                        <CustomInput type="switch" id={"InGroup"} name="InGroup" label={"yes"}
                                     onChange={(e) => setInGroup(!inGroup)}/>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label className={"text-highlight"} for="maxPrice">Your budget ceiling:</Label>
                    <InputGroup>
                        <Input disabled={disabled} type="number" id={'maxPrice'} name={'maxPrice'}
                               value={maxPrice} placeholder="Amount" min={0} max={1000000} step="100"
                               onChange={(e) => setMaxPrice(e.target.value)}/>
                        <InputGroupAddon addonType="append">YEN</InputGroupAddon>
                    </InputGroup>
                    <FormText>Maximum budget ceiling is 1 mln YEN.</FormText>
                </FormGroup>
            </ModalBody>
            <ModalFooter id={"trip-input-footer"}>
                <Button
                    color="primary"
                    onClick={submit}
                    disabled={disabled}
                >
                    submit
                </Button>
            </ModalFooter>
        </Modal>

    )
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTrip: (trip) => dispatch(setCurrentTrip(trip))
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {}
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripInputView);
export default DefaultApp;