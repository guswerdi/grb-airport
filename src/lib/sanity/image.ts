import imageUrlBuilder from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "./client";

/** Build a resized Sanity image URL from an asset reference (e.g. body image blocks). */
export function urlForSanityImage(source: unknown): string | null {
  if (!isSanityConfigured || !source) return null;
  try {
    const builder = imageUrlBuilder({ projectId, dataset }).image(source);
    return builder.width(1200).fit("max").url();
  } catch {
    return null;
  }
}
