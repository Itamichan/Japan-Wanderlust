import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Cities.scss";

const Cities = ({chooseCity, showCityName}) => {

    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState([]);

    const loadCities = async () => {
        const {data} = await axios.get("/api/v1/cities");
        setCities(data.cities)
    };

    useEffect(() => {
        setLoading(true);
        loadCities();
        setLoading(false);
    }, []);

    const citiesList = cities.map(city => {
            return (
                <div>
                    <button
                        onClick={() => {
                            chooseCity(city.city_id);
                            showCityName(city.city_name)
                        }}
                    >
                        {city.city_name}
                    </button>
                </div>
            )
        }
    );

    return (
        <div id={"cities"}>
            <h1>
                Choose a city:
            </h1>

            <button id={"reset-button"}
                    onClick={() => {
                        chooseCity(null);
                        showCityName(null)
                    }}
            >
                Show all cities
            </button>

            <div>
                {loading ?
                    "Loading..."
                    :
                    citiesList
                }
            </div>
        </div>)
};

export default Cities;

