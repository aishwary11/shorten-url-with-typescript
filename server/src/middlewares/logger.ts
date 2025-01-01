import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../common/utils/asynchandler';

const logger = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log('Method:', req.method, 'Url: ', req.url, 'params: ' + JSON.stringify(req.params), 'body: ', req.body, 'Time:', new Intl.DateTimeFormat().format(new Date()));
  next();
});

export default logger;
