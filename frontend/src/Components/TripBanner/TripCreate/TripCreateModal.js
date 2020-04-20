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

const TripCreateModal = ({close}) => {

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
            });

        } catch (e) {


        } finally {
            setSendingPostRequest(false);
        }
    };

    useEffect(() => {
        createTrip()
    }, []);

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