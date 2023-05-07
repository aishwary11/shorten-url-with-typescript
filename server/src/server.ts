import cors from 'cors';
import 'dotenv/config';
import express, { Express, NextFunction, Request, Response } from "express";
import { getUrls, postUrl, reDirectUrl } from "./controllers/urlController";
import { connectDB } from './db/config';
import { errorResp } from './utils/helpers';
const app: Express = express();
connectDB();
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) return await errorResp(res, 500, `Error: ${err.message}`);
    next();
});
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
app.get('/', getUrls);
app.get('/:urlCode', reDirectUrl);
app.post('/shorten', postUrl);
app.listen(port, () => console.log(`Server Started at ${port}`));