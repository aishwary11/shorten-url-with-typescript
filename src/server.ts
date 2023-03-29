import 'dotenv/config';
import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import { getUrls, postUrl } from './controllers/urlController';

const app: Express = express();
(() => mongoose.connect(process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/urlshortener").then(() => console.log('Connected to Mongo DB')).catch((err) => console.error(`Error in Mongo DB ${err}`)))();
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('[url path] :: ', req.path);
    next();
});
app.use(express.json());
const port = process.env.PORT || 5000;
app.get('/', getUrls);
app.post('/shorten', postUrl);
app.listen(port, () => console.log(`Server Started at ${port}`));