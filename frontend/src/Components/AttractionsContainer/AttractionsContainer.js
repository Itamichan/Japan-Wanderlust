import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import AttractionCard from "./AttractionCard/AttractionCard";
import "./AttractionsContainer.scss";
import AttractionsTypes from "./AttractionsTypes/AttractionsTypes";
import Cities from "./Cities/Cities";
import SearchBar from "./SearchBar/SearchBar";
import FilterTags from "./FilterTags/FilterTags";

const AttractionsContainer = (props) => {


    const [loading, setLoading] = useState(true);
    const [attractions, setAttractions] = useState([]);

    const [chosenAttractionsType, setChosenAttractionsType] = useState(null);
    const [chosenCity, setChosenCity] = useState(null);
    const [attractionName, setAttractionName] = useState(null);
    const [cityName, setCityName] = useState(null);


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

    const showCity = (cityName) => {
        setCityName(cityName)
    };

    return (
        <Fragment>
            <SearchBar
                searchAttraction={(searchWord) => searchAttraction(searchWord)}
            />
            <FilterTags/>
            <section id={"attractions-container"}>

                <div id={"attractions"}>
                    <h1>{cityName}</h1>
                    <div>
                        <div>{loading && "Loading..."}</div>
                        <div id={"attractions-list"}>
                        {attractionsList}
                        </div>
                    </div>
                </div>

                <div id={"attractions-filter"}>
                    <Cities
                        chooseCity={(cityId) => filterCities(cityId)}
                        showCityName={(cityName) => showCity(cityName)}
                    />
                    <AttractionsTypes
                        chooseAttractionType={(attractionTypeId) => filterAttractions(attractionTypeId)}/>
                </div>
            </section>

        </Fragment>

    )
};

export default AttractionsContainer;