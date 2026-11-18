import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;
  if (!configuredSecret) {
    return NextResponse.json(
      { ok: false, error: "SANITY_REVALIDATE_SECRET is not configured on the server." },
      { status: 503 }
    );
  }

  const headerSecret = req.headers.get("x-sanity-secret");
  const querySecret = req.nextUrl.searchParams.get("secret");
  if (headerSecret !== configuredSecret && querySecret !== configuredSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = (await req.json()) as { slug?: { current?: string } | string };
    if (typeof body?.slug === "string") {
      slug = body.slug;
    } else if (body?.slug && typeof body.slug === "object") {
      slug = body.slug.current;
    }
  } catch {
    // Empty or non-JSON webhook bodies still revalidate core routes cleanly
  }

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  revalidatePath("/llms-full.txt");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }

  return NextResponse.json({
    ok: true,
    revalidatedAt: new Date().toISOString(),
    slug: slug || null,
  });
}
