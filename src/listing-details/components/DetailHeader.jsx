import React from 'react'
import { HiCalendarDays } from "react-icons/hi2";

function DetailHeader({propertyDetail}) {
  return (
    <div>
        <h2 className='text-3xl font-bold'>{propertyDetail?.listingTitle}</h2>

        <div>
        
        </div>
    
    </div>
  )
}

export default DetailHeader 