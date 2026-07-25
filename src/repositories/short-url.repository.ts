import { prisma } from "@/lib/prisma";

export const shortUrlRepository = {
  findByOriginalUrl(originalUrl: string) {
    return prisma.shortUrl.findFirst({
      where: {
        originalUrl,
      },
    });
  },

  findByShortCode(shortCode: string) {
    return prisma.shortUrl.findUnique({
      where: {
        shortCode,
      },
    });
  },

  create(originalUrl: string, shortCode: string) {
    return prisma.shortUrl.create({
      data: {
        originalUrl,
        shortCode,
      },
    });
  },
};
