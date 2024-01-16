import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRIT
});

const uploadCLOUDINARY = async (localFilepath) => {
    try {
        if (!localFilepath) return null
        console.log("before cloudinady",localFilepath)
        console.log("Uploading to Cloudinary:", localFilepath);
        const response = await cloudinary.uploader.upload(localFilepath, {secure: true , resource_type: "auto" })
        console.log("Cloudinary Upload Result:", result);
        fs.unlinkSync(localFilepath)
        console.log("after cluodinary", response.secure_url)
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error.message);
        fs.unlinkSync(localFilepath)
        return null

    }

}

export {uploadCLOUDINARY}