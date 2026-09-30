import type { Metadata } from "next";
import { BlogListing, BlogCard } from "@/components/BlogListing";
import {
  fetchSanityPosts,
  formatSanityDate,
  SanityPost,
} from "@/lib/sanity/client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Bali Airport Transfer Guide & Tips 2026 | DPS Arrival",
  description:
    "Essential Bali airport arrival advice, transparent DPS taxi cost breakdowns, and local chauffeur insights for a stress-free holiday start.",
  alternates: {
    canonical: "https://www.greatbaliairporttransfer.com/blog",
  },
};

function toCard(post: SanityPost): BlogCard {
  return {
    id: post._id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    category: post.category ?? "Airport Guide",
    date: formatSanityDate(post.publishedAt),
    readTime: post.readTime ?? "5 min read",
    author: {
      name: post.author?.name ?? "Great Bali Airport Transfer Team",
      role: post.author?.role ?? "Editorial Team",
    },
    image: post.mainImage?.url ?? null,
    popular: post.featured ?? false,
  };
}

export default async function BlogListingPage() {
  const posts = await fetchSanityPosts();

  return <BlogListing posts={posts.map(toCard)} />;
}

