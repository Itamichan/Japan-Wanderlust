import React from 'react';
import {Media} from 'reactstrap';
import "./UserAttraction.scss";

const UserAttraction = ({mediaImg, mediaHeading, mediaText}) => {
    return (
        <div>
            <Media  className={"media-container"}>
                <Media left>
                    <Media
                        className={"media-img"}
                        object
                        src={mediaImg}
                        alt="attraction image"/>
                </Media>
                <Media body>
                    <Media heading>
                        {mediaHeading}
                    </Media>
                    {mediaText}
                </Media>
            </Media>
        </div>
    );
};

export default UserAttraction;