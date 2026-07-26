export type ShortenUrlSuccessResponse = {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
};

export type ShortenUrlErrorResponse = {
  error: string;
};

export type UrlHistoryItem = ShortenUrlSuccessResponse & {
  createdAt: string;
};
