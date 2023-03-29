import { Request, Response } from "express";
import shortid from "shortid";
import validUrl from "valid-url";
import URL from "../model/Url";

export const postUrl = async (req: Request, res: Response) => {
    try {
        const { longUrl } = req.body;
        if (!validUrl.isUri(longUrl)) return res.status(400).json({ msg: "Wrong url" });
        const urlCode = shortid.generate();
        let url = await URL.findOne({ longUrl });
        if (!url) {
            let shortUrl = process.env.BASE_URL + urlCode;
            await new URL({ longUrl, shortUrl, urlCode }).save();
            return res.status(200).json({ msg: "Correct Url", url: longUrl });
        } else return res.status(200).json({ msg: "Already saved", url });
    } catch (err) {
        console.error('Error :: ', err);
        return res.status(500).json({ msg: `Error :: ${err}` });
    }
};

export const reDirectUrl = async (req: Request, res: Response) => {
    const { urlCode } = req.params;
    const redirectUrl = await URL.findOne({ urlCode });
    if (redirectUrl) return res.redirect(redirectUrl.longUrl as string);
    return res.status(500).json({ msg: "Something wrong" });
};

export const getUrls = async (req: Request, res: Response) => {
    const urls = await URL.find().sort({ createdAt: -1 });
    if (!urls.length) return res.status(200).json({ msg: "No URL found" });
    return res.status(200).json({ msg: "URL found", urls });
};
