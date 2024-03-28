import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: 'dg3wucxbm', 
  api_key: '649889216182232', 
  api_secret: 'h9Wb5ZvNHbEfxSEuz21XC7pNQW8' 
});

const uploadOnCloudinary=async(localFilePath)=>
{
    try {
        if(!localFilePath)return null
        
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });

        fs.unlinkSync(localFilePath);
        // console.log(response);
        return response;
    } catch (error) {
        // console.log(error);
        fs.unlinkSync(localFilePath);  //remove the locally saved temporary file as the upload operation got failed
    }
}

export {uploadOnCloudinary}