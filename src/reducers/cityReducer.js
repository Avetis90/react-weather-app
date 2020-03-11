import moment from 'moment'
import _ from 'underscore'
import { v1 as uuidv1 } from 'uuid';

function group(data) {
    const groups = _.groupBy(data.list, function (date) {
        return moment.unix(date.dt).format('MMMM, D');
    });
    return groups
}

export const cityReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CITY' :
            const list = action.currentCity
            return {
                ...state,
                currentCity: {
                    name: action.currentCity.name,
                    lat: action.currentCity.lat,
                    lng: action.currentCity.lng,
                    list: group(list),
                }
            }
        case 'ADD_CITY' :
            return {
                ...state,
                cities: [...state.cities ,{
                    id: uuidv1(),
                    lat: action.city.lat,
                    lng: action.city.lng,
                    name: action.city.name,
                }]
            }
        case 'REMOVE_LOADING' :
            return {
                ...state,
                loading: false
            }
        case 'SET_LOADING' :
            return {
                ...state,
                loading: true
            }
        case  'OPEN_MODAL' :
            return {
                ...state,
                modalOpened: true
            }
        case  'HIDE_MODAL' :
            return {
                ...state,
                modalOpened: false
            }
        default :
            return state

    }

}