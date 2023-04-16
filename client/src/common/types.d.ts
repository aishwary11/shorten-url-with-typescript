type Url = {
    shortUrl: string;
    longUrl: string;
    urlCode: string;
    createdAt: Date;
};

type Host = {
    pathname: string;
    url: string;
};

type Domain = ".com" | ".in";