import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
}, { timestamps: true });

const urlModel = mongoose.model('URL', URLSchema);
export default urlModel;