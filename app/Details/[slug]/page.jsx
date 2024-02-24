'use client'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import "../../Details/deatails.css";
import styles from "../../page.module.css";
import bgimg from "../../../public/images/bgimg.jpeg"
import "./page.css"
import Navebar from '@/app/components/navebar';
import Link from 'next/link';

const api_key = process.env.API_KEY

const Page = ({params}) => {

  const city = params.slug
  console.log(city)
  const [forecastData, setForecastData] = useState([]);
  const [changeunit, setUnit] = useState(false)

  const handlForecast = async () => {
    // e.preventDefault();
    try{
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`
      );
    
        
      console.log("Got forecast",response.data)
      setForecastData(response.data.list)
    
      
    }
    catch(error){
      console.log(error)
    }
  }
  

  useEffect(() => {
    handlForecast();
    console.log("hello")
  }, []);

  return (
    <main className={styles.main}>
       <Navebar />
        <div>
            <Link href ="/Search"><h1>👈 Look for Current whether of any city Here</h1></Link>
        </div>
        <div className="crd-befre">
        <div className="unit-con">  
          <h1>Five days Weather Forecasting of {`${city} `} 🌦️</h1>
          <button onClick={()=>{setUnit(!changeunit)}}>{changeunit?"℉ to °C":"°C to ℉ "}</button>
        </div>
        <table className="container">
          <thead>
            <tr>
              <th><h1>Date Time</h1></th>
              <th><h1>Temperature{changeunit?"(℉)":"(°C)"}</h1></th>
              <th><h1>Humidity{`(%)`}</h1></th>
              <th><h1>Wind Speed{`(meter/sec)`}</h1></th>
              
              <th><h1>Description</h1></th>
            </tr>
          </thead>
          <tbody>
            {forecastData.map((data,id)=>{
              return(
                <tr key={id}>
                  <td>{data.dt_txt}</td>
                  <td>{changeunit? `${(data.main.temp* 9 / 5) + 32}`:`${data.main.temp}`}</td>
                  <td>{data.main.humidity}</td>
                  <td>{data.wind.speed}</td>
                  <td>{data.weather[0].description.replace(/\b\w/g, (match) => match.toUpperCase())}</td>
                </tr>
              )}
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Page

