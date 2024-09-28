import type { Response } from 'express';
import { STATUS_CODES } from '../constant';

const responseHandler = (res: Response, statusCode: number = 200, msg: string | null = null, data?: any) => res.status(statusCode).json({ msg, data, status: statusCode < STATUS_CODES.BAD_REQUEST });

export default responseHandler;
