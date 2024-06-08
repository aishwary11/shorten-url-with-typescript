import { type Response } from "express";

export const responseHandler = (res: Response, statusCode: number = 200, msg: string = '', data?: any) => res.status(statusCode).json({ msg, data, status: statusCode < 400 });

export default responseHandler;
