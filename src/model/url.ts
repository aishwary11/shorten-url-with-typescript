import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
}, { timestamps: true });

export default mongoose.model('URL', URLSchema);