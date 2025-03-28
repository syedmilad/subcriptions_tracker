import mongoose from 'mongoose';
import {DB_URI} from "../config/env.js";

if (!DB_URI) {
    throw new Error("MongoDB URI doesn't exist");
}

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB Connected");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}