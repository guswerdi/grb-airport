import { MetadataRoute } from "next";
import { BALI_DESTINATIONS } from "@/data/destinations";
import { BALI_BLOG_POSTS } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://greatbaliairporttransfer.com";

  const dedicatedSlugs = [
    "bali-airport-transfer-to-canggu",
    "bali-airport-transfer-to-nusa-dua",
    "bali-airport-transfer-to-seminyak",
    "bali-airport-transfer-to-ubud",
    "bali-airport-transfer-to-uluwatu",
  ];

  const destinationRoutes = BALI_DESTINATIONS.filter((dest) =>
    dedicatedSlugs.includes(dest.slug)
  ).map((dest) => ({
    url: `${baseUrl}/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const blogRoutes = BALI_BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
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
