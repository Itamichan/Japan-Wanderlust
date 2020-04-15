import React, {useEffect, useState} from 'react';
import axios from "axios";
import AttractionsTypes from "./AttractionsTypes/AttractionsTypes";
import AttractionCard from "./AttractionCard/AttractionCard";
import "./AttractionsContainer.scss";

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

    const attractionsList = attractions.map(attraction => {
        return (
            <AttractionCard
                cardTitle={attraction.attraction_name}
                cardImg="/resources/test.jpg"
            />
        )

    });

    return (<div>
            <AttractionsTypes
                chooseAttractionType={(attractionTypeId) => filterAttractions(attractionTypeId)}/>

            {loading ? <div>Loading...</div> : JSON.stringify(attractions)}
            <div id={"attractions-container"}>
                {attractionsList}
            </div>

        </div>

    )
};

export default AttractionsContainer;