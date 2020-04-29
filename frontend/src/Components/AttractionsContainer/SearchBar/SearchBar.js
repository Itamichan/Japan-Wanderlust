import React, {Fragment} from 'react';
import "./SearchBar.scss";

const SearchBar = ({searchAttraction}) => {

    return (
        <section id={"search-bar"}>
            <input
                type="search"
                placeholder={"Search"}
                onChange={(event) => {
                    searchAttraction(event.target.value)
                }}
            />
        </section>

    )
};

export default SearchBar;