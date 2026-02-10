import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// MongoDB connection
export const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/helpme-car';
export const PORT = process.env.PORT || 5000;

export const connectDB = async () => {
  try {
    console.log("Using Mongo URI:", mongoURI)
    await mongoose.connect(mongoURI);
    console.log("💚 MongoDB connected");
  }
   catch (err) {
    console.error("❌ MongoDB connection error", err);
    process.exit(1);
   }
};