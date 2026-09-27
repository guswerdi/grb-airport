import { MetadataRoute } from "next";
import { fetchSanityPostSlugs } from "@/lib/sanity/client";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.greatbaliairporttransfer.com";

  // Hardcoded: every route page is a physical file in src/app —
  // no reliance on a dynamic segment, so these URLs are stable for indexing.
  const routeSlugs = [
    "bali-airport-transfer-to-kuta",
    "bali-airport-transfer-to-jimbaran",
    "bali-airport-transfer-to-seminyak",
    "bali-airport-transfer-to-nusa-dua",
    "bali-airport-transfer-to-kerobokan",
    "bali-airport-transfer-to-sanur",
    "bali-airport-transfer-to-nusa-dua-atas",
    "bali-airport-transfer-to-tanjung-benoa",
    "bali-airport-transfer-to-canggu",
    "bali-airport-transfer-to-uluwatu",
    "bali-airport-transfer-to-ubud",
    "bali-airport-transfer-to-tanah-lot",
    "bali-airport-transfer-to-klungkung",
    "bali-airport-transfer-to-tegallalang",
    "bali-airport-transfer-to-padangbai",
    "bali-airport-transfer-to-munduk",
    "bali-airport-transfer-to-lovina",
    "bali-airport-transfer-to-amed",
  ];

  const destinationRoutes = routeSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const sanityPosts = await fetchSanityPostSlugs();

  const blogRoutes = sanityPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...destinationRoutes,
    ...blogRoutes,
  ];
}
