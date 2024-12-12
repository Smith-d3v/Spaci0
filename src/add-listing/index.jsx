import React, { useEffect } from 'react'
import Header from '../components/Header'
import propertyDescription from '../Shared/propertyDescription.json'
import InputField from './components/InputField'
import Dropdownfield from './components/Dropdownfield'
import CalendarField from './components/CalendarField'
import TextAreaField from './components/TextAreaField'
import { Separator } from '@/components/ui/separator'
import amenities from '../Shared/amenities.json'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { db } from './../../configs'
import { PropertyListing,PropertyImages } from './../../configs/schema'
import IconField from './components/IconField'
import UploadImages from './components/UploadImages'
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from 'sonner';
import { useNavigate,useSearchParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { eq } from 'drizzle-orm'
import Service from '@/Shared/service'
import MultiSelectField from './components/MultiSelectField';

function AddListing() {

    const [formData,setFormData]=useState([]);
    const [amenitiesData,setAmenitiesData]=useState([]);
    const [triggerUploadImages,setTriggerUploadImages]=useState();
    const [searchParams]=useSearchParams();
    const [loader,setLoader]=useState(false);
    const [propertyInfo,setPropertyInfo]=useState([]);
    const navigate=useNavigate();
    const {user}=useUser();

    const mode=searchParams.get('mode');
    const recordId=searchParams.get('id');

    useEffect(()=>{
        if(mode=='edit')
        {
            GetListingDetail();
        }
    },[])   

    const GetListingDetail=async()=>{
        const result=await db.select().from(PropertyListing)
        .where(eq(PropertyListing.id,recordId))
        .innerJoin(PropertyImages,eq(PropertyListing.id,PropertyImages.propertyListingId))

        const resp=Service.FormatResult(result);
        setPropertyInfo(resp[0]);
        setAmenitiesData(resp[0].amenities);
        setFormData(resp[0]);
    }

    /**
     * Used to capture user input from Form Data
     * @param {*} name 
     * @param {*} value 
     */

    const handleInputChange=(name,value)=>{
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))

        console.log(formData);
    }

    /**
     * Used to save the Amenities List
     * @param {*} name 
     * @param {*} value 
     */
    const handleAmenitiesChange=(name,value)=>{
        setAmenitiesData((prevData)=>({
            ...prevData,
            [name]:value
        }))

        console.log(amenitiesData);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        
        // Add validation for all required fields
        const requiredFields = [
            { name: 'listingTitle', label: 'Listing Title' },
            { name: 'category', label: 'Category' },
            { name: 'location', label: 'Location' },
            { name: 'condition', label: 'Condition' },
            { name: 'offerType', label: 'Offer Type' },
            { name: 'price', label: 'Price' },
            { name: 'listingDescription', label: 'Listing Description' }
        ];

        for (const field of requiredFields) {
            if (!formData[field.name]) {
                toast.error(`Please provide ${field.label}`);
                return;
            }
        }
        
        setLoader(true);
        toast('Please Wait...')
        
        if(mode=='edit') {
            const result = await db.update(PropertyListing).set({
                ...formData,
                amenities: amenitiesData,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
                userImageUrl: user?.imageUrl,
                postedOn: new Date().toISOString()
            }).where(eq(PropertyListing.id,recordId)).returning({id:PropertyListing.id});
            
            setTriggerUploadImages(result[0]?.id);
        } else {
            try {
                const result = await db.insert(PropertyListing).values({
                    ...formData,
                    amenities: amenitiesData,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    userName: user?.fullName,
                    userImageUrl: user?.imageUrl,
                    postedOn: new Date().toISOString()
                }).returning({id: PropertyListing.id});
                
                if(result) {
                    console.log("Data Saved");
                    setTriggerUploadImages(result[0]?.id);
                    setTimeout(() => {
                        setLoader(false);
                        navigate('/profile');
                    }, 2000);
                }
            } catch(e) {
                toast.error('Error saving listing: ' + e.message);
                setLoader(false);
                console.log("Error", e);
            }
        }
    }

  return (
    <div>
        <Header/>
        <div className='px-10 md:px-20 my-10'>
            <h2 className='text-4xl font-bold'>Add New Listing</h2>
            <form className='p-10 border rounded-xl mt-10'>
                {/*Property Description*/}
                <div>
                    <h2 className='text-xl font-medium mb-6'>Property Description</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                        {propertyDescription.propertyDescription.map((item,index)=>(
                            <div key={index}>
                                <label className='text-sm font-medium flex items-center gap-2 mb-1'>
                                    <IconField icon={item.icon}/>
                                    {item?.label} {item?.required && <span className='text-red-500'>*</span>}</label>
                                {item.fieldType === 'text' || item.fieldType === 'number'
                                ? <InputField item={item} handleInputChange={handleInputChange} propertyInfo={propertyInfo}/>
                                : item.fieldType === 'dropdown'
                                ? <Dropdownfield item={item} handleInputChange={handleInputChange} propertyInfo={propertyInfo}/>
                                : item.fieldType === 'date'
                                ? <CalendarField item={item} handleInputChange={handleInputChange} propertyInfo={propertyInfo}/>
                                : item.fieldType === 'textarea'
                                ? <TextAreaField item={item} handleInputChange={handleInputChange} propertyInfo={propertyInfo}/>
                                : item.fieldType === 'multiselect'
                                ? <MultiSelectField item={item} handleInputChange={handleInputChange} propertyInfo={propertyInfo}/>
                                : null}
                            </div>
                        ))}
                    </div>
                </div>
                <Separator className='my-6'/>
                {/*Amenities*/}
                <div>
                    <h2 className='text-xl font-medium mb-6'>Amenities</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                        {amenities.amenities.map((item,index)=>(
                            <div key={index} className='flex items-center gap-2'>
                                <Checkbox onCheckedChange={(value)=>handleAmenitiesChange(item.name,value)}
                                    checked={amenitiesData?.[item.name]}/>
                                <label>{item.label}</label>
                            </div>  
                        ))}
                    </div>
                </div>
                {/*Images*/}
                <Separator className='my-6'/>
                <UploadImages 
                    triggerUploadImages={triggerUploadImages}
                    propertyInfo={propertyInfo}
                    mode={mode}
                    navigate={navigate}
                    setLoader={(v)=>{setLoader(v)}}
                />
                <div className='flex justify-end'>
                    <Button type='submit'
                    disabled={loader}
                    onClick={(e)=>onSubmit(e)}>
                        {loader?<BiLoaderAlt  className='animate-spin text-lg'/>:'Submit'}
                        </Button>

                </div>
            </form>
        </div>
    </div>
  )
}

export default AddListing