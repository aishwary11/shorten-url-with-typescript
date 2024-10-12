import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../common/utils/asynchandler';

const logger = asyncHandler(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) return next(err);
  console.log('Method:', req.method, 'Url: ', req.url, 'body: ', req.body, 'Time:', new Intl.DateTimeFormat().format(new Date()));
  next();
});

export default logger;
