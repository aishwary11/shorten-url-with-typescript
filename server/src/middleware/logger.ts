import { NextFunction, Request, Response } from 'express';

export default function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Method:', req.method, 'Url: ', req.url, 'body: ', req.body, 'Time:', new Intl.DateTimeFormat().format(new Date()));
  next();
}
