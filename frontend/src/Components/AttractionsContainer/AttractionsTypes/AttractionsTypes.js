import React, {useEffect, useState} from "react";
import axios from "axios";
import "./AttractionsTypes.scss";

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

    const attractionsTypes = attractionTypes.map(attractionType => {
            return (
                <div key={attractionType.type_id}>
                    <button
                        onClick={() => chooseAttractionType(attractionType)}
                    >
                        {attractionType.type_name}
                    </button>
                </div>
            )
        }
    );

    return (
        <div id={"interests"}>
            <h1>Sort by interest:</h1>
            <div>
                {loading ? <div>Loading...</div> : attractionsTypes}
            </div>
        </div>)
};

export default AttractionsTypes;

