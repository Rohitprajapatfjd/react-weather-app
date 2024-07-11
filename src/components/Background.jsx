import React, { useState,useEffect } from 'react'
import clear from '../assets/images/clear.jpeg'
import cold from '../assets/images/cold.jpeg'
import cloud from '../assets/images/cloud.webp'
import fog from '../assets/images/fog.webp'
import rain from '../assets/images/rain.jpeg'
import storm from '../assets/images/storm.webp'
import { usecontexts } from '../contextAPI/Contectapi'
function Background() {
const [bg , setbg] = useState()
const {weathers} = usecontexts()
  useEffect(() => {
    if (weathers && weathers.weather) {
      const imgData = weathers.weather[0].main;
      if (imgData === "Clouds") {
        setbg(cloud);
      } else if (imgData === "Rain") {
        setbg(rain);
      } else if (imgData === "Clear") {
        setbg(clear);
      } else if (imgData === "Snow") {
        setbg(cold);
      } else if (imgData === "Thunderstorm") {
        setbg(storm);
      } else if (imgData === "Fog" || imgData === "Smoke" || imgData === "Mist" || imgData === "Haze") {
        setbg(fog);
      }
    }
  }, [weathers]);
  return (
    <div>
      <img src={bg} className="w-full h-screen blur-0 -z-10 fixed left-0 top-0"/>
    </div>
  )
}

export default Background
