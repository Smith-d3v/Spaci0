import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import DetailHeader from '../components/DetailHeader'
import { useParams } from 'react-router-dom'
import { db } from './../../../configs'
import { PropertyListing, PropertyImages } from './../../../configs/schema'
import { eq } from 'drizzle-orm'
import Service from '@/Shared/Service'
import ImageGallery from '../components/ImageGallery'
import Description from '../components/Description'
import Amenities from '../components/Amenities'
import Pricing from '../components/Pricing'
import Specification from '../components/Specification'
import ContactAgent from '../components/ContactAgent'
import MostSearchedProperty from '@/components/MostSearchedProperty'

function ListingDetails() {

    const {id}=useParams();
    const [propertyDetails,setPropertyDetails]=useState([]);

    useEffect(()=>{
        GetPropertyDetails();
    },[id]);

    const GetPropertyDetails=async()=>{
        const result=await db.select().from(PropertyListing)
        .innerJoin(PropertyImages,eq(PropertyListing.id,PropertyImages.propertyListingId))
        .where(eq(PropertyListing.id,id));

        const resp=Service.FormatResult(result);

        setPropertyDetails(resp[0]);
    }


  return (
    <div>
        <Header/>

        <div className='p-10 md:px-20'>
        {/* Header Detail Component */}
            <DetailHeader propertyDetail={propertyDetails}/>

        <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
            {/* Left */}
            <div className='md:col-span-2 '>
                {/* Image Gallery */}
                <ImageGallery propertyDetail={propertyDetails}/>

                {/* Description */}
                <Description propertyDetail={propertyDetails}/>

                {/* Features List */}
                <Amenities amenities={propertyDetails?.amenities}/>

            </div>
            {/* Right Side */}
            <div>
                {/* Pricing */}
                <Pricing propertyDetail={propertyDetails}/>

                {/* PropertySpecification */}
                <Specification propertyDetail={propertyDetails}/>

                {/* Contact Agent */}
                <ContactAgent propertyDetail={propertyDetails}/>
            </div>
        </div>
        <MostSearchedProperty/>
        </div>
    </div>
  )
}

export default ListingDetails