import React, {useState} from 'react';
import {Button, Col, Media, Row} from 'reactstrap';
import "./UserAttraction.scss";
import AttractionCardInfo from "../../../../AttractionsContainer/AttractionCard/AttractionCardInfo/AttractionCardInfo";

const UserAttraction = ({
                            mediaImg, mediaHeading, mediaCity, removeAttraction, disabled, attractionText,
                            attractionPrice,
                            attractionWebAddress
                        }) => {

    const [showAttractionInfo, setShowAttractionInfo] = useState(false);

    return (
        <div>
            <Media className={"media-container"}>
                <Media
                    left
                    className={"media-img"}
                    object
                    src={mediaImg}
                    alt="attraction image"
                >
                </Media>
                <Media body className={"media-body"}>
                    <Row>
                        <Col xs={"6"}>
                            <Media heading className={"media-heading"}>
                                {mediaHeading}
                            </Media>
                            {mediaCity}
                        </Col>
                        <Col xs={"3"}>
                            <Button color="warning" onClick={() => setShowAttractionInfo(true)}>read more
                            </Button>
                        </Col>
                        <Col xs={"3"}>
                            <Button color="danger" disabled={disabled}
                                    onClick={removeAttraction}>Delete
                            </Button>
                        </Col>
                    </Row>
                </Media>
            </Media>
            {showAttractionInfo && <AttractionCardInfo
                close={() => setShowAttractionInfo(false)}
                attractionName={mediaHeading}
                attractionCity={mediaCity}
                attractionText={attractionText}
                attractionPrice={attractionPrice}
                attractionWebAddress={attractionWebAddress}
                attractionImg={mediaImg}
            />}
        </div>
    );
};

export default UserAttraction;