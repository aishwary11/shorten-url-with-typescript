import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../common/constant';
import asyncHandler from '../common/utils/asynchandler';
import ErrorHandler from '../common/utils/errorhandler';
import responseHandler from '../common/utils/responsehelpers';

const errorMiddleware = asyncHandler(async (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  err.message ||= 'Internal Server Error';
  err.statusCode ||= STATUS_CODES.INTERNAL_SERVER_ERROR;
  return responseHandler(res, err.statusCode, err.message);
});
export default errorMiddleware;
