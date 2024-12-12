import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Service from '@/Shared/Service';
import { PropertyListing, PropertyImages } from './../../configs/schema';
import { eq, sql } from 'drizzle-orm';
import { db } from './../../configs';
import Header from '@/components/Header';
import PropertyItem from '@/components/PropertyItem';
import AdvancedFilter from '@/components/AdvancedFilter';

function SearchByOptions() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [propertyList, setPropertyList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        GetPropertyList();
    }, [searchParams])

    const handleFilterChange = (filters) => {
        const newParams = new URLSearchParams();
        
        // IMPORTANT: Always preserve offerType first
        const currentOfferType = searchParams.get('offerType');
        if (currentOfferType) {
            newParams.set('offerType', currentOfferType);
        }
        
        // Then add other filters
        if (filters.location) newParams.set('location', filters.location);
        if (filters.category) newParams.set('category', filters.category);
        if (filters.condition) newParams.set('condition', filters.condition);
        if (filters.priceRange.min) newParams.set('minPrice', filters.priceRange.min);
        if (filters.priceRange.max) newParams.set('maxPrice', filters.priceRange.max);
        if (filters.buildingAge) newParams.set('buildingAge', filters.buildingAge);
        if (filters.nearbyFacilities?.length) {
            newParams.set('nearbyFacilities', JSON.stringify(filters.nearbyFacilities));
        }
        
        setSearchParams(newParams);
    };

    const GetPropertyList = async () => {
        try {
            setIsLoading(true);
            setNoResults(false);

            let query = db
                .select({
                    propertyListing: PropertyListing,
                    propertyimages: PropertyImages
                })
                .from(PropertyListing)
                .leftJoin(
                    PropertyImages, 
                    eq(PropertyListing.id, PropertyImages.propertyListingId)
                );

            // IMPORTANT: Always apply offerType filter first
            const offerType = searchParams.get('offerType');
            if (offerType) {
                query = query.where(eq(PropertyListing.offerType, offerType));
            }

            // Apply other filters
            if (searchParams.get('minPrice')) {
                const minPrice = Number(searchParams.get('minPrice'));
                query = query.where(
                    sql`CAST(REPLACE(REPLACE(${PropertyListing.price}, '₦', ''), ',', '') AS DECIMAL) >= ${minPrice}`
                );
            }

            if (searchParams.get('maxPrice')) {
                const maxPrice = Number(searchParams.get('maxPrice'));
                query = query.where(
                    sql`CAST(REPLACE(REPLACE(${PropertyListing.price}, '₦', ''), ',', '') AS DECIMAL) <= ${maxPrice}`
                );
            }

            if (searchParams.get('location')) {
                query = query.where(
                    sql`LOWER(${PropertyListing.location}) LIKE LOWER(${'%' + searchParams.get('location').trim() + '%'})`
                );
            }

            if (searchParams.get('category')) {
                query = query.where(eq(PropertyListing.category, searchParams.get('category')));
            }

            if (searchParams.get('condition')) {
                query = query.where(eq(PropertyListing.condition, searchParams.get('condition')));
            }

            if (searchParams.get('buildingAge')) {
                query = query.where(eq(PropertyListing.buildingAge, searchParams.get('buildingAge')));
            }

            if (searchParams.get('nearbyFacilities')) {
                const facilities = JSON.parse(searchParams.get('nearbyFacilities'));
                facilities.forEach(facility => {
                    query = query.where(
                        sql`${PropertyListing.nearbyFacilities}::jsonb @> ${JSON.stringify([facility])}::jsonb`
                    );
                });
            }

            let result = await query;
            
            // Double-check results to ensure they match offerType
            let resp = Service.FormatResult(result).filter(property => 
                !offerType || property.offerType === offerType
            );

            setNoResults(resp.length === 0);
            setPropertyList(resp);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setPropertyList([]);
            setNoResults(true);
        } finally {
            setIsLoading(false);
        }
    }

    const getTitle = () => {
        if (searchParams.get('offerType') === 'Sale') return 'Properties for Sale';
        if (searchParams.get('offerType') === 'Rent') return 'Properties for Rent';
        return 'Search Result';
    }

  return (
    <div>
        <Header/>

        <div className='p-16 bg-black flex justify-center'>
            <AdvancedFilter onFilterChange={handleFilterChange} />
        </div>
        <div className='p-10 md:px-20'>
            <h2 className='font-bold text-4xl'>{getTitle()}</h2>

            {(searchParams.has('condition') || searchParams.has('location') || 
              searchParams.has('category') || searchParams.has('buildingAge') || 
              searchParams.has('minPrice') || searchParams.has('maxPrice') || 
              searchParams.has('nearbyFacilities')) && (
                <div className="mt-4 text-gray-600">
                    Searching for: {' '}
                    {[
                        // Combine condition and category
                        [
                            searchParams.get('condition') && `${searchParams.get('condition')} condition`,
                            searchParams.get('category')
                        ].filter(Boolean).join(' '),

                        // Location
                        searchParams.get('location') && `in ${searchParams.get('location')}`,

                        // Price Range
                        (searchParams.get('minPrice') || searchParams.get('maxPrice')) && 
                            `with a price range of ${
                                searchParams.get('minPrice') 
                                    ? `₦${Number(searchParams.get('minPrice')).toLocaleString()}` 
                                    : '₦0'
                            } to ${
                                searchParams.get('maxPrice') 
                                    ? `₦${Number(searchParams.get('maxPrice')).toLocaleString()}` 
                                    : 'any amount'
                            }`,

                        // Building Age
                        searchParams.get('buildingAge') && `built ${searchParams.get('buildingAge').toLowerCase()}`,

                        // Nearby Facilities
                        searchParams.get('nearbyFacilities') && 
                            `near ${JSON.parse(searchParams.get('nearbyFacilities')).map(f => `${f}`).join(', ')}`,

                        // Price Negotiable
                        searchParams.get('priceNegotiable') === 'true' && '(price negotiable)'
                    ].filter(Boolean).join(', ')}
                </div>
            )}

            {noResults && !isLoading && (
                <div className="mt-8 text-center">
                    <p className="text-xl text-gray-600">
                        No properties found matching your search criteria.
                    </p>
                    <p className="mt-2 text-gray-500">
                        Try adjusting your search filters or exploring our other listings.
                    </p>
                </div>
            )}

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
                {!isLoading ? (
                    propertyList?.map((item, index) => (
                        <div key={index}>
                            <PropertyItem property={item} />
                        </div>
                    ))
                ) : (
                    [1,2,3,4,5,6].map((item, index) => (
                        <div key={index} className='h-[320px] rounded-xl bg-slate-200 animate-pulse'>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  )
}

const formatBudget = (value) => {
    return Number(value).toLocaleString('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
    });
};

export default SearchByOptions