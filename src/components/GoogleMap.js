import React from "react";
import {GoogleMap, Marker, withGoogleMap} from "react-google-maps"


const MapComponent = props => {
    const {lat, lng} = props.coords
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{lat, lng}}
        >
            {props.isMarkerShown && <Marker
                position={{lat, lng}}
            />}
        </GoogleMap>
    )
}

export default withGoogleMap(MapComponent)