import { Button } from '@/components/ui/button'
import React from 'react'
import Service from '../../Shared/service'; 
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function ContactAgent({propertyDetail}) {
  
  const {user}=useUser();

  const navigation=useNavigate();

  const onContactAgentButtonClick = async () => {
    const userId=user.primaryEmailAddress.emailAddress.split('@')[0];
    const agentUserId=propertyDetail?.createdBy.split('@')[0];

    // Create Current User ID
      try{
        await Service.CreateSendBirdUser(userId,user?.fullName,user?.imageUrl)
        .then(resp=>{
          console.log(resp);
        })
      }catch(e){}

    // Agent User ID
      try{
        await Service.CreateSendBirdUser(agentUserId,propertyDetail?.userName,propertyDetail?.userImageUrl)
        .then(resp=>{
          console.log(resp);
        })
      }catch(e){}

    // Create Channel
      try{
        await Service.CreateSendBirdChannel([userId,agentUserId],propertyDetail?.listingTitle)
        .then(resp=>{
          console.log(resp);
          console.log("Channel Created Successfully");
          navigation('/profile');
        })
      }catch(e){}
  }

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
        <h2 className='text-2xl font-medium mb-3'>Contact Agent</h2>
        <img src={propertyDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full'/>
        <h2 className='mt-2 font-bold text-xl'>{propertyDetail?.userName}</h2>
        <h2 className='text-sm text-gray-500'>{propertyDetail?.createdBy}</h2>

        <Button className='w-full mt-5'
        onClick={onContactAgentButtonClick}
        >Contact Agent
        </Button>
    </div>
  )
}

export default ContactAgent