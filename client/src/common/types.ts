export type URL = {
    shortUrl: string,
    longUrl: string,
    urlCode: string,
    createdAt: Date;
};

export type HOST = {
    pathname: string,
    url: string;
};

export type Domain = ".com" | ".in";