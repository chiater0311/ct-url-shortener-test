import { generateShortCode } from "@/lib/short-code";
import { normalizeUrl } from "@/lib/url";
import { shortUrlRepository } from "@/repositories/short-url.repository";

const MAX_CODE_GENERATION_ATTEMPTS = 5;

export const urlShortenerService = {
  async shorten(input: string) {
    const originalUrl = normalizeUrl(input);

    const existingRecord =
      await shortUrlRepository.findByOriginalUrl(originalUrl);

    if (existingRecord) {
      return {
        record: existingRecord,
        created: false,
      };
    }

    for (
      let attempt = 0;
      attempt < MAX_CODE_GENERATION_ATTEMPTS;
      attempt += 1
    ) {
      const shortCode = generateShortCode();

      const existingCode = await shortUrlRepository.findByShortCode(shortCode);

      if (!existingCode) {
        const record = await shortUrlRepository.create(originalUrl, shortCode);

        return {
          record,
          created: true,
        };
      }
    }

    throw new Error("Unable to generate a unique short code.");
  },

  findByShortCode(shortCode: string) {
    return shortUrlRepository.findByShortCode(shortCode);
  },
};
