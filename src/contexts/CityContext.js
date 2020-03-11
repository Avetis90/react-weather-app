import React, {createContext, useEffect, useReducer} from 'react'
import {cityReducer} from "../reducers/cityReducer";
import Loader from "../components/Loader";
import moment from 'moment'

const CityContext = createContext();

const CityContextProvider = (props) => {
    const initialState = {
        currentCity: {
            name: '',
            lat: '',
            lng: '',
            list: []
        },
        activeDate: moment(new Date())/*.add(1,'day')*/.format('MMMM, D'),
        cities: [],
        loading: true,
        modalOpened: false
    }
    const fetchData = async (args) => {
        fetch(`${process.env.REACT_APP_OPEN_WEATHER_URL}${args}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric&libraries=geometry,drawing,places`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                cityDispatch({
                    type: 'SET_CITY',
                    currentCity: {
                        name: `${data.city.name} , ${data.city.country}`,
                        lat: data.city.coord.lat,
                        lng: data.city.coord.lon,
                        list: data.list,
                    }
                });
                cityDispatch({
                    type: 'REMOVE_LOADING',
                    loading: false
                })
            });
    }
    const addCity = async (args) => {
        fetch(`${process.env.REACT_APP_OPEN_WEATHER_URL}${args}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.city.coord ,'data')
                cityDispatch({
                    type: 'ADD_CITY',
                    city:{
                        lat: data.city.coord.lat,
                        lng: data.city.coord.lon,
                        name : `${data.city.name} , ${data.city.country}`
                    }
                });
                cityDispatch({
                    type: 'REMOVE_LOADING',
                    loading: false
                })
            });
    }
    const [cityState, cityDispatch] = useReducer(cityReducer, initialState);
    useEffect(() => {
        const gmapScriptEl = document.createElement(`script`)
        gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`
        document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const params = `lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;
                fetchData(params)
            });
        }
    }, []);
    return (

        <CityContext.Provider value={{cityState, cityDispatch,fetchData,addCity}}>
            {cityState.loading ?
                <Loader/>
                :
                props.children
            }
        </CityContext.Provider>
    )
};
export default CityContextProvider
export {
    CityContext
}