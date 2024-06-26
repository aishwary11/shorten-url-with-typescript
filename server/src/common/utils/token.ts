import jwt from 'jsonwebtoken';
import constant from '../constant';
const secret = constant.secret;
export const generateToken = (payload: any) => jwt.sign(payload, secret, { expiresIn: constant.expire, algorithm: 'PS256' });
export const verifyToken = (token: string) => jwt.verify(token, secret);
