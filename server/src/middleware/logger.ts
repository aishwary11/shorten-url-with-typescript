import { NextFunction, Request, Response } from 'express';
import responseHandler from '../common/utils/responsehelpers';

export default function logger(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err) return responseHandler(res, 500, `Error: ${err.message}`);
  console.log('Url: ', req.url);
  next();
}
