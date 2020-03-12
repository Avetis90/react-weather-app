import React from "react";
import moment from "moment";


const WeatherInfo = props => {
    console.log(props, 'props')
    const {date, status, list} = props
    const data = list[date]
    const week = Object.keys(list)
    console.log(props.list)
    let dayName = ''

    return (

        <>
            {status === 'today' || status === 'tomorrow' ?
                <div className="info">
                    <div className="info__header">
                        <h4 className="info__day--name">{status}</h4>
                        <p className="info__date">{date}</p>
                    </div>
                    <div className="info__items">
                        <div className="items__header">
                            <span>Time</span>
                            <span>Weather</span>
                        </div>
                        <div className="items__body">
                            {data.length ? data.map((el, idx) => (
                                <div className="info__item" key={idx}>
                                    <span className="item__time">{moment.unix(el.dt).format('H:MM')}</span>
                                    <span
                                        className="item__weather">{Math.round(el.main.temp)} &deg; C, {el.weather[0].main} , Wind - {el.wind.speed} meter per second</span>
                                </div>
                            )) : <p>There is no data for today</p>}
                        </div>
                    </div>
                </div>

                :
                <>
                    <div className="week__wrapper">
                        {week.map((day) => {
                            return (
                                <div className="week" key={day}>
                                    <h3>{day}</h3>
                                    <p>{Math.round(props.list[day][0].main.temp)} &deg; C</p>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </>
    )

}

export default WeatherInfo