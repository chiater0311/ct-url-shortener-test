import { urlShortenerService } from "@/services/url-shortener.service";

type RedirectRouteContext = {
  params: Promise<{
    shortCode: string;
  }>;
};

export async function GET(
  _request: Request,
  context: RedirectRouteContext,
): Promise<Response> {
  try {
    const { shortCode } = await context.params;

    const record = await urlShortenerService.findByShortCode(shortCode);

    if (!record) {
      return new Response("Short URL not found.", {
        status: 404,
      });
    }

    return Response.redirect(record.originalUrl, 307);
  } catch (error) {
    console.error("Failed to resolve short URL:", error);

    return new Response("Unable to resolve the short URL.", {
      status: 500,
    });
  }
}
