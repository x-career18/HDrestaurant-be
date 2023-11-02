import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load biến môi trường từ tệp .env

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(MONGO_URI);
        console.log(`Đã kết nối tới ${connection.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}