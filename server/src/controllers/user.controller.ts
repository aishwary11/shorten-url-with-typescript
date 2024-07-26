import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import asyncHandler from '../common/utils/asynchandler';
import responseHandler from '../common/utils/responsehelpers';
import { generateToken } from '../common/utils/token';
import User from '../model/User';

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ $or: [{ email: username }, { username }] });
    if (!user || !bcrypt.compareSync(password, user.password)) return responseHandler(res, 400, 'User not found or wrong password');
    const token = generateToken({ password, username, email: user.email });
    return responseHandler(res, 200, 'Login Successful', { token });
  } catch (error) {
    if (error instanceof Error) return responseHandler(res, 500, `Error :: ${error.message}`);
  }
});

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  try {
    await User.create({ email, password, username });
    return responseHandler(res, 200, 'Success');
  } catch (error: any | Error) {
    if (error.code === 11000) return responseHandler(res, 400, 'User already exists');
    return responseHandler(res, 500, `Error :: ${error.message}`);
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  await User.findOne({ email });
  return responseHandler(res, 200, 'Successful Logout');
});
