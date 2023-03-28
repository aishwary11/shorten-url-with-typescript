import { Request, Response } from "express";
import validUrl from "valid-url";

export const urlShortener = async (req: Request, res: Response) => {
    const { longUrl } = req.body;
    if (!validUrl.isUri(longUrl)) return res.status(400).json({ msg: "Wrong url" });
    else return res.status(200).json({ msg: "Correct Url", url: longUrl });
};