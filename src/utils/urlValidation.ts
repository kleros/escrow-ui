export function parseUrl(url: string | null | undefined): URL | null {
  if (!url || typeof url !== "string") {
    return null;
  }

  try {
    return new URL(url);
  } catch {
    return null;
  }
}

// Only https is allowed, rejects javascript:, data:, vbscript:, file:, etc.
export function isSafeUrl(url: string | null | undefined): boolean {
  return parseUrl(url)?.protocol === "https:";
}
