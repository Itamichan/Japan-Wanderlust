import React, {useEffect, useState} from "react";
import axios from "axios";

const AttractionsTypes = ({chooseAttractionType}) => {

    const [loading, setLoading] = useState(true);
    const [attractionTypes, setAttractionTypes] = useState([]);

    const loadAttractionTypes = async () => {
        const {data} = await axios.get("/api/v1/types");
        setAttractionTypes(data.attraction_types)
    };

    useEffect(() => {
        setLoading(true);
        loadAttractionTypes();
        setLoading(false);
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
        {loading ? <div>Loading...</div> : attractionsTypes}
        <button onClick={() => chooseAttractionType(null)}>Reset attraction type</button>
    </div>)
};

export default AttractionsTypes;

