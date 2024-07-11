import React,{useEffect,useState} from 'react'
import sunicon from '../assets/icon/sun.png'
import fogicon from '../assets/icon/fog.png'
import rainicon from '../assets/icon/rain.png'
import snowicon from '../assets/icon/snow.png'
import stormicon from '../assets/icon/storm.png'
import cloudicon from '../assets/icon/cloud.png'
import windyicon from '../assets/icon/windy.png'
import DateObject from 'react-date-object'
import indian_en from "react-date-object/locales/indian_en"
import indian from "react-date-object/calendars/indian";
export default function SmallCard({ condition, time, temp, daily }) {
    const [imgs, setImgs] = useState();
    useEffect(() => {
        if (condition ) {
            const imgData = condition;
         
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
    }, [condition]);
  return (
    <div>
          <div key={time} className='flex flex-col items-center bg-white bg-opacity-60 w-32 rounded-lg text-black' style={{ backdropFilter: " blur(10px)" }}>
              {time && <h2 className='text-center'> {new DateObject(time * 1000).convert(indian, indian_en).format("hh:mm a")}</h2>}
              {daily && <h2 className='text-center'> {new DateObject(daily * 1000).format("dddd")}</h2>}
              <hr className='w-24 m-auto opacity-60' />
              <img className='w-20' src={imgs} alt="" />
              <span className='text-xl pb-2'>{temp}&deg;C</span>
          </div>
    </div>
  )
}
