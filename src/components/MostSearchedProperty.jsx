import React from 'react'
import FakeData from '../Shared/FakeData'
import PropertyItem from './PropertyItem'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"  
import { PropertyListing,PropertyImages } from './../../configs/schema'
import { eq,desc } from 'drizzle-orm'
import Service from '@/Shared/service'
import { db } from './../../configs'
import { useState,useEffect } from 'react'


function MostSearchedProperty() {

  const [propertyList,setPropertyList]=useState([]);
  useEffect(()=>{
    GetPopularPropertyList();
  },[])

    const GetPopularPropertyList=async()=>{
      const result=await db.select()
        .from(PropertyListing)
        .leftJoin(PropertyImages,eq(PropertyListing.id,PropertyImages.propertyListingId))
        .orderBy(PropertyListing.id);

        const resp=Service.FormatResult(result);
        console.log(resp);
        setPropertyList(resp);
    }

  return (
    <div className='mx-24'>
        <h2 className='text-3xl font-bold text-center my-14'>Most Searched Property</h2>

        <Carousel>
        <CarouselContent>
            {propertyList.map((property,index)=>(
                <CarouselItem key={index} className='basis-full md:basis-1/2 lg:basis-1/3'>
                    <PropertyItem property={property} />
                </CarouselItem>
                ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>

    </div>
  )
}

export default MostSearchedProperty