import { InvalidUrlError } from "@/lib/url";
import { urlShortenerService } from "@/services/url-shortener.service";

type ShortenUrlRequest = {
  url?: unknown;
};

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as ShortenUrlRequest;

    if (typeof body.url !== "string") {
      return Response.json(
        {
          error: "URL must be provided as a string.",
        },
        {
          status: 400,
        },
      );
    }

    const result = await urlShortenerService.shorten(body.url);

    const origin = new URL(request.url).origin;

    return Response.json(
      {
        shortCode: result.record.shortCode,
        shortUrl: `${origin}/${result.record.shortCode}`,
        originalUrl: result.record.originalUrl,
      },
      {
        status: result.created ? 201 : 200,
      },
    );
  } catch (error) {
    if (error instanceof InvalidUrlError) {
      return Response.json(
        {
          error: error.message,
        },
        {
          status: 400,
        },
      );
    }

    if (error instanceof SyntaxError) {
      return Response.json(
        {
          error: "Request body must contain valid JSON.",
        },
        {
          status: 400,
        },
      );
    }

    console.error("Failed to shorten URL:", error);

    return Response.json(
      {
        error: "Unable to shorten the URL.",
      },
      {
        status: 500,
      },
    );
  }
}
