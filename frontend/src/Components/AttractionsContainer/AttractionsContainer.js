import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import AttractionCard from "./AttractionCard/AttractionCard";
import "./AttractionsContainer.scss";
import AttractionsTypes from "./AttractionsTypes/AttractionsTypes";
import Cities from "./Cities/Cities";
import SearchBar from "./SearchBar/SearchBar";
import FilterTag from "./FilterTag/FilterTag";
import PriceInput from "./PriceInput/PriceInput";
import {login, openModal} from "../Login/redux/actions";
import {connect} from "react-redux";

const AttractionsContainer = ({openLoginModal}) => {


    const [loading, setLoading] = useState(true);
    const [attractions, setAttractions] = useState([]);

    const [chosenAttractionsType, setChosenAttractionsType] = useState(null);
    const [chosenCity, setChosenCity] = useState(null);
    const [attractionName, setAttractionName] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);


    const loadAttractions = async () => {
        setLoading(true);
        const {data} = await axios.get("/api/v1/attractions", {
            params: {
                attraction_type_id: chosenAttractionsType?.type_id,
                city_id: chosenCity?.city_id,
                text: attractionName,
                max_price: maxPrice
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
    }, [chosenAttractionsType, chosenCity, attractionName, maxPrice]);

    const attractionsList = attractions.map(attraction => {
        return (
            <AttractionCard
                openLoginModal={openLoginModal}
                cardTitle={attraction.attraction_name}
                cardImg="/resources/test.jpg"
            />
        )

    });

    const filterAttractions = (attractionType) => {
        setChosenAttractionsType(attractionType)
    };

    const filterCities = (city) => {
        setChosenCity(city);
    };

    const filterPrice = (price) => {
        setMaxPrice(price);
    };

    const searchAttraction = (searchWord) => {
        setAttractionName(searchWord)
    };


    return (
        <Fragment>
            <SearchBar
                searchAttraction={(searchWord) => searchAttraction(searchWord)}
            />
            <div id={"filter-tags"}>
                <FilterTag
                    clearTag={() => searchAttraction(null)}
                    tagName={attractionName}
                />
                <FilterTag
                    clearTag={() => filterCities(null)}
                    tagName={chosenCity?.city_name}
                />
                <FilterTag
                    clearTag={() => filterAttractions(null)}
                    tagName={chosenAttractionsType?.type_name}
                />
                <FilterTag
                    clearTag={() => filterPrice(null)}
                    tagName={maxPrice? `limit: ${maxPrice} YEN` : null}
                />
            </div>

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
                        chooseAttractionType={(attractionType) => filterAttractions(attractionType)}/>
                    <PriceInput
                    choosePrice={(price) => filterPrice(price)}
                    />
                </div>
            </section>

        </Fragment>

    )
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        openLoginModal: () => dispatch(openModal())
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.LoginReducer.loggedIn,
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(AttractionsContainer);
export default DefaultApp;
