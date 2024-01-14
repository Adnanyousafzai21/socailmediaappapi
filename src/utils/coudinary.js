import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.COUDINARY_API_KEY,
    api_secret: process.env.COUDINARY_API_SECRIT
});

const uploadCoudinary = async (localFilepath) => {
    try {
        if (!localFilepath) return null
        console.log("bere cloudinady",localFilepath)
        const response = await cloudinary.uploader.upload(localFilepath, { resource_type: "auto" })
        fs.unlinkSync(localFilepath)
        console.log("after cluodinary", response.url)
        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        fs.unlinkSync(localFilepath)
        return null

    }

}

export {uploadCoudinary}