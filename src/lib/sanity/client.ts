import { createClient } from "next-sanity";

/* ------------------------------------------------------------------ */
/* Sanity configuration (env-driven, graceful when not configured yet) */
/* ------------------------------------------------------------------ */

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j1m80m30";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";

/** True once NEXT_PUBLIC_SANITY_PROJECT_ID is provided in .env.local */
export const isSanityConfigured = Boolean(projectId);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

/* ------------------------------------------------------------------ */
/* Types (shape of GROQ projections below)                             */
/* ------------------------------------------------------------------ */

export interface SanityAuthor {
  name?: string;
  role?: string;
}

export interface SanityImageRef {
  url?: string;
  alt?: string;
}

export interface SanityPost {
  _id: string;
  title: string;
  /** Optional <title> override so meta titles stay under ~60 chars. */
  metaTitle?: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  readTime?: string;
  featured?: boolean;
  author?: SanityAuthor | null;
  mainImage?: SanityImageRef | null;
  body?: unknown[];
}

export interface SanityPostStub {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  readTime?: string;
}

/* ------------------------------------------------------------------ */
/* GROQ queries                                                        */
/* ------------------------------------------------------------------ */

const POST_PROJECTION = `{
  _id,
  title,
  metaTitle,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  readTime,
  featured,
  "author": { "name": author->name, "role": author->role },
  "mainImage": { "url": mainImage.asset->url, "alt": mainImage.alt },
  body
}`;

export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) ${POST_PROJECTION}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] ${POST_PROJECTION}`;

export const relatedPostsQuery = `*[_type == "post" && defined(slug.current) && slug.current != $slug] | order(coalesce(publishedAt, _createdAt) desc) [0...2] {
  _id, title, "slug": slug.current, excerpt, category, publishedAt, readTime
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, "publishedAt": coalesce(publishedAt, _createdAt) }`;

/* ------------------------------------------------------------------ */
/* Safe fetch helpers (never throw — return empty on missing config)   */
/* ------------------------------------------------------------------ */

export async function fetchSanityPosts(): Promise<SanityPost[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<SanityPost[]>(postsQuery);
  } catch (error) {
    console.error("[sanity] fetchSanityPosts failed:", error);
    return [];
  }
}

export async function fetchSanityPostBySlug(
  slug: string
): Promise<SanityPost | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<SanityPost | null>(postBySlugQuery, { slug });
  } catch (error) {
    console.error("[sanity] fetchSanityPostBySlug failed:", error);
    return null;
  }
}

export async function fetchSanityRelatedPosts(
  slug: string
): Promise<SanityPostStub[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<SanityPostStub[]>(relatedPostsQuery, { slug });
  } catch (error) {
    console.error("[sanity] fetchSanityRelatedPosts failed:", error);
    return [];
  }
}

export async function fetchSanityPostSlugs(): Promise<
  { slug: string; publishedAt?: string }[]
> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<{ slug: string; publishedAt?: string }[]>(
      postSlugsQuery
    );
  } catch (error) {
    console.error("[sanity] fetchSanityPostSlugs failed:", error);
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Shared formatting helpers                                           */
/* ------------------------------------------------------------------ */

export function formatSanityDate(iso?: string): string {
  if (!iso) return "Recently";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Recently";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
