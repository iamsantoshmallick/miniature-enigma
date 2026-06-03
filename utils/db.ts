import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


export const connectDb = async () => {
    try {
        const uri = process.env.MONGODB_URL;
        if (!uri) {
            console.error("FATAL ERROR: MONGODB_URI is not defined.");
            process.exit(1);
        }
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}