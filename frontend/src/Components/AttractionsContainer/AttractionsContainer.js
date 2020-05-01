import React, {useEffect, useState} from 'react';
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
import Button from "reactstrap/es/Button";
import {isBrowser, isMobile, isTablet} from "react-device-detect";
import {addAttractionToTrip, removeAttractionFromTrip} from "../TripBanner/reduxTrip/actions";
import AttractionsPagination from "./AttractionsPagination/AttractionsPagination";

const AttractionsContainer = ({currentTrip, removeAttractionFromTrip, addAttractionToTrip, currentAttractionsList}) => {

    //todo put a spinner for loading state- everywhere
    const [loading, setLoading] = useState(true);
    const [executingRequest, setExecutingRequest] = useState(false);
    const [attractions, setAttractions] = useState([]);
    const [chosenAttractionsType, setChosenAttractionsType] = useState(null);
    const [chosenCity, setChosenCity] = useState(null);
    const [attractionName, setAttractionName] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [page, setPage] = useState(1);
    const [showFiltersMenu, setShowFiltersMenu] = useState(false);

    const ATTRACTIONS_PER_PAGE = 4;

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
            addAttractionToTrip(tripId, attractionId)
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
            removeAttractionFromTrip(tripId, attractionId)

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

    //load Attractions one time after the first rendering
    useEffect(() => {
        loadAttractions()
    }, []);

    useEffect(() => {
        loadAttractions()
    }, [chosenAttractionsType, chosenCity, attractionName, maxPrice]);

    let attractionsList = attractions.map(attraction => {
        return (
            <AttractionCard
                key={attraction.id}
                cardId={attraction.id}
                cardTitle={attraction.attraction_name}
                cardImg={attraction.picture_url}
                cardCity={attraction.city.name}
                attractionText={attraction.description}
                attractionPrice={attraction.price}
                attractionWebAddress={attraction.web_link}
                isAttractionSelected={currentAttractionsList.includes(attraction.id)}
                removeAttraction={() => {
                    if (currentTrip) {
                        removeAttraction(currentTrip.id, attraction.id)
                    }
                }}
                addAttraction={() => {
                    if (currentTrip) {
                        addAttraction(currentTrip.id, attraction.id)
                    }
                }}
            />
        )
    });

    //returns attractionsList with attractions for each corresponding page number.
    attractionsList = attractionsList.slice(ATTRACTIONS_PER_PAGE * (page - 1), ATTRACTIONS_PER_PAGE * page);

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
        <div id={"attractions-page"}>
            <section id={"attractions-header"}>
                <SearchBar
                    searchAttraction={(searchWord) => searchAttraction(searchWord)}
                />
                {isMobile || isTablet ? (
                    <Button
                        id={"filter-button"}
                        onClick={() => setShowFiltersMenu(!showFiltersMenu)}
                    >Filter</Button>
                ) : null}

            </section>
            <section id={"filter-tags"}>
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
            </section>

            <section id={"attractions-container"}>
                {loading ? (
                    "Loading..."
                ) : (
                    <div id={"attractions"}>
                        <div id={isBrowser ? "attractions-list-browser" : "attractions-list-mobile"}>
                            {attractionsList}
                        </div>
                        <div id={"pagination"}>
                            <AttractionsPagination
                                currentPage={page}
                                setCurrentPage={setPage}
                                ItemsPerPage={ATTRACTIONS_PER_PAGE}
                                totalItemsNr={attractions.length}
                            />
                        </div>
                    </div>
                )}
                {isBrowser &&
                <div id={"attractions-filters"}>
                    <Cities
                        chooseCity={(city) => filterCities(city)}
                    />
                    <AttractionsTypes
                        chooseAttractionType={(attractionType) => filterAttractions(attractionType)}/>
                    <PriceInput
                        choosePrice={(price) => filterPrice(price)}
                    />
                </div>}

                {isMobile || isTablet ? (
                    <div id={showFiltersMenu ? "filters-menu-show" : "filters-menu"}>
                        <Cities
                            chooseCity={(city) => filterCities(city)}
                        />
                        <AttractionsTypes
                            chooseAttractionType={(attractionType) => filterAttractions(attractionType)}/>
                        <PriceInput
                            choosePrice={(price) => filterPrice(price)}
                        />
                    </div>
                ) : null
                }
            </section>
            <TripBanner/>
        </div>

    )
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        openLoginModal: () => dispatch(openModal()),
        addAttractionToTrip: (tripId, attractionId) => dispatch(addAttractionToTrip(tripId, attractionId)),
        removeAttractionFromTrip: (tripId, attractionId) => dispatch(removeAttractionFromTrip(tripId, attractionId)),

    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.LoginReducer.loggedIn,
        currentTrip: state.TripReducer.currentTrip,
        currentAttractionsList: state.TripReducer.currentAttractionsList
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(AttractionsContainer);
export default DefaultApp;
