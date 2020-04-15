import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import AttractionCard from "./AttractionCard/AttractionCard";
import "./AttractionsContainer.scss";
import AttractionsTypes from "./AttractionsTypes/AttractionsTypes";
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

    const attractionsList = attractions.map(attraction => {
        return (
            <AttractionCard
                cardTitle={attraction.attraction_name}
                cardImg="/resources/test.jpg"
            />
        )

    });

    const filterAttractions = (attractionTypeId) => {
        setChosenAttractionsType(attractionTypeId)
    };

    const filterCities = (cityId) => {
        setChosenCity(cityId);
    };

    return (
        <Fragment>
            <div id={"attractions-container"}>
                <section>
                    {loading ?
                        <div>Loading...</div>
                        :
                        <div id={"attractions-list"}>
                            {attractionsList}
                        </div>
                    }

                </section>
                <section id={"attractions-filter"}>
                    <AttractionsTypes
                        chooseAttractionType={(attractionTypeId) => filterAttractions(attractionTypeId)}/>
                    <Cities
                        chooseCity={(cityId) => filterCities(cityId)}
                    />
                </section>
            </div>

        </Fragment>

    )
};

export default AttractionsContainer;