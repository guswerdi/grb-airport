import { MetadataRoute } from "next";
import { BALI_DESTINATIONS, RATES_LAST_REVIEWED } from "@/data/destinations";
import { fetchSanityPostSlugs } from "@/lib/sanity/client";
import { CORE_STATIC_ROUTES, SITE_URL } from "@/lib/siteUrls";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stableReviewDate = new Date(`${RATES_LAST_REVIEWED}T00:00:00.000Z`);

  const staticRoutes: MetadataRoute.Sitemap = CORE_STATIC_ROUTES.map((route) => ({
    url: route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified: stableReviewDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Derived from BALI_DESTINATIONS (every route page is a physical file in
  // src/app, so every destination route stays in sync with the canonical list).
  const destinationRoutes: MetadataRoute.Sitemap = BALI_DESTINATIONS.map((dest) => ({
    url: `${SITE_URL}/${dest.slug}`,
    lastModified: stableReviewDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const sanityPosts = await fetchSanityPostSlugs({ fresh: true });

  const blogRoutes: MetadataRoute.Sitemap = sanityPosts.map((post) => {
    const lastMod = post.updatedAt ?? post.publishedAt;
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: lastMod ? new Date(lastMod) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...destinationRoutes, ...blogRoutes];
}
