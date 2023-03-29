import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        unique: true
    },
    longUrl: {
        type: String,
        unique: true
    },
    shortUrl: {
        type: String,
        unique: true
    },
}, { timestamps: true });

export default mongoose.model('URL', URLSchema);