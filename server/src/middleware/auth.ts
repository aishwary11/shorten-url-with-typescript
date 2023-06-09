import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { errorResp } from "../utils/helpers";

type AuthenticatedRequest = Request & {
  user?: any;
};

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // const authHeader = req.headers.authorization;
  // const token = authHeader && authHeader.split(' ')[1];
  const { token, username, pwd } = req.body;
  if (token == null) return errorResp(res, 401, "Access Denied!");
  const isTokenVerified = verifyToken(token, process.env.secret as string);
  if (!isTokenVerified) return errorResp(res, 401, "Access Denied!");
  else {
    req.user = isTokenVerified;
    next();
  }
};


const verifyToken = (token: string, secret: string) => verify(token, secret);