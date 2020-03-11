import React, {useContext} from "react";
import Banner from "../components/Banner";
import MapComponent from "../components/GoogleMap";
import {CityContext} from "../contexts/CityContext";
import WeatherInfo from "../components/WeatherInfo";


const City = props => {
    const {cityState } = useContext(CityContext);
    const {currentCity} = cityState;
    return (
        <>
            <Banner />
            <div className="info__wrapper">
                <WeatherInfo list={currentCity.list} date={cityState.activeDate}/>
                <MapComponent
                    containerElement={<div style={{ width: `60%` }} className="map__container" />}
                    mapElement={<div style={{ height: `400px` }} />}
                    isMarkerShown={true}
                    coords={{lat:currentCity.lat,lng: currentCity.lng}}
                />
            </div>
        </>
    )
}
export default City