import React, { useEffect,useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { PropertyListing,PropertyImages } from './../../../configs/schema'
import { eq,desc } from 'drizzle-orm'
import { db } from './../../../configs'
import Service from '@/Shared/Service'
import PropertyItem from '@/components/PropertyItem'
import { FaTrashAlt } from 'react-icons/fa'
import { createClient } from '@supabase/supabase-js'
import DeleteConfirmDialog from './DeleteConfirmDialog'

function MyListing() {

    const {user}=useUser();
    const [propertyList,setPropertyList]=useState([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);


    useEffect(()=>{
        user&&GetUserPropertyListing();
    },[user])

    const GetUserPropertyListing=async()=>{
        const result=await db.select().from(PropertyListing)
        .leftJoin(PropertyImages,eq(PropertyListing.id,PropertyImages.propertyListingId))
        .where(eq(PropertyListing.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(PropertyListing.id))

        const resp=Service.FormatResult(result);
        console.log(resp);
        setPropertyList(resp);
    }

    const handleDeleteProperty = async () => {
        if (!selectedProperty) return;
        
        try {
            console.log('URL:', import.meta.env.VITE_SUPABASE_PROJECT_URL);
            console.log('Key:', import.meta.env.VITE_SUPABASE_KEY);

            const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
            const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

            if (!supabaseUrl || !supabaseKey) {
                throw new Error('Supabase credentials are missing');
            }

        const supabase = createClient(supabaseUrl, supabaseKey)
            
            await supabase
                .storage
                .from('property-images')
                .remove([`property-${selectedProperty.id}/*`])

            await db.delete(PropertyImages)
                .where(eq(PropertyImages.propertyListingId, selectedProperty.id))

            await db.delete(PropertyListing)
                .where(eq(PropertyListing.id, selectedProperty.id))

            await GetUserPropertyListing()
            
            setShowDeleteDialog(false)
            setSelectedProperty(null)
        } catch (error) {
            console.error('Error deleting property:', error)
            alert('Failed to delete property. Please try again.')
        }
    }

  return (
    <div className='mt-2'>
        <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-bold'>My Listings</h2>
                <Link to={'/add-listing'}>
                    <Button>Add New Listing</Button>
                </Link>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5'>
                {propertyList.map((item,index)=>(
                    <div key={index}>
                        <PropertyItem property={item}/>
                        <div className='p-2 bg-gray-50 flex justify-between items-center gap-1'>
                            <Link to={`/add-listing?mode=edit&id=${item?.id}`} className='w-full'>
                            <Button variant={'outline'} className='w-full'>Edit</Button>
                            </Link>
                            <Button 
                                variant={'destructive'} 
                                onClick={() => {
                                    setSelectedProperty(item)
                                    setShowDeleteDialog(true)
                                }}
                            >
                                <FaTrashAlt />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <DeleteConfirmDialog 
                showDialog={showDeleteDialog}
                setShowDialog={setShowDeleteDialog}
                onDelete={handleDeleteProperty}
            />

    </div>
  )
}

export default MyListing