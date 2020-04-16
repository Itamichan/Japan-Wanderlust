import React from 'react';

const FilterTags = ({clearTag, tagName}) => {

    if (!tagName) {
        return null
    }

    return (
        <div>
            <button onClick={() => {
                clearTag(null)}}>{tagName}</button>
        </div>
    )
};

export default FilterTags;