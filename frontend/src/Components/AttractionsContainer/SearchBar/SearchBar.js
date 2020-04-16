import React, {Fragment, useState} from 'react';

const SearchBar = ({searchAttraction}) => {

    return (
        <Fragment>
            <input
                type="text"
                placeholder={"Search"}
                onChange={(event) => {
                    searchAttraction(event.target.value)
                }}
            />
        </Fragment>

    )
};

export default SearchBar;