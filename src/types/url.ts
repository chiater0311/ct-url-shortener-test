export type ShortenUrlSuccessResponse = {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
};

export type ShortenUrlErrorResponse = {
  error: string;
};
