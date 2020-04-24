import React, {useState} from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';
import "./AttractionCard.scss";
import AttractionCardInfo from "./AttractionCardInfo/AttractionCardInfo";

const AttractionCard = ({cardTitle, cardImg, cardCity, attractionText, attractionPrice, attractionWebAddress}) => {

    const [showAttractionInfo, setShowAttractionInfo] = useState(false);

    return (
        <div>
            <Card className={"card-body"}>
                <CardImg
                    className={"card-img"}
                    top width="100%"
                    src={cardImg}
                    alt="img of the attraction"/>
                <CardBody>
                    <CardTitle>{cardTitle}</CardTitle>
                    <CardText>{cardCity}</CardText>
                    <Button color={"success"} onClick={() => setShowAttractionInfo(true)}>read more</Button>
                </CardBody>
            </Card>
            {showAttractionInfo && <AttractionCardInfo
                close={() => setShowAttractionInfo(false)}
                attractionName={cardTitle}
                attractionCity={cardCity}
                attractionText={attractionText}
                attractionPrice={attractionPrice}
                attractionWebAddress={attractionWebAddress}
                attractionImg={cardImg}
            />}
        </div>
    );
};

export default AttractionCard;