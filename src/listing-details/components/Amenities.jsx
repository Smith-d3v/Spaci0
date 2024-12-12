import React from 'react'
import { FaCheck } from "react-icons/fa";

function Features({amenities}) {

    console.log(amenities);
  return (
    <div className='mt-6'>
        <div className='p-10 rounded-xl border bg-white shadow-md'>
            <h2 className='my-2 text-2xl font-medium'>Amenities</h2>
            
            <div className='grid grid-cols-2 md:grid-cols-3 mt-5 gap-7'>
                {amenities && Object.entries(amenities).map(([amenity, value]) => (
                    <div key={amenity} className="flex items-center gap-2 py-1">
                        {value && <FaCheck className="text-lg p-1 rounded-full bg-black text-white" />}
                        <span className="capitalize">{amenity.replace(/_/g, ' ')}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Features