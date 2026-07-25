import { describe, expect, it } from "@jest/globals";
import { generateShortCode, SHORT_CODE_LENGTH } from "@/lib/short-code";

describe("generateShortCode", () => {
  it("generates an alphanumeric code using the default length", () => {
    const result = generateShortCode();

    expect(result).toHaveLength(SHORT_CODE_LENGTH);
    expect(result).toMatch(/^[a-zA-Z0-9]+$/);
  });

  it("supports a custom positive length", () => {
    const result = generateShortCode(10);

    expect(result).toHaveLength(10);
    expect(result).toMatch(/^[a-zA-Z0-9]+$/);
  });

  it.each([0, -1, 1.5])("rejects an invalid length: %s", (length) => {
    expect(() => generateShortCode(length)).toThrow(
      "Short-code length must be a positive integer.",
    );
  });
});
