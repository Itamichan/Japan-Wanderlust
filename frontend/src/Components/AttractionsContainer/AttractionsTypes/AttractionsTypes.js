import React, {useEffect, useState} from "react";
import axios from "axios";

const AttractionsTypes = ({chooseAttractionType}) => {

    // const [loading, setLoading] = useState(true);
    const [attractionTypes, setAttractionTypes] = useState([]);

    const loadAttractionTypes = async () => {
        const {data} = await axios.get("/api/v1/types");
        setAttractionTypes(data.attraction_types)
    };

    useEffect(() => {
        loadAttractionTypes();
    }, []);

    const attractionsTypes = attractionTypes.map(e => {
            return (
                <div>
                    <button onClick={() => chooseAttractionType(e.type_id)}>{e.type_name}</button>
                </div>
            )
        }
    );

    return( <div>
        {attractionsTypes}
    </div>)
};

export default AttractionsTypes;

