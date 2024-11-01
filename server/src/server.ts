import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import helmet from 'helmet';
import notFound from './common/utils/notfound';
import connectDB from './db/config';
import errorMiddleware from './middleware/error';
import isAuthenticated from './middleware/isauthenticated';
import logger from './middleware/logger';
import urlRouter from './routes/url.route';
import userRouter from './routes/user.route';
const app: Express = express();
const port = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/user', userRouter);
app.use(isAuthenticated);
app.use('/url', urlRouter);
app.use(errorMiddleware);
app.use('*', notFound);
app.listen(port, () => console.log(`Server Started at ${port}`));
