import dotenv from 'dotenv';
dotenv.config();

type envTypes = {
    port: number,
    db_url: string
    jwt_secret: string,
    cloud_name: string
    cloudinary_api_key: string,
    cloudinary_api_secret: string
}


export const config: envTypes = {
    port: Number(process.env.PORT) || 5000,
    db_url: process.env.DB_URL || "",
    jwt_secret: process.env.JWT_SECRET || "",
    cloud_name: process.env.CLOUDINARY_NAME || "",
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY || "",
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || ""
}