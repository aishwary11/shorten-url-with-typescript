import { Request, Response } from "express";
import shortid from "shortid";
import validUrl from "valid-url";
import URL from "../model/Url";
import asyncHandler from "../utils/asynchandler";
import responseHandler from "../utils/responsehelpers";

export const postUrl = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { longUrl } = req.body;
        if (!validUrl.isUri(longUrl)) return responseHandler(res, 400, "Wrong url");
        const urlCode = shortid.generate();
        let url = await URL.findOne({ longUrl });
        if (!url) {
            let shortUrl = process.env.BASE_URL + urlCode;
            await new URL({ longUrl, shortUrl, urlCode }).save();
            return responseHandler(res, 200, "Correct Url", longUrl);
        } else return responseHandler(res, 200, "Already saved", url);
    } catch (err) {
        console.error('Error :: ', err);
        return responseHandler(res, 500, `Error :: ${err}`);
    }
});
export const formUrl = asyncHandler(async (req: Request, res: Response) => {
    try {
        return responseHandler(res, 200, "Success", req.body);
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
        return responseHandler(res, 400, "Something went wrong");
    } catch (error) {
        return responseHandler(res, 500, "Something went wrong");
    }
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { urlCode } = req.params;
        const deletePst = await URL.deleteOne({ urlCode });
        if (deletePst) return responseHandler(res, 200, "Post delete");
        return responseHandler(res, 400, "Something went wrong");
    } catch (error) {
        return responseHandler(res, 500, "Something went wrong");
    }
});

export const getUrls = asyncHandler(async (req: Request, res: Response) => {
    try {
        const urls = await URL.find().sort({ createdAt: -1 });
        if (!urls.length) return responseHandler(res, 200, "No URL found");
        return responseHandler(res, 200, "URL found", urls);
    } catch (error) {
        return responseHandler(res, 500, "Something went wrong");
    }
});
