import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import shortid from 'shortid';
import validUrl from 'valid-url';
import asyncHandler from '../common/utils/asynchandler';
import responseHandler from '../common/utils/responsehelpers';
import { generateToken } from '../common/utils/token';
import URL from '../model/Url';
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

export const postUrl = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { longUrl } = req.body;
    if (!validUrl.isUri(longUrl)) return responseHandler(res, 400, 'Wrong url');
    const urlCode = shortid.generate();
    let shortUrl = process.env.BASE_URL + urlCode;
    await URL.create({ longUrl, shortUrl, urlCode });
    return responseHandler(res, 200, 'Correct Url', longUrl);
  } catch (error: any | Error) {
    if (error.code === 11000) return responseHandler(res, 400, 'Url already exists');
    return responseHandler(res, 500, `Error :: ${error.message}`);
  }
});

export const formUrl = asyncHandler(async (req: Request, res: Response) => {
  try {
    return responseHandler(res, 200, 'Success', req.body);
  } catch (err) {
    if (err instanceof Error) {
      return responseHandler(res, 500, `Error :: ${err.message}`);
    }
    return responseHandler(res, 500, `Error :: ${err}`);
  }
});

export const reDirectUrl = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { urlCode } = req.params;
    const redirectUrl = await URL.findOne({ urlCode });
    if (redirectUrl) return res.redirect(redirectUrl.longUrl as string);
    return responseHandler(res, 400, 'Something went wrong');
  } catch (error) {
    return responseHandler(res, 500, 'Something went wrong');
  }
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { urlCode } = req.params;
    const deletePst = await URL.deleteOne({ urlCode });
    if (deletePst) return responseHandler(res, 200, 'Post delete');
    return responseHandler(res, 400, 'Something went wrong');
  } catch (error) {
    return responseHandler(res, 500, 'Something went wrong');
  }
});

export const getUrls = asyncHandler(async (req: Request, res: Response) => {
  try {
    const urls = await URL.find().sort({ createdAt: -1 });
    if (!urls.length) return responseHandler(res, 200, 'No URL found');
    return responseHandler(res, 200, 'URL found', urls);
  } catch (error) {
    return responseHandler(res, 500, 'Something went wrong');
  }
});
