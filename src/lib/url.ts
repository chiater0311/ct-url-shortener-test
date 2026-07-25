const SUPPORTED_PROTOCOLS = ["http:", "https:"];

export class InvalidUrlError extends Error {
  constructor(message = "Please enter a valid HTTP or HTTPS URL.") {
    super(message);
    this.name = "InvalidUrlError";
  }
}

export function normalizeUrl(input: string): string {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    throw new InvalidUrlError();
  }

  const valueWithProtocol = hasProtocol(trimmedInput)
    ? trimmedInput
    : `https://${trimmedInput}`;

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(valueWithProtocol);
  } catch {
    throw new InvalidUrlError();
  }

  if (!SUPPORTED_PROTOCOLS.includes(parsedUrl.protocol)) {
    throw new InvalidUrlError();
  }

  if (!parsedUrl.hostname.includes(".")) {
    throw new InvalidUrlError();
  }

  return parsedUrl.toString();
}

function hasProtocol(value: string): boolean {
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value);
}
