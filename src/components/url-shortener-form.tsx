"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import type {
  ShortenUrlErrorResponse,
  ShortenUrlSuccessResponse,
} from "@/types/url";

type UrlShortenerFormData = {
  url: string;
};

export function UrlShortenerForm() {
  const [result, setResult] = useState<ShortenUrlSuccessResponse | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<UrlShortenerFormData>({
    defaultValues: {
      url: "",
    },
  });

  const onSubmit: SubmitHandler<UrlShortenerFormData> = async (formData) => {
    clearErrors("root");
    setResult(null);
    setIsCopied(false);

    try {
      const response = await fetch("/api/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: formData.url,
        }),
      });

      const data = (await response.json()) as
        | ShortenUrlSuccessResponse
        | ShortenUrlErrorResponse;

      if (!response.ok) {
        setError("root.server", {
          type: "server",
          message: "error" in data ? data.error : "Unable to shorten the URL.",
        });

        return;
      }

      if (!("shortUrl" in data)) {
        setError("root.server", {
          type: "server",
          message: "The server returned an unexpected response.",
        });

        return;
      }

      setResult(data);
    } catch (error) {
      console.error("Failed to submit URL-shortening request:", error);

      setError("root.server", {
        type: "server",
        message: "Unable to connect to the server. Please try again.",
      });
    }
  };

  async function handleCopy() {
    if (!result) {
      return;
    }

    clearErrors("root");

    try {
      await navigator.clipboard.writeText(result.shortUrl);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy short URL:", error);

      setError("root.server", {
        type: "clipboard",
        message: "Unable to copy automatically. Please copy the URL manually.",
      });
    }
  }

  const errorMessage = errors.url?.message ?? errors.root?.server?.message;

  return (
    <section className="w-full max-w-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8"
      >
        <label
          htmlFor="url"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Enter a URL
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="url"
            type="text"
            placeholder="www.google.com"
            autoComplete="url"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.url)}
            aria-describedby={errorMessage ? "url-error" : undefined}
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            {...register("url", {
              required: "Please enter a URL.",
              validate: (value) =>
                value.trim().length > 0 || "Please enter a URL.",
            })}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isSubmitting ? "Shortening..." : "Shorten URL"}
          </button>
        </div>

        {errorMessage && (
          <p
            id="url-error"
            role="alert"
            className="mt-3 text-sm font-medium text-red-600"
          >
            {errorMessage}
          </p>
        )}

        {result && (
          <div
            className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-emerald-900">
              Your shortened URL is ready
            </p>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="min-w-0 flex-1 break-all rounded-lg border border-emerald-300 bg-white px-4 py-3 text-blue-700 underline"
              >
                {result.shortUrl}
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="rounded-lg border border-emerald-700 px-5 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-100"
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>

            <p className="mt-3 break-all text-xs text-slate-600">
              Destination: {result.originalUrl}
            </p>
          </div>
        )}
      </form>
    </section>
  );
}
