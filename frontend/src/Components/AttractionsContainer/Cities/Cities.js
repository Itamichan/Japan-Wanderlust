import React, {useEffect, useState} from "react";
import axios from "axios";

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
                <div>
                    <button onClick={() => chooseCity(city.city_id)}>{city.city_name}</button>
                </div>
            )
        }
    );

    return (<div>
        {loading ? <div>Loading...</div> : citiesList}
        <button onClick={() => chooseCity(null)}>Reset city</button>

    </div>)
};

export default Cities;

