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


    const loadAttractions = async () => {
        setLoading(true);
        const {data} = await axios.get("/api/v1/attractions", {
            params: {
                attraction_type_id: chosenAttractionsType,
                city_id: chosenCity?.city_id,
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

    const filterCities = (city) => {
        setChosenCity(city);
    };

    const searchAttraction = (searchWord) => {
        setAttractionName(searchWord)
    };


    return (
        <Fragment>
            <SearchBar
                searchAttraction={(searchWord) => searchAttraction(searchWord)}
            />
            <FilterTags
                clearTag={() => filterCities(null)}
                tagName={chosenCity?.city_name}
            />
            <section id={"attractions-container"}>

                <div id={"attractions"}>
                    <div>
                        <div>{loading && "Loading..."}</div>
                        <div id={"attractions-list"}>
                        {attractionsList}
                        </div>
                    </div>
                </div>

                <div id={"attractions-filter"}>
                    <Cities
                        chooseCity={(city) => filterCities(city)}
                    />
                    <AttractionsTypes
                        chooseAttractionType={(attractionTypeId) => filterAttractions(attractionTypeId)}/>
                </div>
            </section>

        </Fragment>

    )
};

export default AttractionsContainer;