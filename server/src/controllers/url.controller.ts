import type { Request, Response } from 'express';
import shortid from 'shortid';
import validUrl from 'valid-url';
import asyncHandler from '../common/utils/asynchandler';
import responseHandler from '../common/utils/responsehelpers';
import URL from '../model/Url';

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
