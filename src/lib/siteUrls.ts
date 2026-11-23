import { BALI_DESTINATIONS } from "@/data/destinations";
import { fetchSanityPostSlugs } from "@/lib/sanity/client";

export const SITE_HOST = "greatbaliairporttransfer.com";
export const SITE_URL = `https://${SITE_HOST}`;

export interface StaticRouteConfig {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}

/** Core static App Router pages included in sitemap.xml and full IndexNow submissions. */
export const CORE_STATIC_ROUTES: readonly StaticRouteConfig[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/bali-airport-transfer-with-baby-seat", changeFrequency: "weekly", priority: 0.9 },
  { path: "/bali-airport-departure-transfer", changeFrequency: "weekly", priority: 0.9 },
  { path: "/bali-airport-van-transfer-hiace", changeFrequency: "weekly", priority: 0.9 },
  { path: "/bali-airport-transfer-vip-alphard", changeFrequency: "weekly", priority: 0.9 },
  { path: "/bali-airport-to-fast-boat-harbor", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.85 },
  { path: "/terms-and-policies", changeFrequency: "monthly", priority: 0.6 },
];

/** Builds the complete canonical URL list (core pages, 18 route pages, Sanity blog posts). */
export async function getAllSiteUrls(): Promise<string[]> {
  const staticUrls = CORE_STATIC_ROUTES.map((route) =>
    route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`
  );
  const destinationUrls = BALI_DESTINATIONS.map((dest) => `${SITE_URL}/${dest.slug}`);
  const sanityPosts = await fetchSanityPostSlugs({ fresh: true });
  const blogUrls = sanityPosts.map((post) => `${SITE_URL}/blog/${post.slug}`);

  return Array.from(new Set([...staticUrls, ...destinationUrls, ...blogUrls]));
}
