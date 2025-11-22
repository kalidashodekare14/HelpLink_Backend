import mongoose from "mongoose";
import { config } from "./env";

export const connectdb = async () => {
    try {
        await mongoose.connect(config.db_url);
        console.log("MongoDB Connected 🔗");
    } catch (error) {
        console.log('Database connection failed ❌', error);
        process.exit(1);
    }
}