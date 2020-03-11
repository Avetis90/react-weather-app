import React from "react";
import Banner from "../components/Banner";
import CityList from "../components/CityList";
import {Switch} from "react-router-dom";


const HomePage = () => {
return(
    <div>
        <Banner isFull/>
        <CityList/>
    </div>
)
}

export default HomePage