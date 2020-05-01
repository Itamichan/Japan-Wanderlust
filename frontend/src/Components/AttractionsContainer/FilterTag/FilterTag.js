import React from 'react';
import "./FilterTag.scss";
import Button from "reactstrap/es/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FilterTag = ({clearTag, tagName}) => {

    if (!tagName) {
        return null
    }

    return (
        <div>
            <Button
                color="danger"
                className={"filter-tag-button text-highlight"}
                onClick={() => {
                    clearTag(null)
                }}

            >
                <span>{tagName} </span>
                <FontAwesomeIcon icon={['far', 'times-circle']} />
            </Button>

        </div>
    )
};

export default FilterTag;