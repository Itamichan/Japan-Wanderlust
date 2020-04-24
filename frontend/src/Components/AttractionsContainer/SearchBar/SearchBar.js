import React, {Fragment} from 'react';

const SearchBar = ({searchAttraction}) => {

    return (
        <Fragment>
            <input
                type="search"
                placeholder={"Search"}
                onChange={(event) => {
                    searchAttraction(event.target.value)
                }}
            />
        </Fragment>

    )
};

export default SearchBar;