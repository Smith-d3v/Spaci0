import React from 'react'
import Data from '../Shared/Data'
import { Link } from 'react-router-dom'

function Category() {
  return (
    <div className='mt-20'>
        <h2 className='text-3xl font-bold text-center mb-8 text-black'>Browse By Type</h2>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-7 gap-6 px-20'>
            {Data.Category.map((category,index)=>(
              <Link to={'/search/'+category.name}>
                <div className='items-center flex flex-col hover:shadow-sm cursor-pointer'>
                    <img src={`/Icons/${category.icon}`} width={35} height={35} />
                    <h2 className='mt-2 text-black'>{category.name}</h2>
                </div>
              </Link>
            ))}
        </div>
    </div>
  )
}

export default Category