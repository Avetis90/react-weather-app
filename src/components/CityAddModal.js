import React, {useContext, useState} from 'react'
import {CityContext} from "../contexts/CityContext";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";

const CityAddModal = () => {
    const {cityDispatch, cityState , addCity} = useContext(CityContext)
    const [city, setCity] = useState('');
    const {modalOpened} = cityState;
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleHide = () => {
        console.log('close')
        cityDispatch({type: 'HIDE_MODAL'})
    }
    const handleCity = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setCity('')
                const params = `lat=${latLng.lat}&lon=${latLng.lng}`;
                addCity(params)
                handleHide()

            })
            .catch(error => console.error('Error', error));
    };
    return (
        <>
            {modalOpened &&
            <div className="modal">
                <div className="modal__wrapper">
                    <form onSubmit={handleSubmit}>
                        <i className="fa fa-times-circle" onClick={handleHide}></i>
                        <div className="modal__header">
                            <h3>Add city to your list</h3>
                        </div>
                        <div className="modal__body">
                            <PlacesAutocomplete
                                value={city}
                                onChange={e => setCity(e)}
                                onSelect={address => handleCity(address)}
                            >
                                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                    <div className={'section__wrapper'}>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Find City...',
                                                className: 'search__input'
                                            })}
                                        />
                                        <div className="search__result">
                                            {loading && city && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion)}
                                                        className={'suggestion__item'}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </div>
                    </form>
                </div>

            </div>
            }
        </>
    )

}

export default CityAddModal