import React from 'react';
import {Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import "./AttractionCardInfo.scss";

const AttractionCardInfo = ({
                                close, attractionName, attractionCity, attractionText, attractionPrice,
                                attractionWebAddress, attractionImg
                            }) => {
    return (
        <Modal
            isOpen={true}
            className={"card-info-container"}
        >
            <ModalHeader
                toggle={close}>
                <div>{attractionName}</div>
                <div>{attractionCity}</div>
            </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            <img
                                className={"attraction-img"}
                                src={attractionImg}
                                alt="attraction photo"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {attractionText}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <p><b>Attraction's price: </b></p>
                                <p>
                                    {`${attractionPrice} YEN`}
                                </p>
                            </div>
                        </Col>
                        {attractionWebAddress && <Col>
                            <div>
                                <p><b>Web with more info:</b></p>
                                <a href={attractionWebAddress} rel='noreferrer noopener'
                                   target="_blank">
                                    here
                                </a>
                            </div>
                        </Col>}
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button onClick={close}>ok</Button>
            </ModalFooter>
        </Modal>
    )
};

export default AttractionCardInfo;