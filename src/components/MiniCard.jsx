import React from 'react'

import { usecontexts } from '../contextAPI/Contectapi'
import SmallCard from './SmallCard'
function MiniCard() {
  
  const {weathers, values} = usecontexts();

  
 
  return (
    <div className='md:w-8/12 sm:5/12 my-2 flex flex-col'>    
      <h1 className='text-center text-xl text-white font-bold'>3 HOUR STEP FORECAST </h1>   
      <hr className='sm:w-96 w-72 m-auto opacity-90 my-2' />
      <div  className='flex justify-center my-4 md:gap-10 gap-5 flex-wrap'>
        {values.hourly && values.hourly.map((item)=>(
          <SmallCard time={item.second} temp={item.temperature} condition={item.condition}/>
        ))}
        
      </div>
      <h1 className='text-center text-xl text-white font-bold'>DAILY FORECAST </h1>
      <hr className='sm:w-96 w-72 m-auto opacity-90 my-2' />
      <div className='flex  justify-center my-4 md:gap-10 gap-5 flex-wrap'>

        {values.Daily && values.Daily.map((item) => (
          <SmallCard daily={item.second} temp={item.temperature} condition={item.condition} />
        ))}
      </div>
    </div>
  )
}

export default MiniCard
