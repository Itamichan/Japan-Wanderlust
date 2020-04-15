import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import AttractionCard from "./AttractionCard/AttractionCard";
import "./AttractionsContainer.scss";
import AttractionsTypes from "./AttractionsTypes/AttractionsTypes";
import Cities from "./Cities/Cities";
import SearchBar from "./SearchBar/SearchBar";

const AttractionsContainer = (props) => {


    const [loading, setLoading] = useState(true);
    const [attractions, setAttractions] = useState([]);

    const [chosenAttractionsType, setChosenAttractionsType] = useState(null);
    const [chosenCity, setChosenCity] = useState(null);
    const [attractionName, setAttractionName] = useState(null);


    const loadAttractions = async () => {
        setLoading(true);
        const {data} = await axios.get("/api/v1/attractions", {
            params: {
                attraction_type_id: chosenAttractionsType,
                city_id: chosenCity,
                text: attractionName
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
    }, [chosenAttractionsType, chosenCity, attractionName]);

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

    const searchAttraction = (searchWord) => {
        setAttractionName(searchWord)
    };

    return (
        <Fragment>
            <SearchBar
                searchAttraction={(searchWord) => searchAttraction(searchWord)}
            />
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
                    <Cities
                        chooseCity={(cityId) => filterCities(cityId)}
                    />
                    <AttractionsTypes
                        chooseAttractionType={(attractionTypeId) => filterAttractions(attractionTypeId)}/>
                </section>
            </div>

        </Fragment>

    )
};

export default AttractionsContainer;