import React from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';


import "./AttractionCard.scss";

const AttractionCard = ({cardTitle, cardImg}) => {
    return (
        <div>
            <Card  className={"card-body"}>
                <CardImg
                    top width="100%"
                    src={cardImg}
                    alt="img of the attraction"/>
                <CardBody>
                    <CardTitle>{cardTitle}</CardTitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's
                        content.</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default AttractionCard;