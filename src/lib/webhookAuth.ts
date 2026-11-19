import { NextRequest, NextResponse } from "next/server";

/**
 * Verifies shared secret auth against `SANITY_REVALIDATE_SECRET` via header or query string.
 * Returns null when authorized, or a JSON error response ready to return from the handler.
 */
export function verifyWebhookSecret(req: NextRequest): NextResponse | null {
  const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;
  if (!configuredSecret) {
    return NextResponse.json(
      { ok: false, error: "SANITY_REVALIDATE_SECRET is not configured on the server." },
      { status: 503 }
    );
  }

  const headerSecret =
    req.headers.get("x-sanity-secret") ?? req.headers.get("x-indexnow-secret");
  const querySecret = req.nextUrl.searchParams.get("secret");

  if (headerSecret !== configuredSecret && querySecret !== configuredSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
