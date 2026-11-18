import { MetadataRoute } from "next";
import { BALI_DESTINATIONS } from "@/data/destinations";
import { fetchSanityPostSlugs } from "@/lib/sanity/client";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://greatbaliairporttransfer.com";

  // Derived from BALI_DESTINATIONS (every route page is a physical file in
  // src/app, so every destination route stays in sync with the canonical list).
  const destinationRoutes = BALI_DESTINATIONS.map((dest) => ({
    url: `${baseUrl}/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const sanityPosts = await fetchSanityPostSlugs({ fresh: true });

  const blogRoutes = sanityPosts.map((post) => {
    const lastMod = post.updatedAt ?? post.publishedAt;
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastMod ? new Date(lastMod) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bali-airport-transfer-with-baby-seat`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bali-airport-departure-transfer`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bali-airport-van-transfer-hiace`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bali-airport-to-fast-boat-harbor`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
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
