import React, {useEffect, useState} from 'react';
import axios from "axios";
import AttractionCard from "./AttractionCard/AttractionCard";
import AttractionsTypes from "./AttractionsTypes/AttractionsTypes";
import Cities from "./Cities/Cities";
import FilterTag from "./FilterTag/FilterTag";
import PriceInput from "./PriceInput/PriceInput";
import {openModal} from "../Login/redux/actions";
import {connect} from "react-redux";
import TripBanner from "../TripBanner/TripBanner";
import {notify} from "react-notify-toast";
import {isBrowser, isMobile, isTablet} from "react-device-detect";
import {addAttractionToTrip, removeAttractionFromTrip} from "../TripBanner/reduxTrip/actions";
import AttractionsPagination from "./AttractionsPagination/AttractionsPagination";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Col, Container, Row, Input, Button, InputGroup, InputGroupAddon} from "reactstrap";
import "./AttractionsContainer.scss";

const AttractionsContainer = ({currentTrip, removeAttractionFromTrip, addAttractionToTrip, currentAttractionsList}) => {

    const [loading, setLoading] = useState(true);
    const [attractions, setAttractions] = useState([]);
    const [chosenAttractionsType, setChosenAttractionsType] = useState(null);
    const [chosenCity, setChosenCity] = useState(null);
    const [attractionName, setAttractionName] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [page, setPage] = useState(1);
    const [showFiltersMenu, setShowFiltersMenu] = useState(false);

    // puts the limit of how many attraction appear per page
    const ATTRACTIONS_PER_PAGE = 8;

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
            await axios.post(`/api/v1/trips/${tripId}/attractions/${attractionId}`);
            addAttractionToTrip(tripId, attractionId)
        } catch (e) {
            switch (e.response.data.error) {
                case "NoSuchTrip":
                    notify.show('Such Trip doesn\'t exist', "error", 1700);
                    break;
                case "AttractionAlreadyExists":
                    notify.show('You already have this Attraction', "error", 1700);
                    break;
                default:
                    break;
            }
        } finally {
        }
    };

    const removeAttraction = async (tripId, attractionId) => {
        try {
            await axios.delete(`/api/v1/trips/${tripId}/attractions/${attractionId}`);
            removeAttractionFromTrip(tripId, attractionId)

        } catch (e) {
            switch (e.response.data.error) {
                case "NoSuchTrip":
                    notify.show('Such Trip doesn\'t exist', "error", 1700);
                    break;
                case "NoSuchAttraction":
                    notify.show('Such Attraction doesn\'t exist', "error", 1700);
                    break;
                default:
                    break;
            }
        } finally {
        }
    };

    //load Attractions one time after the first rendering
    useEffect(() => {
        loadAttractions()
    }, []);

    //load Attractions every time when the dependencies are changing.
    useEffect(() => {
        loadAttractions()
    }, [chosenAttractionsType, chosenCity, attractionName, maxPrice]);

    let attractionsList = attractions.map(attraction => {
        return (
            <Col xs={"6"} md={"4"} xl={"3"} className={"attraction-card"}>
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
            </Col>
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

    const searchInput = <Input
        type="search"
        placeholder={"Search"}
        onChange={(event) => {
            searchAttraction(event.target.value)
        }}
    />;

    return (
        <div id={"attractions-page"}>
            <section id={"attractions-header"}>
                {isMobile || isTablet ? (
                    <div>
                        <InputGroup>
                            {searchInput}
                            <InputGroupAddon addonType="append">
                                <Button onClick={() => setShowFiltersMenu(true)}>Filter</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                ) : (
                    <div id={"search-desktop"}>
                        {searchInput}
                    </div>
                )}
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


            <Container id={"attractions-container"} fluid={true}>
                <Row>
                    <Col>
                        <Row>
                            {loading ? (
                                <Col>"Loading..."</Col>
                            ) : (
                                <Col>
                                    <Row>
                                        {attractionsList}
                                    </Row>
                                    <Row>
                                        <Col>
                                            <AttractionsPagination
                                                currentPage={page}
                                                setCurrentPage={setPage}
                                                ItemsPerPage={ATTRACTIONS_PER_PAGE}
                                                totalItemsNr={attractions.length}
                                            />
                                        </Col>
                                    </Row>
                                    {/*provides empty space that will be covered by the TripBanner*/}
                                    <div id={"buffer-div"}/>
                                </Col>
                            )}
                        </Row>
                    </Col>

                    {isBrowser &&
                    <Col xs={"2"} md={"3"} xl={"2"} id={"attractions-filters"}>
                        <Cities
                            chooseCity={(city) => filterCities(city)}
                        />
                        <AttractionsTypes
                            chooseAttractionType={(attractionType) => filterAttractions(attractionType)}/>
                        <PriceInput
                            choosePrice={(price) => filterPrice(price)}
                        />
                    </Col>}
                </Row>
                {isMobile || isTablet ? (
                    <div id={showFiltersMenu ? "filters-menu-show" : "filters-menu"}>
                        <div>
                            <div id={"icon-container"}>
                                <div id={"icon-div"} onClick={() => setShowFiltersMenu(false)}>
                                    <FontAwesomeIcon
                                        size={"lg"}
                                        icon="times"
                                    />
                                </div>
                            </div>
                            <Cities
                                chooseCity={(city) => filterCities(city)}
                            />
                            <AttractionsTypes
                                chooseAttractionType={(attractionType) => filterAttractions(attractionType)}/>
                            <PriceInput
                                choosePrice={(price) => filterPrice(price)}
                            />
                        </div>
                    </div>
                ) : null
                }
            </Container>
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
