import { type Response } from 'express';

export default function responseHandler(res: Response, statusCode: number = 200, msg: string = '', data?: any) {
  return res.status(statusCode).json({ msg, data, status: statusCode < 400 });
}

