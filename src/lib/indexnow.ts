import { SITE_HOST, SITE_URL } from "@/lib/siteUrls";

export const DEFAULT_INDEXNOW_KEY = "96002da3c4a268ec622f8b5724b4f5b6";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_FORMAT_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;
const MAX_URLS_PER_BATCH = 10_000;

export interface IndexNowConfig {
  host: string;
  key: string;
  keyLocation: string;
}

export interface IndexNowSubmitResult {
  ok: boolean;
  status: number;
  submittedCount: number;
  urlList: string[];
  error?: string;
}

/** Resolves the active IndexNow key and its verification file URL (supports env override). */
export function getIndexNowConfig(): IndexNowConfig {
  const envKey = process.env.INDEXNOW_KEY?.trim();
  if (envKey && KEY_FORMAT_PATTERN.test(envKey)) {
    return {
      host: SITE_HOST,
      key: envKey,
      keyLocation: `${SITE_URL}/api/indexnow/key`,
    };
  }

  return {
    host: SITE_HOST,
    key: DEFAULT_INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${DEFAULT_INDEXNOW_KEY}.txt`,
  };
}

/** Normalizes relative paths or absolute URLs into deduplicated canonical host URLs. */
export function normalizeIndexNowUrls(pathsOrUrls: readonly string[]): string[] {
  const result = new Set<string>();

  for (const raw of pathsOrUrls) {
    const trimmed = raw.trim();
    if (!trimmed) continue;

    try {
      const candidate = trimmed.startsWith("/") ? `${SITE_URL}${trimmed}` : trimmed;
      const parsed = new URL(candidate);
      if (parsed.hostname !== SITE_HOST || (parsed.protocol !== "https:" && parsed.protocol !== "http:")) {
        continue;
      }
      parsed.hash = "";
      // Root URL without trailing slash matches the canonical URL in sitemap.xml
      const normalized =
        parsed.pathname === "/" && !parsed.search
          ? SITE_URL
          : parsed.toString();
      result.add(normalized);
    } catch {
      // Ignore malformed entries cleanly
    }
  }

  return Array.from(result).slice(0, MAX_URLS_PER_BATCH);
}

/**
 * Submits changed or canonical URLs to api.indexnow.org (shared across Bing and partner engines).
 * Never throws so caller webhooks/builds stay resilient to transient upstream failures.
 */
export async function submitIndexNow(
  pathsOrUrls: readonly string[],
  timeoutMs = 4500
): Promise<IndexNowSubmitResult> {
  const urlList = normalizeIndexNowUrls(pathsOrUrls);
  if (urlList.length === 0) {
    return {
      ok: false,
      status: 400,
      submittedCount: 0,
      urlList: [],
      error: "No valid URLs matching host were provided.",
    };
  }

  const { host, key, keyLocation } = getIndexNowConfig();

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });

    const accepted = res.status === 200 || res.status === 202;
    return {
      ok: accepted,
      status: res.status,
      submittedCount: accepted ? urlList.length : 0,
      urlList,
      ...(accepted ? {} : { error: `IndexNow responded with HTTP ${res.status}` }),
    };
  } catch (err) {
    return {
      ok: false,
      status: 502,
      submittedCount: 0,
      urlList,
      error: err instanceof Error ? err.message : "IndexNow request failed.",
    };
  }
}
