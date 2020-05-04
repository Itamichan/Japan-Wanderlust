import React, {useState} from 'react';
import {Col, Media, Row} from 'reactstrap';
import AttractionCardInfo from "../../../../AttractionsContainer/AttractionCard/AttractionCardInfo/AttractionCardInfo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./UserAttraction.scss";

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
                        <Col
                            xs={"10"}
                            onClick={() => setShowAttractionInfo(true)}
                            className={"attraction-info-body text-highlight"}
                        >
                            <Media heading className={"text-header media-heading"}>
                                {mediaHeading}
                            </Media>
                            {mediaCity}
                        </Col>
                        <Col xs={"2"}>
                            <div className={"icon-delete"}
                                 onClick={removeAttraction}>
                                <FontAwesomeIcon size={"2x"} icon={['far', 'trash-alt']}/>
                            </div>
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