import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "reactstrap/es/Button";
import Spinner from "reactstrap/es/Spinner";

const AttractionsTypes = ({chooseAttractionType}) => {

    const [loading, setLoading] = useState(true);
    const [attractionTypes, setAttractionTypes] = useState([]);

    const loadAttractionTypes = async () => {
        const {data} = await axios.get("/api/v1/types");
        setAttractionTypes(data.attraction_types)
    };

    useEffect(() => {
        setLoading(true);
        loadAttractionTypes();
        setLoading(false);
    }, []);

    const attractionsTypes = attractionTypes.map(attractionType => {
            return (
                <div key={attractionType.type_id} style={{padding: 4}}>
                    <Button
                        className={"action-button"}
                        onClick={() => chooseAttractionType(attractionType)}
                    >
                        {attractionType.type_name}
                    </Button>
                </div>
            )
        }
    );

    return (
        <div>
            <h1 className={"text-header-important"}>Choose a Category</h1>
            <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
                {loading ?  <Spinner color="danger"/>: attractionsTypes}
            </div>
        </div>)
};

export default AttractionsTypes;

