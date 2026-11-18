import { MetadataRoute } from "next";
import { BALI_DESTINATIONS } from "@/data/destinations";
import { fetchSanityPostSlugs } from "@/lib/sanity/client";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.greatbaliairporttransfer.com";

  // Derived from BALI_DESTINATIONS (every route page is a physical file in
  // src/app, so every destination route stays in sync with the canonical list).
  const destinationRoutes = BALI_DESTINATIONS.map((dest) => ({
    url: `${baseUrl}/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const sanityPosts = await fetchSanityPostSlugs({ fresh: true });

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
    {
      url: `${baseUrl}/terms-and-policies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...destinationRoutes,
    ...blogRoutes,
  ];
}
