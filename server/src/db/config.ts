import mongoose from "mongoose";

export async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI as string);
    if (connect) console.log('Connected to MongoDB');
    else console.error("Error while connect ", connect);
  } catch (error) {
    console.error("Error while connect ", error);
  }
}