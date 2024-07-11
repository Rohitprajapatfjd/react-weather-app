import { useState } from "react";
import { Background, WeatherCard} from "./components/"

import { usecontexts } from "./contextAPI/Contectapi"

import { FaSearch } from "react-icons/fa";

function App() {
  const { weathers, place, setplace} = usecontexts()
  const [inputvalue , setinputvalue] = useState("");
  const city = [
    { id: 1, name: "Delhi" },
    { id: 2, name: "London" },
    { id: 3, name: "New York" },
    { id: 4, name: "Sydney" },
    { id: 5, name: "Paris" },
  ] 

  const changes = (e)=>{
   setplace(e.target.innerHTML)
  }
   
  const clicks = (e) => {    
    setplace(inputvalue)
    setinputvalue("")
  }
  return (
    <>
      <div className='flex justify-between sm:px-7 px-4 items-center z-10 mt-3 bg-transparent' >
        <h1 className="text-pretty sm:text-2xl text-xl font-bold text-white">Weather App</h1>
        <ul key={"ul"} className=" justify-center items-center gap-4 lg:gap-10 hidden md:flex font-medium text-lg text-white">
        {city.map((item)=> (
          <li key={item.id} onClick={changes}  className="cursor-pointer">{item.name}</li>
        ))}
          
       </ul>
       <div className="relative">
          <input onKeyUp={(e) => {
            if (e.key === 'Enter') {
              return clicks()
            }
          }} className="text-xl sm:w-60 w-44 rounded-lg pl-2 pr-8 py-1 outline-none shadow-inner shadow-slate-800 " placeholder="Search City...." type="text" onChange={(e)=>setinputvalue(e.target.value)} value={inputvalue} />
          <FaSearch className="absolute top-2 text-xl right-3 cursor-pointer" onClick={clicks} />
       </div>
      </div>
      <Background />
      <WeatherCard/>
    </>
  )
}

export default App
