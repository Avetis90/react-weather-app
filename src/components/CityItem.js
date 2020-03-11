import React, {useContext} from "react";
import {CityContext} from "../contexts/CityContext";
import {Link} from "react-router-dom";

const CityItem = (props) => {

    const {fetchData, cityDispatch} = useContext(CityContext)
    const params = `lat=${props.city.lat}&lon=${props.city.lng}`;
    const handleSetCity = (args) => {
        cityDispatch({
            type: 'SET_LOADING'
        })
        fetchData(args)

    }
    return (
        <Link to={`/${props.city.id}`} className="city__link">
            <div className="city__item" onClick={() => handleSetCity(params)}>
                <p className="city__name">
                    {`${props.city.name} `}
                </p>
            </div>
        </Link>
    )
}
export default CityItem