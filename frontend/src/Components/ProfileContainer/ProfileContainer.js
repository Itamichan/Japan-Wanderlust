import React from "react";
import {withRouter} from "react-router";
import Button from "reactstrap/es/Button";

const ProfileContainer = ({history}) => {
    return (
        <div>my profile
            <Button onClick={() => history.push("/")}>back to attractions</Button>
        </div>
    )
};

export default withRouter(ProfileContainer)