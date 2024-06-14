import jwt from 'jsonwebtoken';
const secret = process.env.secret!;
export const generateToken = (payload: any) => jwt.sign(payload, secret);
export const verifyToken = (token: string) => jwt.verify(token, secret);
