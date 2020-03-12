import React, {useContext} from "react";
import {CityContext} from "../contexts/CityContext";

const Banner = (props) => {
    const {cityState, cityDispatch} = useContext(CityContext);
    const {currentCity, activeDate} = cityState;
    const info = currentCity.list[activeDate][0];
    const temperature = Math.round(info.main.temp);
    return (
        <div className="banner">
            <div className="banner__wrapper">
                <div className="banner__info">
                    <div className="banner__temperature">
                        <h2>{temperature} &deg;C</h2>

                    </div>
                    <div className="banner__city">
                        <p>{currentCity.name}</p>
                    </div>
                    {props.isFull &&
                    <div className="banner__additional">
                        <p>{`${info.weather[0].main}, Wind - ${info.wind.speed} meter per second`}</p>
                    </div>
                    }
                </div>
                <div className="add__city" onClick={() => cityDispatch({
                    type: 'OPEN_MODAL'
                })} title='Add City'>
                    <i className="fa fa-plus-circle"></i>
                </div>
            </div>
        </div>
    )

}

export default Banner