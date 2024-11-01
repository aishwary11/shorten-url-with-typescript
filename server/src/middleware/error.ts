import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../common/constant';
import responseHandler from '../common/utils/responsehelpers';

type ErrorHandler = Error & {
  statusCode?: number;
};

const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  err.message ||= 'Internal Server Error';
  err.statusCode ||= STATUS_CODES.INTERNAL_SERVER_ERROR;
  responseHandler(res, err.statusCode, err.message);
};
export default errorMiddleware;
