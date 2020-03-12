import React, {useContext, useEffect} from "react";
import Banner from "../components/Banner";
import MapComponent from "../components/GoogleMap";
import {CityContext} from "../contexts/CityContext";
import WeatherInfo from "../components/WeatherInfo";
import {useParams, useHistory} from 'react-router-dom'


const City = props => {

    const {cityState, cityDispatch, fetchData} = useContext(CityContext);
    const {currentCity, cities, status} = cityState;
    let {id} = useParams();
    let history = useHistory();


    useEffect(() => {
        cityDispatch({
            type: 'SET_LOADING'
        })
        const city = cities.filter(city => {
            return city.id === id
        })
        city.length ? fetchData(`lat=${city[0].lat}&lon=${city[0].lng}`)
            :
            history.push('/')
        cityDispatch({
            type: 'REMOVE_LOADING'
        })

    }, [])
    return (
        <>
            <Banner/>
            <div className="info__wrapper">

                <WeatherInfo list={currentCity.list} date={cityState.activeDate} status={status}/>
                {status !== 'week' &&
                <>
                    < MapComponent
                        containerElement={<div style={{width: `50%`}} className="map__container"/>}
                        mapElement={<div style={{height: `300px`}}/>}
                        isMarkerShown={true}
                        coords={{lat: currentCity.lat, lng: currentCity.lng}}
                    />
                </>
                }
            </div>
        </>
    )
}
export default City