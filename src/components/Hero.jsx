import React from 'react'
import Search from './Search'

function Hero() {
  return (
    <div className='flex flex-col items-center p-10 py-20 gap-6 h-[600px] w-full bg-gray-100'>
        <h2 className='text-lg'>Simplified Property Searches</h2>
        <h2 className='text-[60px] font-bold'>Discover Your Perfect Space</h2>
        <Search/>
    </div>
  )
}

export default Hero