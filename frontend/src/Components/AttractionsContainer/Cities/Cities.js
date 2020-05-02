import React, {useEffect, useState} from "react";
import axios from "axios";
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
                <div key={city.city_id} style={{width:"35%", padding: 4}}>
                    <Button block={true} className={"filter-button text-highlight"} onClick={() => chooseCity(city)}>
                        {city.city_name}
                    </Button>
                </div>
            )
        }
    );

    return (
        <div id={"cities"}>
            <h1 className={"text-header-important"}>Choose a City</h1>
            <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
                {loading ?
                    "Loading..."
                    :
                    citiesList
                }
            </div>
        </div>)
};

export default Cities;

