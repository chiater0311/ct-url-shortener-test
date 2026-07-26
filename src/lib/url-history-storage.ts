import type { ShortenUrlSuccessResponse, UrlHistoryItem } from "@/types/url";

const STORAGE_KEY = "ct-url-shortener-history";
const MAX_HISTORY_ITEMS = 10;

export function getUrlHistory(): UrlHistoryItem[] {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isUrlHistoryItem);
  } catch (error) {
    console.error("Failed to read URL history:", error);
    return [];
  }
}

export function addUrlHistoryItem(
  history: UrlHistoryItem[],
  result: ShortenUrlSuccessResponse,
): UrlHistoryItem[] {
  const newItem: UrlHistoryItem = {
    ...result,
    createdAt: new Date().toISOString(),
  };

  const historyWithoutDuplicate = history.filter(
    (item) => item.shortCode !== result.shortCode,
  );

  const updatedHistory = [newItem, ...historyWithoutDuplicate].slice(
    0,
    MAX_HISTORY_ITEMS,
  );

  saveUrlHistory(updatedHistory);

  return updatedHistory;
}

export function clearUrlHistory(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear URL history:", error);
  }
}

function saveUrlHistory(history: UrlHistoryItem[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save URL history:", error);
  }
}

function isUrlHistoryItem(value: unknown): value is UrlHistoryItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.shortCode === "string" &&
    typeof item.shortUrl === "string" &&
    typeof item.originalUrl === "string" &&
    typeof item.createdAt === "string"
  );
}
