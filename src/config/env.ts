import dotenv from 'dotenv';
dotenv.config();

type envTypes = {
    port: number,
    db_url: string
    jwt_secret: string,
}


export const config: envTypes = {
    port: Number(process.env.PORT) || 5000,
    db_url: process.env.DB_URL || "",
    jwt_secret: process.env.JWT_SECRET || ""
}