import React, { useState,useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { supabase } from './../../../configs/supabaseClient'
import { Button } from '@/components/ui/button'
import { db } from './../../../configs'
import { PropertyImages } from './../../../configs/schema'
import { eq } from 'drizzle-orm'

function UploadImages({triggerUploadImages,setLoader,propertyInfo,mode,navigate}) {
    const [selectedFileList, setSelectedFileList] = useState([]);
    const [EditPropertyImageList,setEditPropertyImageList]=useState([]);

    useEffect(()=>{
        if(mode=='edit')
        {
            setEditPropertyImageList([]);
            propertyInfo?.images?.forEach((image)=>{
                setEditPropertyImageList(prev=>[...prev,image?.imageUrl]);
            })
        }
    },[propertyInfo])

    useEffect(() => {
        if (triggerUploadImages) {
            if (selectedFileList.length > 0) {
                uploadImageToServer();
            } else if (mode === 'edit') {
                setLoader(false);
                navigate('/profile');
            }
        }
    }, [triggerUploadImages]);

    const onFileSelected = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setSelectedFileList((prev) => [...prev, file]);
        }
    }

    const onImageRemove = (image, index) => {
        const result = selectedFileList.filter((item) => item != image);
        setSelectedFileList(result);
    }

    const onImageRemoveFromDB=async(image,index)=>{
        const result=await db.delete(PropertyImages).where(eq(PropertyImages.id,propertyInfo?.images[index]?.id)).returning({id:PropertyImages.id});
        
        const imageList=EditPropertyImageList.filter((item)=>item!=image);
        setEditPropertyImageList(imageList);
    }

    const uploadImageToServer = async () => {
        setLoader(true);
        try {
            // Upload new images
            for (const file of selectedFileList) {
                const fileName = `${Date.now()}_${file.name}`;
                const { data, error } = await supabase.storage
                    .from('spacio')
                    .upload(fileName, file, {
                        contentType: file.type,
                        upsert: true
                    });

                if (error) {
                    console.error('Error uploading file:', error);
                    continue;
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('spacio')
                    .getPublicUrl(fileName);
                
                await db.insert(PropertyImages).values({
                    imageUrl: publicUrl,
                    propertyListingId: triggerUploadImages
                });
            }

            setSelectedFileList([]);
            setLoader(false);
            if (mode === 'edit') {
                navigate('/profile');
            }

        } catch (error) {
            console.error('Upload error:', error);
            setLoader(false);
        }
    }

    return (
        <div>
            <h2 className='text-lg font-semibold my-3'>Upload Images</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>

                {mode=='edit'&&
                EditPropertyImageList.map((image, index) => (
                    <div key={index} className='relative'>
                        <IoCloseCircleSharp 
                            className='absolute top-2 right-2 cursor-pointer'
                            onClick={() => onImageRemoveFromDB(image, index)}
                        />
                        <img 
                            src={image} 
                            alt={`Upload preview ${index + 1}`}
                            className='w-full h-[130px] object-cover rounded-lg'
                        />
                    </div>
                ))
               }
                
                {selectedFileList.map((image, index) => (
                    <div key={index} className='relative'>
                        <IoCloseCircleSharp 
                            className='absolute top-2 right-2 cursor-pointer'
                            onClick={() => onImageRemove(image, index)}
                        />
                        <img 
                            src={URL.createObjectURL(image)} 
                            alt={`Upload preview ${index + 1}`}
                            className='w-full h-[130px] object-cover rounded-lg'
                        />
                    </div>
                ))}
                <label htmlFor='upload-images'>
                    <div className='border rounded-xl border-dotted 
                    border-primary bg-slate-100 p-10 cursor-pointer hover:opacity-75'>
                        <h2 className='text-lg text-center'>+</h2>
                    </div>
                </label>
                <Input 
                    type='file' 
                    multiple={true} 
                    id='upload-images' 
                    onChange={onFileSelected} 
                    className='hidden'
                />
            </div>
        </div>
    )
}   

export default UploadImages