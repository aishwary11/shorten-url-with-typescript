import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../common/constant';
import responseHandler from '../common/utils/responsehelpers';

export default function logger(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err) return responseHandler(res, STATUS_CODES.INTERNAL_SERVER_ERROR, `Error: ${err.message}`);
  console.log('Method:', req.method, 'Url: ', req.url, 'body: ', req.body, 'Time:', new Intl.DateTimeFormat().format(new Date()));
  next();
}
