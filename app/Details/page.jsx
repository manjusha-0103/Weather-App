"use client";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import axios from "axios";
import "./deatails.css";
import bgimg from "../../public/images/bgimg.jpeg"
import Link from "next/link";
import Navebar from "../components/navebar";

const DetailsPage = () => {
  const [weatherdata, setWeatherData] = useState([]);
  const [changeunit, setUnit] = useState(false)

  const getallweather = async () => {
    try {
      const response = await axios.get("/api/details");
      if (response.data.success) {
        setWeatherData(response.data.data);
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(weatherdata);

  
  useEffect(() => {
    getallweather();
  }, []);
  return (
    <main className={styles.main}>
       <Navebar />
        <div>
            <Link href ="/Search"><h1>👈 Look here for Current whether of any city Here</h1></Link>

        </div>
        <div className="crd-befre">
          {weatherdata?<div className="unit-con"><button onClick={()=>{setUnit(!changeunit)}}>{changeunit?"℉ to °C":"°C to ℉ "}</button></div>:<></>}
            {weatherdata.map((data, id)=>{
                return(
                    <Link className="crd-link" href={`/Details/${data.city}`}><div className="blog-card" key ={id}>
                        <div className="meta">
                            <div className="photo" 
                            style={{
                                backgroundImage: `url(${bgimg.src})`
                            }}></div>
                            <ul className="details">

                                    <li>
                                        <h4 > Temperature : {changeunit?`${(data.temperature* 9 / 5) + 32} ℉` :`${data.temperature} °C`} </h4>
                                    </li>
                                    <li>
                                        <h4 > Humidity : {data.humidity} %</h4>
                                    </li>
                                    <li>
                                        <h4 >Wind Speed : {data.wind_speed} meter/sec</h4>
                                    </li>
                            
                            </ul>
                        </div>
                        <div className="description">
                            <h1>Current Weather in {data.city.replace(/\b\w/g, (match) => match.toUpperCase())}</h1>
                            <p>
                            Weather : {data.description}
                            </p>
                            
                        </div>
                        
                    </div>
                  </Link>)
                })
            }
        </div>
    </main>
  );
};

export default DetailsPage;
