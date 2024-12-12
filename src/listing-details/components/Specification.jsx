import IconField from '@/add-listing/components/IconField'
import PropertySpecification from '@/Shared/PropertySpecification'
import React from 'react'

function Specification({propertyDetail}) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getValue = (item) => {
    let value = propertyDetail[item.name];
    
    if (!value && value !== 0) {
      return "Not Specified";
    }

    switch(item.name) {
      case 'availabilityDate':
        return formatDate(value);
      case 'sizeArea':
        return `${value} m²`;
      case 'offerType':
        return value;
      default:
        return value;
    }
  };

  return (
    <div className='p-10 rounded-xl border shadow-md mt-7'>
        <h2 className='text-2xl font-bold'>Specifications</h2>

        {propertyDetail ? PropertySpecification.map((item,index)=>(
            <div key={index} className='mt-5 flex items-center'>
                <div className='flex gap-2 items-center w-1/2'>
                    <IconField icon={item.icon}/> 
                    <span>{item.label}</span>
                </div>
                <div className='w-1/2 text-right'>
                    {getValue(item)}
                </div>
            </div>
        ))
        : <div className='w-full h-[500px] rounded-xl bg-slate-200 animate-pulse'></div>
        }
    </div>
  )
}

export default Specification