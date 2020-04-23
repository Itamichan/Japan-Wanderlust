import React from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';


import "./AttractionCard.scss";

const AttractionCard = ({cardTitle, cardImg, openLoginModal, cardText}) => {
    return (
        <div>
            <Card  className={"card-body"}>
                <CardImg
                    className={"card-img"}
                    top width="100%"
                    src={cardImg}
                    alt="img of the attraction"/>
                <CardBody>
                    <CardTitle>{cardTitle}</CardTitle>
                    <CardText>{cardText}</CardText>
                    <Button color={"success"} onClick={openLoginModal}>read more</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default AttractionCard;