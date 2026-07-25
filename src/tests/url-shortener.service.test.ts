import { afterEach, describe, expect, it, jest } from "@jest/globals";

import { shortUrlRepository } from "@/repositories/short-url.repository";
import { urlShortenerService } from "@/services/url-shortener.service";

const existingRecord = {
  id: 1,
  shortCode: "abc1234",
  originalUrl: "https://www.google.com/",
  createdAt: new Date("2026-07-25T00:00:00.000Z"),
  updatedAt: new Date("2026-07-25T00:00:00.000Z"),
};

describe("urlShortenerService", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("shorten", () => {
    it("returns an existing record without creating a duplicate", async () => {
      const findByOriginalUrlSpy = jest
        .spyOn(shortUrlRepository, "findByOriginalUrl")
        .mockResolvedValue(existingRecord);

      const findByShortCodeSpy = jest.spyOn(
        shortUrlRepository,
        "findByShortCode",
      );

      const createSpy = jest.spyOn(shortUrlRepository, "create");

      const result = await urlShortenerService.shorten("www.google.com");

      expect(findByOriginalUrlSpy).toHaveBeenCalledWith(
        "https://www.google.com/",
      );

      expect(findByShortCodeSpy).not.toHaveBeenCalled();
      expect(createSpy).not.toHaveBeenCalled();

      expect(result).toEqual({
        record: existingRecord,
        created: false,
      });
    });

    it("creates a shortened URL when the original URL does not exist", async () => {
      const createdRecord = {
        id: 2,
        shortCode: "new1234",
        originalUrl: "https://example.com/",
        createdAt: new Date("2026-07-25T01:00:00.000Z"),
        updatedAt: new Date("2026-07-25T01:00:00.000Z"),
      };

      const findByOriginalUrlSpy = jest
        .spyOn(shortUrlRepository, "findByOriginalUrl")
        .mockResolvedValue(null);

      const findByShortCodeSpy = jest
        .spyOn(shortUrlRepository, "findByShortCode")
        .mockResolvedValue(null);

      const createSpy = jest
        .spyOn(shortUrlRepository, "create")
        .mockResolvedValue(createdRecord);

      const result = await urlShortenerService.shorten("example.com");

      expect(findByOriginalUrlSpy).toHaveBeenCalledWith("https://example.com/");

      expect(findByShortCodeSpy).toHaveBeenCalledTimes(1);

      expect(createSpy).toHaveBeenCalledTimes(1);

      expect(createSpy).toHaveBeenCalledWith(
        "https://example.com/",
        expect.stringMatching(/^[a-zA-Z0-9]{7}$/),
      );

      expect(result).toEqual({
        record: createdRecord,
        created: true,
      });
    });
  });
});
