"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
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
//# sourceMappingURL=env.js.map