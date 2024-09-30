import React, { useEffect, useRef, useState } from "react";
import "../Css/Weather.css";
import { IoIosSearch } from "react-icons/io";

const Weather = () => {
  const [weather, setWeather] = useState(false);
  const inputRef = useRef()

  const allIcons = {
    "01d":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727690274/weather01-512_ezq38m.png",
    "01n":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727697904/6563645_rjtfoe.png",
    "02d":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727690246/weather03-512_ds2zv1.png",
    "02n":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727690246/weather03-512_ds2zv1.png",
    "03d":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727690246/weather03-512_ds2zv1.png",
    "03n":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727697904/6563645_rjtfoe.png",
    "04d":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727690246/weather03-512_ds2zv1.png",
    "04n":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727697904/6563645_mdasaj.png ",
    "09d":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727690345/weather07-512_kbya4a.png",
    "09n":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727690345/weather07-512_kbya4a.png",
    "10d":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727690345/weather07-512_kbya4a.png",
    "10n":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727690345/weather07-512_kbya4a.png",
    "11d":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727690377/weather09-512_ffqb6k.png",
    "11n":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727690377/weather09-512_ffqb6k.png",
    "13d":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727698367/snow_e0fesk.png",
    "13n":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727698367/snow_e0fesk.png",
    "50d":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727699829/weather-meteorology-icon-cloud-fog-vector-illustration-weather-forecast-symbol-mobile-web_646072-163_bxxhbl-removebg-preview_hrmawd.png ",
    "50n":
      "https://res.cloudinary.com/dixfg1bvv/image/upload/v1727699829/weather-meteorology-icon-cloud-fog-vector-illustration-weather-forecast-symbol-mobile-web_646072-163_bxxhbl-removebg-preview_hrmawd.png ",
  };

  const Key = "08143763a5d31846431f6d3c7d449502";
  console.log(Key);
  const search = async (city) => {
    if( city ===""){
        alert("Enter City")
        return;
    }
      try {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Key}`;
          const response = await fetch(url);
          const data = await response.json();
          const icon = allIcons[data.weather[0].icon] 
          console.log(data);
          setWeather({
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
              temperature: data.main.temp,
              location: data.name,
              icon: icon ,
            });
        } catch (error) {
            setWeather({
                humidity:0,
                windSpeed:0,
                temperature:0,
                location: "Not Found",
                icon:"https://res.cloudinary.com/dixfg1bvv/image/upload/v1727704136/1207711_leqe2p.png"
            })
            console.log(error);
        }
    };
    
  useEffect(() => {
    search("Delhi");
  }, []);
  return (
    <div className="weather">
      <div className="searchBar">
        <input type="text"  onKeyDown={(e) => {
            if (e.key==="Enter"){
                search(inputRef.current.value)
            }
        }} ref={inputRef} placeholder="Search" />
        <IoIosSearch onClick ={()=>search(inputRef.current.value)} className="searchIcon" />
      </div>
      <img
        className="weatherImage"
        src={weather.icon   }
        alt="clearWeather"
      />
      <p className="temperature">{weather.temperature}°C</p>
      <p className="location">{weather.location} </p>
      <div className="dataWeather">
        <div className="humidity">
          <img
            src="https://res.cloudinary.com/dixfg1bvv/image/upload/v1727693625/icons8-humidity-48_pqrqut.png"
            alt="humidity"
          />
          <div className="">
            <span>{weather.humidity}% </span> <br />
            <span>Humidity</span>
          </div>
        </div>

        <div className="wind">
          <img
            src="https://res.cloudinary.com/dixfg1bvv/image/upload/v1727693799/icons8-wind-50_z1hob1.png"
            alt="windSpeed"
          />
          <div className="">
            <span>{weather.windSpeed}Km/h </span>
            <br />
            <span>Wind</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
