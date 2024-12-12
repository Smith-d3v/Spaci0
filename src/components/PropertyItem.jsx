import { Separator } from '@/components/ui/separator'
import React from 'react'
import { IoLocationOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { PiResizeLight } from "react-icons/pi";
import { MdOpenInNew } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState } from 'react'

function PropertyItem({property}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log('Property ID:', property?.id);
  console.log('Images array:', property?.images);

  const images = property?.images || [];
  const hasMultipleImages = images.length > 1;

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <Link to={'/listing-details/'+property?.id}>
    <div className='border rounded-lg hover:shadow-md hover:cursor-pointer'>
        <div className='relative'>
            <img 
                src={images[currentImageIndex]?.imageUrl || '/placeholder-image.jpg'} 
                width={'100%'} 
                height={250} 
                className='rounded-lg h-[180px] object-cover'
                alt={property?.listingTitle}
            />
            {hasMultipleImages && (
                <>
                    <button 
                        onClick={prevImage}
                        className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full hover:bg-white'
                    >
                        <IoChevronBackOutline />
                    </button>
                    <button 
                        onClick={nextImage}
                        className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full hover:bg-white'
                    >
                        <IoChevronForwardOutline />
                    </button>
                    <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1'>
                        {images.map((_, index) => (
                            <div 
                                key={index}
                                className={`h-1.5 w-1.5 rounded-full ${
                                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
        <div className='p-4 text-black'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-xl mb-2'>{property?.listingTitle}</h2>
                <span className='bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded border border-gray-200'>
                    {property?.offerType}
                </span>
            </div>
            <Separator/>
            <div className='mt-5'>
                <div className='flex items-center gap-2'>
                    <IoLocationOutline className='text-lg mb-2'/>
                    <h2>{property?.location}</h2>
                </div>
            </div>
            <Separator className='my-2'/>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-xl mt-2'>₦{property?.price}</h2>
                <h2 className='text-blue-500 text-sm flex items-center'>
                    <MdOpenInNew className='mr-2'/>
                    View Details</h2>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default PropertyItem