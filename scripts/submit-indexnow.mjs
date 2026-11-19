/**
 * Submits all URLs from the live sitemap.xml directly to IndexNow (Bing, Yandex, Naver, Seznam).
 *
 * Run AFTER deploying the site (so `/<key>.txt` returns HTTP 200 live):
 *   npm run indexnow
 *
 * Options:
 *   --dry-run   Verify the key file and print URLs without submitting to api.indexnow.org
 */
const SITE_HOST = "greatbaliairporttransfer.com";
const SITE_URL = `https://${SITE_HOST}`;
const DEFAULT_KEY = "96002da3c4a268ec622f8b5724b4f5b6";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const key = process.env.INDEXNOW_KEY?.trim() || DEFAULT_KEY;
  const keyLocation = process.env.INDEXNOW_KEY?.trim()
    ? `${SITE_URL}/api/indexnow/key`
    : `${SITE_URL}/${key}.txt`;

  console.log(`Checking live key file: ${keyLocation}`);
  const keyRes = await fetch(keyLocation, { signal: AbortSignal.timeout(8000) });
  if (!keyRes.ok) {
    throw new Error(
      `Key file not reachable yet at ${keyLocation} (HTTP ${keyRes.status}). Deploy to Vercel first.`
    );
  }

  const remoteKey = (await keyRes.text()).trim();
  if (remoteKey !== key) {
    throw new Error(`Key file mismatch at ${keyLocation}: expected "${key}", got "${remoteKey}".`);
  }

  console.log(`Fetching sitemap: ${SITE_URL}/sitemap.xml`);
  const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`, {
    signal: AbortSignal.timeout(10000),
  });
  if (!sitemapRes.ok) {
    throw new Error(`Failed to fetch sitemap.xml (HTTP ${sitemapRes.status}).`);
  }

  const xml = await sitemapRes.text();
  const locMatches = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1].trim());
  const urlList = Array.from(new Set(locMatches)).filter((u) => {
    try {
      return new URL(u).hostname === SITE_HOST;
    } catch {
      return false;
    }
  });

  if (urlList.length === 0) {
    throw new Error("No valid URLs found in sitemap.xml.");
  }

  console.log(`Prepared ${urlList.length} URLs for ${SITE_HOST}.`);
  if (dryRun) {
    for (const url of urlList) console.log(`  [dry-run] ${url}`);
    return;
  }

  const submitRes = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: SITE_HOST,
      key,
      keyLocation,
      urlList,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (submitRes.status !== 200 && submitRes.status !== 202) {
    const errBody = await submitRes.text().catch(() => "");
    throw new Error(`IndexNow returned HTTP ${submitRes.status}: ${errBody}`);
  }

  console.log(`IndexNow accepted ${urlList.length} URLs (HTTP ${submitRes.status}).`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
