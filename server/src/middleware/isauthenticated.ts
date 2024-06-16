import { NextFunction, Request, Response } from 'express';
import responseHandler from '../common/utils/responsehelpers';
import { verifyToken } from '../common/utils/token';

type AuthenticatedRequest = Request & {
  user?: any;
};
export const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return responseHandler(res, 401, 'Access Denied!');
  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return responseHandler(res, 401, 'Access Denied!');
  }
};
export default isAuthenticated;
