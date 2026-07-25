import { notFound, redirect } from "next/navigation";

import { urlShortenerService } from "@/services/url-shortener.service";

type ShortUrlPageProps = {
  params: Promise<{
    shortCode: string;
  }>;
};

export default async function ShortUrlPage({ params }: ShortUrlPageProps) {
  const { shortCode } = await params;

  const record = await urlShortenerService.findByShortCode(shortCode);

  if (!record) {
    notFound();
  }

  redirect(record.originalUrl);
}
