import React, {useContext, useState} from "react";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {CityContext} from "../contexts/CityContext";



const SearchInput = () => {
    const [search, setSearch] = useState('');
    const { fetchData } = useContext(CityContext);
    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setSearch(address)
                const params = `lat=${latLng.lat}&lon=${latLng.lng}`;
                fetchData(params)
            })
            .catch(error => console.error('Error', error));
    };

    return (
        <div className={'search__section'}>
            <PlacesAutocomplete
                value={search}
                onChange={e => setSearch(e)}
                onSelect={address =>handleSelect(address)}
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
                            {loading && search && <div>Loading...</div>}
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
    )
};
export default SearchInput