import React, {useEffect, useState} from 'react';
import axios from "axios";
import AttractionsTypes from "./AttractionsTypes/AttractionsTypes";
import AttractionCard from "./AttractionCard/AttractionCard";
import "./AttractionsContainer.scss";
import Cities from "./Cities/Cities";

const AttractionsContainer = (props) => {

    const [loading, setLoading] = useState(true);
    const [attractions, setAttractions] = useState([]);
    const [chosenAttractionsType, setChosenAttractionsType] = useState(null);
    const [chosenCity, setChosenCity] = useState(null);


    const loadAttractions = async () => {
        setLoading(true);
        const {data} = await axios.get("/api/v1/attractions", {
            params: {
                attraction_type_id: chosenAttractionsType,
                city_id: chosenCity
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
    }, [chosenAttractionsType, chosenCity]);


    const filterAttractions = (attractionTypeId) => {
        setChosenAttractionsType(attractionTypeId)
    };

    const filterCities = (cityId) => {
        setChosenCity(cityId)
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
            <Cities
                chooseCity={(cityId) => filterCities(cityId)}
            />

            {loading ?
                <div>Loading...</div>
                :
                <div id={"attractions-container"}>
                    {attractionsList}
                </div>
            }

        </div>

    )
};

export default AttractionsContainer;