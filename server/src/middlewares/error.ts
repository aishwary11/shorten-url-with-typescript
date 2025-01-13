import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../common/constant';
import responseHandler from '../common/utils/responsehelpers';
import type { ErrorHandler } from '../types';

const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${err.message || 'Internal Server Error'}`);
  err.message = err.message || 'Internal Server Error';
  err.statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  responseHandler(res, err.statusCode, err.message);
};

export default errorMiddleware;