import React from 'react';
import {
    Button, FormGroup, Input, InputGroup, InputGroupAddon, Label, Modal, ModalBody, ModalFooter,
    ModalHeader
} from "reactstrap";
import CustomInput from "reactstrap/es/CustomInput";

const AttractionCardInfo = ({
                                close, attractionName, attractionCity, attractionText, attractionPrice,
                                attractionWebAddress, attractionImg
                            }) => {
    return (
        <Modal isOpen={true}>
            <ModalHeader>
                {attractionName}
            </ModalHeader>
            <ModalBody>

            </ModalBody>
            <ModalFooter>
                <Button onClick={close}>close</Button>
            </ModalFooter>
        </Modal>
    )
};

export default AttractionCardInfo;