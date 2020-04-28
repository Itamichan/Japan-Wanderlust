import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Cities.scss";
import Button from "reactstrap/es/Button";

const Cities = ({chooseCity}) => {

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
                <div key={city.city_id}>
                    <Button className={"filter-button"} onClick={() => chooseCity(city)}>
                        {city.city_name}
                    </Button>
                </div>
            )
        }
    );

    return (
        <div id={"cities"}>
            <h1>
                Choose a city:
            </h1>

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

