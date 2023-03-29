import cors from 'cors';
import 'dotenv/config';
import express, { Express } from "express";
import mongoose from 'mongoose';
import { getUrls, postUrl, redirectUrl } from "./controllers/urlController";

const app: Express = express();
(() => mongoose.connect(process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/urlshortener").then(() => console.log('Connected to Mongo DB')).catch((err) => console.error(`Error in Mongo DB ${err}`)))();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
app.get('/', getUrls);
app.get('/:urlCode', redirectUrl);
app.post('/shorten', postUrl);
app.listen(port, () => console.log(`Server Started at ${port}`));