import { fetchSanityPosts } from "@/lib/sanity/client";

export const revalidate = 3600;

const BASE_URL = "https://www.greatbaliairporttransfer.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Same source as the blog index, sitemap and llms.txt, so the feed always
  // lists exactly the articles that exist. Empty (but valid) if Sanity is down.
  const posts = await fetchSanityPosts();

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const published = post.publishedAt ? new Date(post.publishedAt) : null;
      const pubDate =
        published && !Number.isNaN(published.getTime())
          ? `\n      <pubDate>${published.toUTCString()}</pubDate>`
          : "";
      const category = post.category
        ? `\n      <category>${escapeXml(post.category)}</category>`
        : "";
      const description = post.excerpt
        ? `\n      <description>${escapeXml(post.excerpt)}</description>`
        : "";
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>${pubDate}${category}${description}
    </item>`;
    })
    .join("\n");

  const latest = posts
    .map((p) => (p.publishedAt ? new Date(p.publishedAt).getTime() : NaN))
    .filter((t) => !Number.isNaN(t))
    .sort((a, b) => b - a)[0];
  const lastBuildDate = new Date(latest ?? Date.now()).toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Great Bali Airport Transfer: Guides &amp; Tips</title>
    <link>${BASE_URL}/blog</link>
    <description>Bali airport transfer guides, DPS pickup instructions, route prices and travel times.</description>
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
