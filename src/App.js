import React from 'react';
import CityContextProvider from "./contexts/CityContext";
import {
    BrowserRouter as Router,
    Route, Switch
} from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages";
import CityAddModal from "./components/CityAddModal";
import City from "./pages/City";

function App() {
    return (

        <CityContextProvider>
            <Router>
                <div className="App">

                    <Header/>
                    <Switch>
                        <Route exact path="/" >
                            <HomePage/>
                        </Route>
                        <Route exact path="/:id" >
                            <City/>
                        </Route>

                    </Switch>
                    <CityAddModal/>
                </div>
            </Router>
        </CityContextProvider>

    );
}

export default App;
