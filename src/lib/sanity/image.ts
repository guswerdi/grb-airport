import imageUrlBuilder from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "./client";

/** Returns true for external http(s) URLs so CDN-backed images can skip `/_next/image`. */
export function isRemoteImageUrl(src?: string | null): boolean {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}

/** Adds Sanity CDN auto-format and width parameters when serving Sanity URLs directly. */
export function optimizeSanityImageUrl(url: string, width = 1200, quality = 80): string {
  if (!url || !url.includes("cdn.sanity.io")) return url;
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has("w")) parsed.searchParams.set("w", String(width));
    if (!parsed.searchParams.has("auto")) parsed.searchParams.set("auto", "format");
    if (!parsed.searchParams.has("fit")) parsed.searchParams.set("fit", "max");
    if (!parsed.searchParams.has("q")) parsed.searchParams.set("q", String(quality));
    return parsed.toString();
  } catch {
    return url;
  }
}

/** Build a resized Sanity image URL from an asset reference (e.g. body image blocks). */
export function urlForSanityImage(source: unknown): string | null {
  if (!isSanityConfigured || !source) return null;
  try {
    const builder = imageUrlBuilder({ projectId, dataset }).image(source);
    return builder.width(1200).fit("max").auto("format").quality(80).url();
  } catch {
    return null;
  }
}
