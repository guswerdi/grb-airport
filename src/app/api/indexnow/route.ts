import { NextRequest, NextResponse } from "next/server";
import { getIndexNowConfig, submitIndexNow } from "@/lib/indexnow";
import { getAllSiteUrls } from "@/lib/siteUrls";
import { verifyWebhookSecret } from "@/lib/webhookAuth";

/**
 * Protected endpoint to submit either explicit URLs (`{ urls: string[] }`) or the
 * entire canonical sitemap URL list (`GET` sitemap sources) to IndexNow.
 */
export async function POST(req: NextRequest) {
  const authError = verifyWebhookSecret(req);
  if (authError) return authError;

  let requestedUrls: string[] | undefined;
  try {
    const body = (await req.json()) as { urls?: unknown };
    if (Array.isArray(body?.urls)) {
      requestedUrls = body.urls.filter((u): u is string => typeof u === "string");
    }
  } catch {
    // Empty/non-JSON body submits the full canonical site URL list cleanly
  }

  const targetUrls =
    requestedUrls && requestedUrls.length > 0
      ? requestedUrls
      : await getAllSiteUrls();

  const result = await submitIndexNow(targetUrls, 8000);
  const { keyLocation } = getIndexNowConfig();

  return NextResponse.json(
    {
      ...result,
      keyLocation,
      submittedAt: new Date().toISOString(),
    },
    { status: result.ok ? 200 : 502 }
  );
}
