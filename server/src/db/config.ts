import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI!);
    if (connect) console.log('Connected to MongoDB');
    else console.error("Error while connect", connect);
  } catch (error) {
    setTimeout(connectDB, 10000);
    console.error("Error while connect", error);
  }
};