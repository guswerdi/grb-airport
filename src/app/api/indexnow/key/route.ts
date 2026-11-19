import { NextResponse } from "next/server";
import { getIndexNowConfig } from "@/lib/indexnow";

export const dynamic = "force-dynamic";

/** Serves the active IndexNow key in plain text when verifying via env-var key rotation. */
export function GET() {
  const { key } = getIndexNowConfig();
  return new NextResponse(key, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
