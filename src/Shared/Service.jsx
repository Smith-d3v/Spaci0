import axios from 'axios';

const SendBirdApplicationId=import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken=import.meta.env.VITE_SENDBIRD_API_TOKEN;

const FormatResult = (resp) => {
    // Add debugging
    console.log('Raw response before formatting:', resp);
    
    const resultMap = new Map();

    resp.forEach((item) => {
        const listingId = item.propertyListing?.id;
        
        if (!resultMap.has(listingId)) {
            resultMap.set(listingId, {
                property: item.propertyListing,
                images: []
            });
        }

        // Make sure we're not skipping any images
        if (item.propertyimages) {
            resultMap.get(listingId).images.push(item.propertyimages);
        }
    });

    // Convert Map to array and log the result
    const result = Array.from(resultMap.values()).map(item => ({
        ...item.property,
        images: item.images
    }));
    
    console.log('Formatted result:', result);
    return result;
}

const CreateSendBirdUser=(userId,nickName,profileUrl)=>{
    
    return axios.post('https://api-'+SendBirdApplicationId+'.sendbird.com/v3/users',{
        user_id:userId,
        nickname:nickName,
        profile_url:profileUrl,
        issue_access_token:false
    },{
        headers:{
            'Content-Type':'application/json',
            'Api-Token':SendBirdApiToken
        }
    });
}

const CreateSendBirdChannel=(users,title)=>{
    return axios.post('https://api-'+SendBirdApplicationId+'.sendbird.com/v3/group_channels',{
        user_ids:users,
        is_distinct:true,
        name:title,
        operator_ids:[users[0]]

    },{
        headers:{
            'Content-Type':'application/json',
            'Api-Token':SendBirdApiToken
        }
    })
}

export default {
    FormatResult,
    CreateSendBirdUser,
    CreateSendBirdChannel
}