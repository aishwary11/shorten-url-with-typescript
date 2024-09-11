import type { Response } from 'express';

const responseHandler = (res: Response, statusCode: number = 200, msg: string | null = null, data?: any) => res.status(statusCode).json({ msg, data, status: statusCode < 400 });

export default responseHandler;
