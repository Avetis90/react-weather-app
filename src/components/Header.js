import React, {useContext} from 'react'
import SearchInput from "./Search";
import {CityContext} from "../contexts/CityContext";
import moment from "moment";
import {Link,useHistory} from "react-router-dom";


const Header = () => {
    const {cityDispatch, cityState} = useContext(CityContext);
    const {status , currentCity} = cityState
    const statuses = ['today', 'tomorrow', 'week'];
    const history = useHistory()
    const handleStatus = (status) => {


        cityDispatch({
            type: 'CHANGE_STATUS',
            status
        })
        history.push(`/${currentCity.id}`)
        switch (status) {
            case 'today':
                return cityDispatch({
                    type: 'CHANGE_ACTIVEDATE',
                    date: moment(new Date()).format('MMMM, D')
                })
            case 'tomorrow':
                return cityDispatch({
                    type: 'CHANGE_ACTIVEDATE',
                    date: moment(new Date()).add(1, 'day').format('MMMM, D')
                })
            default :
                return cityDispatch({
                    type: 'CHANGE_ACTIVEDATE',
                    date: moment(new Date()).format('MMMM, D')
                })
        }
    };
    const MenuItem = (props) => {
        return (
                <span className={`menu__item ${props.name === status ? 'menu__item--active' : ''}`}
                      onClick={() => handleStatus(props.name)}>{props.name}</span>
        )
    }
    return (
        <header>

            <nav>
                <div className="menu">
                    <Link to={'/'} className={'menu__item'}><img src="img/sunny.gif" alt=""/></Link>
                    {statuses.map(status => <MenuItem name={status} key={status}/>)}


                </div>
                <div className="search">
                    <SearchInput/>
                </div>
            </nav>
        </header>
    )
}

export default Header;