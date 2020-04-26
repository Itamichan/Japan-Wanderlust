import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import AttractionCard from "./AttractionCard/AttractionCard";
import "./AttractionsContainer.scss";
import AttractionsTypes from "./AttractionsTypes/AttractionsTypes";
import Cities from "./Cities/Cities";
import SearchBar from "./SearchBar/SearchBar";
import FilterTag from "./FilterTag/FilterTag";
import PriceInput from "./PriceInput/PriceInput";
import {openModal} from "../Login/redux/actions";
import {connect} from "react-redux";
import TripBanner from "../TripBanner/TripBanner";
import {notify} from "react-notify-toast";
import {decrementCurrentCount, incrementCurrentCount} from "../TripBanner/reduxTrip/actions";

const AttractionsContainer = ({currentTrip, decrementCount, incrementCount}) => {

    //todo put a spinner for loading state- everywhere
    const [loading, setLoading] = useState(true);
    const [executingRequest, setExecutingRequest] = useState(false);
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

    const addAttraction = async (tripId, attractionId) => {
        try {
            setExecutingRequest(true);
            await axios.post(`/api/v1/trips/${tripId}/attractions/${attractionId}`);
            incrementCount(currentTrip.id)
        } catch (e) {
            switch (e.response.data.error) {
                //todo write proper notify messages
                case "NoSuchTrip":
                    notify.show('NoSuchTrip', "error", 1700);
                    break;
                case "AttractionAlreadyExists":
                    notify.show('AttractionAlreadyExists', "error", 1700);
                    break;
                case "InvalidReference":
                    notify.show('InvalidReference', "error", 1700);
                    break;
                default:
                    break;
            }
        } finally {
            setExecutingRequest(false);
        }
    };

    const removeAttraction = async (tripId, attractionId) => {
        try {
            setExecutingRequest(true);
            await axios.delete(`/api/v1/trips/${tripId}/attractions/${attractionId}`);
            decrementCount(currentTrip.id)
        } catch (e) {
            switch (e.response.data.error) {
                //todo write proper notify messages
                case "NoSuchTrip":
                    notify.show('NoSuchTrip', "error", 1700);
                    break;
                case "NoSuchAttraction":
                    notify.show('NoSuchAttraction', "error", 1700);
                    break;
                default:
                    break;
            }
        } finally {
            setExecutingRequest(false);
        }
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
                key={attraction.id}
                cardTitle={attraction.attraction_name}
                cardImg={attraction.picture_url}
                cardCity={attraction.city.name}
                attractionText={attraction.description}
                attractionPrice={attraction.price}
                attractionWebAddress={attraction.web_link}
                removeAttraction={() => removeAttraction(currentTrip.id, attraction.id)}
                addAttraction={() => addAttraction(currentTrip.id, attraction.id)}
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
                    clearTag={() => filterCities(null)}
                    tagName={chosenCity?.city_name}
                />
                <FilterTag
                    clearTag={() => filterAttractions(null)}
                    tagName={chosenAttractionsType?.type_name}
                />
                <FilterTag
                    clearTag={() => filterPrice(null)}
                    tagName={maxPrice ? `limit: ${maxPrice} YEN` : null}
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
            <TripBanner/>
        </Fragment>

    )
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        openLoginModal: () => dispatch(openModal()),
        decrementCount: (tripId) => dispatch(decrementCurrentCount(tripId)),
        incrementCount: (tripId) => dispatch(incrementCurrentCount(tripId))
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.LoginReducer.loggedIn,
        currentTrip: state.TripReducer.currentTrip
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(AttractionsContainer);
export default DefaultApp;
