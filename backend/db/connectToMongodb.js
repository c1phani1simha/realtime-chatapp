import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();


const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    console.log("Error connecting to MongoDB");
  }
}

export default connectToMongoDB;