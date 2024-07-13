import cors from 'cors';
import 'dotenv/config';
import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import responseHandler from './common/utils/responsehelpers';
import connectDB from './db/config';
import isAuthenticated from './middleware/isauthenticated';
import urlRouter from './routes/url.route';
import userRouter from './routes/user.route';
const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(helmet());
app.use(express.json());
connectDB();
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) return responseHandler(res, 500, `Error: ${err.message}`);
  console.log('Url: ', req.url);
  next();
});

app.use('/user', userRouter);
app.use(isAuthenticated);
app.use('/url', urlRouter);
// app.post('/form', validateForm, formUrl);
app.listen(port, () => console.log(`Server Started at ${port}`));
