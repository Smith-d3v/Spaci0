import Header from '@/components/Header'
import { db } from './../../../configs';
import { PropertyImages, PropertyListing } from './../../../configs/schema';
import { eq, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Service from '@/Shared/Service';
import PropertyItem from '@/components/PropertyItem';

function SearchByCategory() {

    const {category}=useParams();
    const [searchParams] = useSearchParams();
    const [propertyList,setPropertyList]=useState([]);

    useEffect(()=>{
        GetPropertyList();
    },[searchParams])

    const GetPropertyList=async()=>{
        let query = db.select()
            .from(PropertyListing)
            .innerJoin(PropertyImages, eq(PropertyListing.id, PropertyImages.propertyListingId));

        // Apply category filter if provided
        if (category) {
            query = query.where(eq(PropertyListing.category, category));
        }

        // Apply filters from searchParams
        searchParams.forEach((value, key) => {
            switch(key) {
                case 'minPrice':
                    query = query.where(PropertyListing.price.gte(Number(value)));
                    break;
                case 'maxPrice':
                    query = query.where(PropertyListing.price.lte(Number(value)));
                    break;
                case 'location':
                    // Case-insensitive location search
                    query = query.where(sql`LOWER(${PropertyListing.location}) LIKE LOWER(${'%' + value + '%'})`);
                    break;
                case 'condition':
                case 'buildingAge':
                    // Exact match for these fields
                    query = query.where(eq(PropertyListing[key], value));
                    break;
                case 'nearbyFacilities':
                    // Handle multiple facilities
                    const facilities = value.split(',');
                    facilities.forEach(facility => {
                        query = query.where(sql`${PropertyListing.nearbyFacilities} LIKE ${'%' + facility + '%'}`);
                    });
                    break;
                case 'priceNegotiable':
                    query = query.where(eq(PropertyListing.priceNegotiable, value === 'true'));
                    break;
            }
        });

        const result = await query;
        const resp = Service.FormatResult(result);
        setPropertyList(resp);
    }
     
  return (
    <div>
        <Header/>

        <div className='p-10 md:px-20'>
            <h2 className='font-bold text-4xl '>{category}</h2>

            {/* List of Proper  */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
                {propertyList?.length>0? propertyList.map((item,index)=>(
                    <div key={index}>
                        <PropertyItem property={item} />
                    </div>
                )):
                [1,2,3,4,5,6].map((item,index)=>(
                    <div className='h-[320px] rounded-xl bg-slate-200 animate-pulse'>
                    </div>
                ))
                }
            </div>
        </div>
    </div>
  )
}

export default SearchByCategory