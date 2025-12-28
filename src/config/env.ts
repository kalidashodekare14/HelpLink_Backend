import dotenv from 'dotenv';
dotenv.config();

type envTypes = {
    port: number,
    db_url: string,
    frontend_url: string,
    backend_url: string,
    jwt_secret: string,
    cloud_name: string,
    cloudinary_api_key: string,
    cloudinary_api_secret: string,
    // bKash Info
    bkash_username: string,
    bkash_password: string,
    bkash_api_key: string,
    bkash_secret_key: string,
    bkash_grant_token_url: string,
    bkash_create_payment_url: string,
    bkash_execute_payment_url: string,
    bkash_refund_transaction_url: string,
    // SSLCommerz Info
    ssl_commerz_store_id: string,
    ssl_commerz_store_password: string,
    gemini_api_key: string,
    // Open Weather Api
    open_weather_api: string,
}


export const config: envTypes = {
    port: Number(process.env.PORT) || 5000,
    db_url: process.env.DB_URL || "",
    frontend_url: process.env.FRONTEND_URL || "",
    backend_url: process.env.BACKEND_URL || "",
    jwt_secret: process.env.JWT_SECRET || "",
    cloud_name: process.env.CLOUDINARY_NAME || "",
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY || "",
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || "",
    // bKash Info
    bkash_username: process.env.bKASH_USERNAME || "",
    bkash_password: process.env.bKASH_PASSWORD || "",
    bkash_api_key: process.env.bKASH_API_KEY || "",
    bkash_secret_key: process.env.bKASH_SECRET_KEY || "",
    bkash_grant_token_url: process.env.bKASH_GRANT_TOKEN_URL || "",
    bkash_create_payment_url: process.env.bKASH_CREATE_PAYMENT_URL || "",
    bkash_execute_payment_url: process.env.bkASH_EXECUTE_PAYMENT_URL || "",
    bkash_refund_transaction_url: process.env.bKASH_REFUND_TRANSACTION_URL || "",
    // SSLCommerz Info
    ssl_commerz_store_id: process.env.SSL_COMMERZ_STORE_ID || "",
    ssl_commerz_store_password: process.env.SSL_COMMERZ_STORE_PASSWORD || "",
    // Gemini API Key
    gemini_api_key: process.env.GEMINI_API_KEY || "",
    // Open Weather Api
    open_weather_api: process.env.OPEN_WEATHER_API || "",
};