import React, {useContext} from "react";
import {CityContext} from "../contexts/CityContext";
import CityItem from "./CityItem";


const CityList = (props) => {
    const {cityState} = useContext(CityContext)
    const {cities} = cityState
    return (
        <div className="city__list-wrapper">
            {cities.length > 0 ?
                <>
                    <h3>Saved cities</h3>
                    <div className="city-list">

                        {cities.map((city, index) => <CityItem key={index} city={city}/>)}
                    </div>
                </>
                : <h3>No city in your list</h3>

            }
        </div>
    )

}
export default CityList