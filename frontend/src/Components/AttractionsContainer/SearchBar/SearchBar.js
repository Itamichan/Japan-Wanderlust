import React, {Fragment, useState} from 'react';

const SearchBar = ({searchAttraction}) => {

    const [searchWord, setSearchWord] = useState(null);

    return (
        <Fragment>
            <input
                type="text"
                placeholder={"Search"}
                onChange={(event) => {setSearchWord(event.target.value)}}
            />
            <button
                onClick={() => searchAttraction(searchWord)}
            >
                Search
            </button>
        </Fragment>

    )
};

export default SearchBar;