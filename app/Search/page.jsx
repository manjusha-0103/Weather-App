"use client";
import React, { useState } from "react";
import styles from "../page.module.css";
import "./search.css";
import axios from "axios"
import {useRouter} from "next/navigation";;
import Navebar from "../components/navebar";
const api_key = process.env.API_KEY

const SearchPage = () => {
  const router = useRouter();
  const [city, setCity] = useState(null);
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [changeunit, setUnit] = useState(false)

  const [isfave, setfave] = useState(false);
  const limit = 5;

  const getproperties = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key}`
      );
      console.log(response.data);
      setLon(response.data?.lon);
      setLat(response.data?.lat);
    } catch (error) {
      console.log(error);
    }
  };
  const checkWeather = async (e) => {
    e.preventDefault();

    try {
      await getproperties();
      console.log(lat, lon);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );
      
      if (response.data.cod === 200) {
        const da = response.data;
        console.log("description : ", response.data);
        setWeatherData(response.data);
      }
      else{
        console.log("Enter valid location for search")
        router.refresh()
        setCity("")
        alert("Enter valid location for search")
        
      
      }
      
    } catch (error) {
      console.log(error);
      setCity("")
      alert("Enter valid location for search")
      router.refresh()
    }
  };
  const saveCurrentdata = async (e) => {
    try {
      setfave(true);
      const reqdata = {
        city: city,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        wind_speed: weatherData.wind.speed,
        description: weatherData.weather[0].description.replace(
          /\b\w/g,
          (match) => match.toUpperCase()
        ),
      };
      const res = await axios.post("/api/details", reqdata);
      if (res.ok) {
        console.log(res.data.message);
        alert(res.data.message);
      }
      if(res){
        alert("Add valid Location")
      }
    } catch (error) {
      console.log(error);
     
    }
  };
  return (
    <main className={styles.main}>
      <Navebar />
      <div className="main_con">
        <h2>Check Current Weather 🌦️</h2>
        <h3>Enter the name of the city </h3>
        <form onSubmit={checkWeather} method="post">
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter the name of the city"
            value={setCity.city}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {weatherData ? (
        <>
          <div className="detail-main">
            <div className="fave-bt">
              <button
                onClick={() => {
                  saveCurrentdata();
                }}
              >
                {isfave ? `Faveriout` : `Add to Faverioute`}
              </button>
            </div>
            <div className="data-con">
              <h2>
                Current Weather status of the{" "}
                {city.replace(/\b\w/g, (match) => match.toUpperCase())}🌦️
              </h2>
            
            {/* <div><h4>{prop.state}</h4></div> */}
          
              <h3>Temperature : <span className="data">{changeunit? `${(weatherData.main.temp* 9 / 5) + 32} ℉`:`${weatherData.main.temp} °C`}    
              <span><button className="changeunit"onClick={()=>{setUnit(!changeunit)}}>
                {changeunit?"℉ to °C":"°C to ℉ "}
                </button></span></span></h3>
           
           
              <h3>Humidity : <span className="data">{weatherData.main.humidity}% </span></h3>
           
            
              <h3>Wind Speed : <span className="data">{weatherData.wind.speed} meter/sec</span></h3>
         
           
              <h3>
                Weather Status :{" "}<span className="data">
                {weatherData.weather[0].description.replace(/\b\w/g, (match) =>
                  match.toUpperCase()
                )}</span>
              </h3>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div></div>
    </main>
  );
};

export default SearchPage;
