import React, { useEffect, useState } from 'react'
import sunicon from '../assets/icon/sun.png'
import fogicon from '../assets/icon/fog.png'
import rainicon from '../assets/icon/rain.png'
import snowicon from '../assets/icon/snow.png'
import stormicon from '../assets/icon/storm.png'
import cloudicon from '../assets/icon/cloud.png'
// import windyicon from '../assets/icon/windy.png'
import DateObject from "react-date-object";
import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { FaTemperatureLow, FaTemperatureHigh } from "react-icons/fa";
import MiniCard from './MiniCard';
import { usecontexts } from '../contextAPI/Contectapi'
import indian_en from "react-date-object/locales/indian_en"
import indian from "react-date-object/calendars/indian";
function WeatherCard() {
  const [date, setDate] = useState(new DateObject())
  const [imgs ,setImgs] = useState();
  const { setweather, weathers, place, setplace, values } =  usecontexts();
  
      useEffect(() => {
    if (weathers && weathers.weather) {
      const imgData = weathers.weather[0].main;
      if (imgData === "Clouds") {
        setImgs(cloudicon);
      } else if (imgData === "Rain") {
        setImgs(rainicon);
      } else if (imgData === "Clear") {
        setImgs(sunicon);
      } else if (imgData === "Snow") {
        setImgs(snowicon);
      } else if (imgData === "Thunderstorm") {
        setImgs(stormicon);
      } else if (imgData === "Fog" || imgData === "Smoke" || imgData === "Mist") {
        setImgs(fogicon);
      }
    }
  }, [weathers]);
  
  
  


    // convert second into date
  const sectoDate = (dt)=>{
    let dates = new DateObject(dt*1000).convert(indian,indian_en);
    let a = dates.format("hh:mm a")
   
    return a
      }

   useEffect(()=>{
      const timer = setInterval(() => {
        setDate(new DateObject())
      }, 60*1000);
       return ()=>{
        clearInterval(timer)
       }
   },[])
   
  
  return (
    <div className='flex md:flex-row flex-col justify-around items-center my-10 sm:mx-5 mx-3'>
    <div className='bg-white bg-opacity-60 sm:w-[23rem] w-64 rounded-lg text-black' style={{ backdropFilter: " blur(10px)" }}>
      <div className='flex justify-center items-center py-4'>
          <img className='mr-6 sm:w-20 w-12 ' src={imgs}/>
          <span className='sm:text-5xl text-2xl font-bold '>{weathers.temp} &deg;C</span>
         
      </div>
      <div className='flex justify-center'>
          <p className='text-2xl font-bold'>{weathers.name} ,{weathers.country}</p>
      </div>
        <div className='flex justify-around py-3'>
          <p className='text-md font-bold'>{date.format("ddd MMM DD YYYY")}</p>
          <p className='text-md font-bold'> {date.format("hh:mm a")}</p>
        </div>
        <hr className='w-60 m-auto opacity-60' />
        <div className='flex items-center flex-col py-1'>
          <p className='text-sm font-bold flex justify-center '><WiThermometer className='text-2xl' /> Real Feel {weathers.feels_like}&deg;</p>
          <p className='text-sm font-bold flex justify-center py-1'> <WiHumidity className='text-2xl ' />Humidity {weathers.humidity}%</p>
          <p className='text-sm font-bold flex justify-center '><WiStrongWind className='text-2xl '/> Wind {Math.floor(weathers.speed * 3.6)} km/h </p>
        </div>
        <hr className='w-60 m-auto opacity-60' />
        <div className='flex justify-around items-center py-2'>
          <p className='text-sm font-bold flex justify-center items-center py-1'><GiSunrise className='text-2xl' /> Rise {sectoDate(weathers.sunrise)}</p>
          <p className='text-sm font-bold flex justify-center  items-center py-1'> <GiSunset className='text-2xl ' /> Set {sectoDate(weathers.sunset)}</p>         
        </div>
        <div className='flex justify-around items-center py-1 pb-2'>
          <p className='text-sm font-bold flex justify-center  items-center py-1'><FaTemperatureHigh className='text-xl ' /> High {weathers.temp_max}&deg;</p>
          <p className='text-sm font-bold flex justify-center  items-center py-1'><FaTemperatureLow className='text-xl ' /> Low {weathers.temp_min}&deg;</p>
        </div>
        <hr className='w-64 m-auto opacity-60' />
        <div className='flex justify-center py-3'>
          <p className='text-2xl font-bold'>{weathers.weather && weathers.weather[0].description}</p>
        </div>
    </div>
      <MiniCard/>
    </div>
  )
}

export default WeatherCard
