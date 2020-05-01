import React from 'react';
import {Input, InputGroup, InputGroupAddon} from "reactstrap";
import "./PriceInput.scss";

const PriceInput = ({choosePrice}) => {

    return (
        <div>
            <h1 className={"text-header-important"}>Set a price limit:</h1>
            <InputGroup id={"price-input"}>
                <Input placeholder="Amount" min={0} max={1000000} type="number" step="100"
                       onChange={(event) => {
                           choosePrice(event.target.value);
                       }}
                />
                <InputGroupAddon addonType="append">YEN</InputGroupAddon>
            </InputGroup>
        </div>
    )
};

export default PriceInput;