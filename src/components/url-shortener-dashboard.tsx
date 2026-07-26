"use client";

import { useEffect, useState } from "react";

import { UrlHistory } from "@/components/url-history";
import { UrlShortenerForm } from "@/components/url-shortener-form";
import {
  addUrlHistoryItem,
  clearUrlHistory,
  getUrlHistory,
} from "@/lib/url-history-storage";
import type { ShortenUrlSuccessResponse, UrlHistoryItem } from "@/types/url";

export function UrlShortenerDashboard() {
  const [history, setHistory] = useState<UrlHistoryItem[]>([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setHistory(getUrlHistory());
      setIsHistoryLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function handleShortened(result: ShortenUrlSuccessResponse) {
    setHistory((currentHistory) => addUrlHistoryItem(currentHistory, result));
  }

  function handleClearHistory() {
    clearUrlHistory();
    setHistory([]);
  }

  return (
    <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <UrlShortenerForm onShortened={handleShortened} />

      {isHistoryLoaded ? (
        <UrlHistory history={history} onClear={handleClearHistory} />
      ) : (
        <aside className="min-h-52 w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-lg lg:max-w-md">
          <p className="text-sm text-slate-500">Loading recent history...</p>
        </aside>
      )}
    </div>
  );
}
