import mongoose, { Document, Model, Schema, model } from 'mongoose';

interface URL extends Document {
  urlCode: string;
  longUrl: string;
  shortUrl: string;
}

const URLSchema: Schema<URL> = new mongoose.Schema(
  {
    urlCode: {
      type: String,
      unique: true,
      required: true,
    },
    longUrl: {
      type: String,
      unique: true,
      required: true,
    },
    shortUrl: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);

const URLModel: Model<URL> = model<URL>('URL', URLSchema);
export default URLModel;
