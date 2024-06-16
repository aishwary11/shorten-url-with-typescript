import jwt from 'jsonwebtoken';
import constant from '../constant';
const secret = process.env.secret!;
export const generateToken = (payload: any) => jwt.sign(payload, secret, { expiresIn: constant.expire });
export const verifyToken = (token: string) => jwt.verify(token, secret);
