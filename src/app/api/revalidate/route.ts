import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { submitIndexNow } from "@/lib/indexnow";
import { verifyWebhookSecret } from "@/lib/webhookAuth";

export async function POST(req: NextRequest) {
  const authError = verifyWebhookSecret(req);
  if (authError) return authError;

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

  const indexNowPaths = ["/", "/blog", "/llms.txt", "/llms-full.txt"];
  if (slug) {
    revalidatePath(`/blog/${slug}`);
    indexNowPaths.push(`/blog/${slug}`);
  }

  const indexNow = await submitIndexNow(indexNowPaths);

  return NextResponse.json({
    ok: true,
    revalidatedAt: new Date().toISOString(),
    slug: slug || null,
    indexNow,
  });
}
