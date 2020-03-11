import React from 'react'
import SearchInput from "./Search";
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header>

                <nav>
                    <div className="menu">
                        <Link  to="/" className="menu__item">today</Link>
                        <Link to="/tomorrow" className="menu__item">tomorrow</Link>
                        <Link to="/week" className="menu__item">week</Link>

                    </div>
                    <div className="search">
                        <SearchInput/>
                    </div>
                </nav>
        </header>
    )
}

export default Header;