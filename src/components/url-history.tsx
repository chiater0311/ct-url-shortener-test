"use client";

import { useState } from "react";

import type { UrlHistoryItem } from "@/types/url";

type UrlHistoryProps = {
  history: UrlHistoryItem[];
  onClear: () => void;
};

export function UrlHistory({ history, onClear }: UrlHistoryProps) {
  const [copiedShortCode, setCopiedShortCode] = useState<string | null>(null);

  async function handleCopy(item: UrlHistoryItem) {
    try {
      await navigator.clipboard.writeText(item.shortUrl);
      setCopiedShortCode(item.shortCode);

      window.setTimeout(() => {
        setCopiedShortCode((currentValue) =>
          currentValue === item.shortCode ? null : currentValue,
        );
      }, 1500);
    } catch (error) {
      console.error("Failed to copy history URL:", error);
    }
  }

  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-lg lg:max-w-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Recent history
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-950">
            Your shortened links
          </h2>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="font-medium text-slate-700">No recent links yet</p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Links you shorten in this browser will appear here.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {history.map((item) => (
            <li
              key={item.shortCode}
              className="rounded-xl border border-slate-200 p-4"
            >
              <p className="truncate text-sm font-medium text-slate-900">
                {item.originalUrl}
              </p>

              <a
                href={item.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block break-all text-sm font-semibold text-blue-700 underline"
              >
                {item.shortUrl}
              </a>

              <p className="mt-2 text-xs text-slate-500">
                {formatHistoryDate(item.createdAt)}
              </p>

              <div className="mt-3 flex gap-2">
                <a
                  href={item.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Open
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(item)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  {copiedShortCode === item.shortCode ? "Copied!" : "Copy"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function formatHistoryDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently created";
  }

  return new Intl.DateTimeFormat("en-SG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
