import React from 'react'

function Description({propertyDetail}) {
  return (
    <div className='p-5 rounded-xl bg-white shadow-md'>
        <h2 className='my-2 text-2xl font-medium'>Description</h2>
        <p>{propertyDetail?.listingDescription}</p>
    </div>
  )
}

export default Description