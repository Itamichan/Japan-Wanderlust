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
                <div className={"text-header"}>{attractionName}</div>
                <div className={"text-highlight"}>{attractionCity}</div>
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
                        <Col className={"text-default card-text"}>
                            {attractionText}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <p className={"text-highlight"}>Entry Fee</p>
                                <p>
                                    {`${attractionPrice} YEN`}
                                </p>
                            </div>
                        </Col>
                        {attractionWebAddress && <Col>
                            <div>
                                <p className={"text-highlight"}>More Information:</p>
                                <a href={attractionWebAddress} rel='noreferrer noopener'
                                   target="_blank">
                                    here
                                </a>
                            </div>
                        </Col>}
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter className={"card-footer"}>
                <Button className={"action-button"} onClick={close}>Ok</Button>
            </ModalFooter>
        </Modal>
    )
};

export default AttractionCardInfo;