import React, {useEffect, useState} from 'react';
import {
    Button,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import axios from "axios";
import {notify} from "react-notify-toast";
import {connect} from "react-redux";
import {setCurrentTrip} from "../reduxTrip/actions";
import CustomInput from "reactstrap/es/CustomInput";

const TripCreateModal = ({close, setCurrentTrip}) => {

    const [sendingPostRequest, setSendingPostRequest] = useState(false);
    const [tripName, setTripName] = useState("");
    const [maxTripDays, setMaxTripDays] = useState("");
    const [isGuided, setIsGuided] = useState(false);
    const [inGroup, setInGroup] = useState(false);
    const [maxPrice, setMaxPrice] = useState("");

    const createTrip = async () => {
        try {
            setSendingPostRequest(true);
            const {data} = await axios.post('/api/v1/trips', {
                    name: tripName,
                    max_trip_days: maxTripDays,
                    is_guided: isGuided,
                    in_group: inGroup,
                    max_price: maxPrice
                }
            );
            notify.show('yay!!', "success", 1700);
            setCurrentTrip(data)

        } catch (e) {

            switch (e.response.data.error) {
                //todo write proper notify messages
                case "InvalidName":
                    notify.show('InvalidName!', "error", 1700);
                    break;
                case "InvalidDaysNumber":
                    notify.show('InvalidDaysNumber!', "error", 1700);
                    break;
                case "InvalidPriceNumber":
                    notify.show('InvalidPriceNumber!', "error", 1700);
                    break;
                case "InvalidDataEntry":
                    notify.show('InvalidDataEntry!', "error", 1700);
                    break;
                case "ParameterError":
                    notify.show('ParameterError!', "error", 1700);
                    break;
                case "Unauthorized":
                    notify.show('Invalid Token!', "error", 1700);
                    break
            }
        } finally {
            setSendingPostRequest(false);
        }
    };

    //todo ask tobert if i need all fancy extra attributes for input fields
    return (
        <Modal isOpen={true}>
            <ModalHeader>
                Create a trip
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="tripName">Trip name:</Label>
                    <Input disabled={sendingPostRequest} type="text" id={'tripName'} name={'tripName'} value={tripName}
                           onChange={(e) => setTripName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="maxTripDays">max Trip Days:</Label>
                    <InputGroup>
                        <Input disabled={sendingPostRequest} type="number" id={'maxTripDays'} name={'maxTripDays'}
                               value={maxTripDays} min={0} max={100}
                               onChange={(e) => setMaxTripDays(e.target.value)}/>
                        <InputGroupAddon addonType="append">days</InputGroupAddon>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label for="isGuided">Do you want it to be guided?</Label>
                    <CustomInput type="switch" id={"isGuided"} name="isGuided" label={"yes"}
                                 onChange={(e) => setIsGuided(!isGuided)}/>{' '}

                    <Label for="InGroup">Do you want it to be in Group?</Label>
                    <CustomInput type="switch" id={"InGroup"} name="InGroup" label={"yes"}
                                 onChange={(e) => setInGroup(!inGroup)}/>{' '}
                </FormGroup>
                <FormGroup>
                    <Label for="maxPrice">max Price:</Label>
                    <InputGroup>
                        <Input disabled={sendingPostRequest} type="number" id={'maxPrice'} name={'maxPrice'}
                               value={maxPrice} placeholder="Amount" min={0} max={1000000} step="100"
                               onChange={(e) => setMaxPrice(e.target.value)}/>
                        <InputGroupAddon addonType="append">YEN</InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={close}>close</Button>
                <Button color="primary"
                        onClick={() => {
                            createTrip();
                            close()
                        }}>
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
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(TripCreateModal);
export default DefaultApp;