import { randomInt } from "node:crypto";

const CHARACTERS =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const SHORT_CODE_LENGTH = 7;

export function generateShortCode(length = SHORT_CODE_LENGTH): string {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error("Short-code length must be a positive integer.");
  }

  return Array.from(
    { length },
    () => CHARACTERS[randomInt(CHARACTERS.length)],
  ).join("");
}
