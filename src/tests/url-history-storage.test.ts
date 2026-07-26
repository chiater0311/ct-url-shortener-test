/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, it } from "@jest/globals";

import {
  addUrlHistoryItem,
  clearUrlHistory,
  getUrlHistory,
} from "@/lib/url-history-storage";

describe("URL history storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("stores the newest shortened URL first", () => {
    const firstHistory = addUrlHistoryItem([], {
      shortCode: "abc1234",
      shortUrl: "http://localhost:3000/abc1234",
      originalUrl: "https://example.com/",
    });

    const updatedHistory = addUrlHistoryItem(firstHistory, {
      shortCode: "xyz5678",
      shortUrl: "http://localhost:3000/xyz5678",
      originalUrl: "https://www.google.com/",
    });

    expect(updatedHistory).toHaveLength(2);
    expect(updatedHistory[0].shortCode).toBe("xyz5678");
    expect(getUrlHistory()).toHaveLength(2);
  });

  it("removes browser history", () => {
    addUrlHistoryItem([], {
      shortCode: "abc1234",
      shortUrl: "http://localhost:3000/abc1234",
      originalUrl: "https://example.com/",
    });

    clearUrlHistory();

    expect(getUrlHistory()).toEqual([]);
  });
});
