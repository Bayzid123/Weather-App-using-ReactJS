// api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=d794c155a8168000850d20bbf44910aa
import React, {useState, useEffect} from 'react'
import Weathercard from "./weathercard"
import "./style.css"

const Temp = () => {
    const [SearchValue, setSearchValue] = useState("Dhaka")

    const [tempInfo, setTempInfo] = useState({})

    const getWeatherInfo = async () => {
        try {
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${SearchValue}&units=metric&appid=d794c155a8168000850d20bbf44910aa`

            const res = await fetch(url)
            const data = await res.json()

            const {temp, humidity, pressure} = data.main
            const {main:weathermood} = data.weather[0]
            const {name} = data
            const {speed} = data.wind
            const {country, sunset} = data.sys
            
            const myNewWeatherInfo = {
                temp, humidity, pressure, weathermood, name, speed, country, sunset,
            }
            
            setTempInfo(myNewWeatherInfo)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getWeatherInfo()
    }, [])

    return (
        <>
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder="search..." autoFocus id="search" 
                className="searchTerm" value={SearchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                <button className="searchButton" type="button" onClick={getWeatherInfo}>
                    Search    
                </button>    
            </div>            
        </div>

        <Weathercard {...tempInfo}/>
        

       </> 
    )
}

export default Temp
