import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../common/constant';
import ErrorHandler from '../common/utils/errorhandler';
import responseHandler from '../common/utils/responsehelpers';

export default function error(err: ErrorHandler, req: Request, res: Response, next: NextFunction) {
  err.message ||= 'Internal Server Error';
  err.statusCode ||= STATUS_CODES.INTERNAL_SERVER_ERROR;
  return responseHandler(res, err.statusCode, err.message);
}
