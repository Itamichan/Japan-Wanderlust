import React from 'react';

const FilterTag = ({clearTag, tagName}) => {

    if (!tagName) {
        return null
    }

    return (
        <div>
            <button onClick={() => {
                clearTag(null)
            }}>x</button>
            <span>{tagName}</span>
        </div>
    )
};

export default FilterTag;