import React from "react";
import moment from "moment";


const WeatherInfo = props => {

    const {date} = props
    const data = props.list[date]
    const week = Object.keys(props.list)
    console.log(props.list)
    let dayName = ''
    if (moment(new Date()).format('MMMM, D') === date) {
        dayName = ''

    } else if (moment(new Date()).add(1, 'day').format('MMMM, D') === date) {
        dayName = ''
    }

    return (

        <div className="info">
            {dayName === 'today' || dayName === 'tomorrow' ?
                <>
                    <div className="info__header">
                        <h4 className="info__day--name">{dayName}</h4>
                        <p className="info__date">{date}</p>
                    </div>
                    <div className="info__items">
                        <div className="items__header">
                            <span>Time</span>
                            <span>Weather</span>
                        </div>
                        <div className="items__body">
                            {data.map((el, idx) => (
                                <div className="info__item" key={idx}>
                                    <span className="item__time">{moment.unix(el.dt).format('H:MM')}</span>
                                    <span
                                        className="item__weather">{Math.round(el.main.temp)} &deg; C, {el.weather[0].main} Wind - {el.wind.speed} meter per second</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                :
                <>
                    {week.map((day) => {
                        return (
                            <div className="week" key={day}>
                                <h3>{day}</h3>
                                <p>{Math.round(props.list[day][0].main.temp)}</p>
                            </div>
                        )
                    })}

                </>
            }
        </div>
    )

}

export default WeatherInfo