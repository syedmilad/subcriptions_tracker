import mongoose from 'mongoose';
import {DB_URI} from "../config/env.js";

if (!DB_URI) {
    throw new Error("MongoDB URI doesn't exist");
}

export const connectToDatabase = async () => {
    try {
        console.log("DB URI==>",DB_URI);
        await mongoose.connect(DB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Error: ", error);
        process.exit(1);
    }
}