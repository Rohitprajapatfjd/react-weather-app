import { list } from "postcss";
import { useState, useEffect, createContext, useContext } from "react";

export const Context = createContext();

export default function Contectapi({ children }) {
    const [weathers, setweather] = useState({})
    const [values, setvalues] = useState([])
    const [place, setplace] = useState("ujjain")

    const currentWeather = async (place) => {
        try {
            let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${place}&appid=28b85aac97533ff3a8635a7c1b53cf3e`)
            let currentData = data.json();

            let data2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=28b85aac97533ff3a8635a7c1b53cf3e`)
               let listData = data2.json();

          

            return { currentData, listData }
        } catch (error) {
            console.log(error)
        }
    }
    
    const strdata = async () => {
        let { currentData, listData } = await currentWeather(place);
        let current = await currentData;
        let List = await listData;
           
        const { sys: { country, sunrise, sunset }, dt, timezone, name, weather, main: { feels_like, humidity, temp, temp_max, temp_min }, wind: { speed }} = current;
        const {list} = List ;
         
      const hourly =  list.map((item)=> (
        {temperature: item.main.temp,
            textTime: item.dt_txt,
            second : item.dt,
            condition: item.weather[0].main
         }
    )).slice(0,5)
        const Daily = list.filter((item) => item.dt_txt.slice(11,19) === "00:00:00")
          .map((item)=>(
         {
             temperature: item.main.temp,
             textTime: item.dt_txt,
             second: item.dt,
             condition: item.weather[0].main }
    ))
       let  dailyData = {Daily,hourly}
      let weatherData =  { country, sunrise, sunset, dt, timezone, name, weather, feels_like, humidity, temp, temp_max, temp_min, speed }
        
        return { weatherData, dailyData }
    }
        useEffect(()=>{
            const datas = async()=>{
                let { weatherData, dailyData }  = await strdata();
                
                setweather(weatherData);
                setvalues(dailyData)
                
            }
            datas()
            
        }, [place])
 
     
    return (
        <Context.Provider value={{ place, setplace, weathers, setweather,  values }}>
            {children}
        </Context.Provider>
    )
}

export const usecontexts = () => useContext(Context)