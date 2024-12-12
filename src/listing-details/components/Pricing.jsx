import React from 'react'

function Pricing({propertyDetail}) {
  return (
    <div className='p-8 rounded-xl border bg-white shadow-md'>
        <h2 className='text-2xl font-medium'>Price</h2>
        <h2 className='text-3xl font-bold'>₦{propertyDetail.price}</h2>
    </div>
  )
}

export default Pricing