import React, {useEffect} from 'react';
import {InputGroup, InputGroupAddon, Input} from "reactstrap";
import "./PriceInput.scss";

const PriceInput = ({choosePrice}) => {

    return (
        <div>
            <h2>Indicate your price limit:</h2>
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