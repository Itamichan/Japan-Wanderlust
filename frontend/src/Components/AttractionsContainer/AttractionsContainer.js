import React, {useEffect, useState} from 'react';
import axios from "axios";
import AttractionsTypes from "./AttractionsTypes/AttractionsTypes";
import AttractionCard from "./AttractionCard/AttractionCard";

const AttractionsContainer = (props) => {

    const [loading, setLoading] = useState(true);
    const [attractions, setAttractions] = useState([]);
    const [chosenAttractionsType, setChosenAttractionsType] = useState(null);


    const loadAttractions = async () => {
        setLoading(true);
        const {data} = await axios.get("/api/v1/attractions", {
            params: {
                attraction_type_id: chosenAttractionsType
            }
        });
        setAttractions(data.attractions);
        setLoading(false)
    };

    useEffect(() => {
        loadAttractions()
    }, []);

    useEffect(() => {
        loadAttractions()
    }, [chosenAttractionsType]);


    const filterAttractions = (attractionTypeId) => {
        setChosenAttractionsType(attractionTypeId)
    };

    return (<div>
            <AttractionsTypes
                chooseAttractionType={(attractionTypeId) => filterAttractions(attractionTypeId)}/>
            {loading ? <div>Loading...</div> :
                <AttractionCard
                    cardTitle = ""
                    cardImg = ""
                />}
        </div>

    )
};

export default AttractionsContainer;