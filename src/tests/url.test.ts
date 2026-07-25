import { describe, expect, it } from "@jest/globals";
import { InvalidUrlError, normalizeUrl } from "@/lib/url";

describe("normalizeUrl", () => {
  it("adds HTTPS when the submitted URL has no protocol", () => {
    const result = normalizeUrl("www.google.com");

    expect(result).toBe("https://www.google.com/");
  });

  it("preserves a valid HTTP or HTTPS URL", () => {
    const result = normalizeUrl(
      "https://www.google.com/search?q=url-shortener",
    );

    expect(result).toBe("https://www.google.com/search?q=url-shortener");
  });

  it.each(["", "   ", "hello", "javascript:alert(1)", "ftp://example.com"])(
    "rejects invalid or unsupported input: %s",
    (input) => {
      expect(() => normalizeUrl(input)).toThrow(InvalidUrlError);
    },
  );
});
