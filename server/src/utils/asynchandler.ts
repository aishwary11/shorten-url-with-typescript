import { NextFunction, Request, Response } from 'express';

const asyncHandler = (handler: Function) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(handler(req, res, next)).catch(next);

export default asyncHandler;
