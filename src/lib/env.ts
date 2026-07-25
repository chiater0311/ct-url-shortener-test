function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getOptionalEnvironmentVariable(
  name: string,
  fallback: string,
): string {
  return process.env[name] ?? fallback;
}

function getPortEnvironmentVariable(name: string, fallback: number): number {
  const rawValue = process.env[name];

  if (!rawValue) {
    return fallback;
  }

  const parsedValue = Number(rawValue);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(
      `Environment variable ${name} must be a valid port number.`,
    );
  }

  return parsedValue;
}

export const env = {
  database: {
    host: getOptionalEnvironmentVariable("DATABASE_HOST", "127.0.0.1"),
    port: getPortEnvironmentVariable("DATABASE_PORT", 3306),
    user: getOptionalEnvironmentVariable("DATABASE_USER", "root"),
    password: process.env.DATABASE_PASSWORD ?? "",
    name: getRequiredEnvironmentVariable("DATABASE_NAME"),
  },
};
