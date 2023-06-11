import { Request, Response } from "express";
import shortid from "shortid";
import validUrl from "valid-url";
import URL from "../model/Url";
import { errorResp, successResp } from "../utils/helpers";

export const postUrl = async (req: Request, res: Response) => {
    try {
        const { longUrl } = req.body;
        if (!validUrl.isUri(longUrl)) return await errorResp(res, 400, "Wrong url");
        const urlCode = shortid.generate();
        let url = await URL.findOne({ longUrl });
        if (!url) {
            let shortUrl = process.env.BASE_URL + urlCode;
            await new URL({ longUrl, shortUrl, urlCode }).save();
            return successResp(res, 200, "Correct Url", longUrl);
        } else return successResp(res, 200, "Already saved", url);
    } catch (err) {
        console.error('Error :: ', err);
        return errorResp(res, 500, `Error :: ${err}`);
    }
};
export const formUrl = async (req: Request, res: Response) => {
    try {
        return await successResp(res, 200, "Success", req.body);
    } catch (err) {
        if (err instanceof Error) {
            return errorResp(res, 500, `Error :: ${err.message}`);
        }
        return errorResp(res, 500, `Error :: ${err}`);
    }
};

export const reDirectUrl = async (req: Request, res: Response) => {
    try {
        const { urlCode } = req.params;
        const redirectUrl = await URL.findOne({ urlCode });
        if (redirectUrl) return res.redirect(redirectUrl.longUrl as string);
        return await errorResp(res, 400, "Something went wrong");
    } catch (error) {
        return await errorResp(res, 500, "Something went wrong");
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { urlCode } = req.params;
        const deletePst = await URL.deleteOne({ urlCode });
        if (deletePst) return successResp(res, 200, "Post delete");
        return await errorResp(res, 400, "Something went wrong");
    } catch (error) {
        return await errorResp(res, 500, "Something went wrong");
    }
};

export const getUrls = async (req: Request, res: Response) => {
    try {
        const urls = await URL.find().sort({ createdAt: -1 });
        if (!urls.length) return successResp(res, 200, "No URL found");
        return await successResp(res, 200, "URL found", urls);
    } catch (error) {
        return await errorResp(res, 500, "Something went wrong");
    }
};
