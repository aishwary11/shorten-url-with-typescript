import { Request, Response } from "express";
import shortid from "shortid";
import validUrl from "valid-url";
import URL from "../model/Url";
import { errorResp, redirectResp, successResp } from "../utils/helpers";

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

export const reDirectUrl = async (req: Request, res: Response) => {
    const { urlCode } = req.params;
    const redirectUrl = await URL.findOne({ urlCode });
    if (redirectUrl) return redirectResp(res, redirectUrl.longUrl as string);
    return await errorResp(res, 500, "Something went wrong");
};

export const getUrls = async (req: Request, res: Response) => {
    const urls = await URL.find().sort({ createdAt: -1 });
    if (!urls.length) return successResp(res, 200, "No URL found");
    return await successResp(res, 200, "URL found", urls);
};
