import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PortableTextBlocks } from "@/components/PortableTextBlocks";
import {
  fetchSanityPostBySlug,
  fetchSanityPostSlugs,
  fetchSanityRelatedPosts,
  formatSanityDate,
  SanityPost,
  SanityPostStub,
} from "@/lib/sanity/client";
import {
  Calendar,
  Clock,
  ChevronRight,
  ShieldCheck,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await fetchSanityPostSlugs();
  return slugs.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchSanityPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Great Bali Airport Transfer",
    };
  }

  return {
    // No manual brand suffix here - the root layout used to append one too,
    // which rendered the brand twice. `metaTitle` lets the CMS keep a long,
    // descriptive H1 while <title> stays inside Google's ~60 char limit.
    title: post.metaTitle || post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.greatbaliairporttransfer.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.greatbaliairporttransfer.com/blog/${post.slug}`,
      type: "article",
      ...(post.mainImage?.url ? { images: [{ url: post.mainImage.url }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchSanityPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts: SanityPostStub[] = await fetchSanityRelatedPosts(slug);

  const authorName = post.author?.name ?? "Great Bali Airport Transfer Team";
  const authorRole = post.author?.role ?? "Editorial Team";
  const category = post.category ?? "Airport Guide";
  const publishedIso = post.publishedAt
    ? new Date(post.publishedAt).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
  const heroImage = post.mainImage?.url ?? null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: heroImage ?? "https://www.greatbaliairporttransfer.com/images/innova-zenix.jpg",
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Great Bali Airport Transfer",
      logo: {
        "@type": "ImageObject",
        url: "https://www.greatbaliairporttransfer.com/images/innova-zenix.jpg",
      },
    },
    datePublished: publishedIso,
    dateModified: publishedIso,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Navbar />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-emerald-700 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <main className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 flex-1">
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
              {category}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  {(authorName || "G")[0]}
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">{authorName}</span>
                  <span className="text-[10px] text-slate-400 block">{authorRole}</span>
                </div>
              </div>

              <span>•</span>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatSanityDate(post.publishedAt)}</span>
              </div>

              <span>•</span>

              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.readTime ?? "5 min read"}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {heroImage ? (
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-10 bg-slate-100 border border-slate-200 shadow-xs">
              <Image
                src={heroImage}
                alt={post.mainImage?.alt || post.title}
                fill
                priority
                fetchPriority="high"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          ) : null}

          {/* Article Text */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            {post.excerpt ? (
              <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed border-l-4 border-emerald-600 pl-4 py-1 italic bg-slate-50 rounded-r-lg">
                {post.excerpt}
              </p>
            ) : null}

            <PortableTextBlocks blocks={post.body ?? []} />

            {/* Embedded Transfer Feature Box */}
            <div className="my-8 p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200">
              <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Why Pre-Book with Great Bali Airport Transfer?
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>100% Fixed Rates:</strong> From IDR 250,000 all-inclusive. Bali Mandara Tollway and airport parking included.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Free 90-Min Flight Tracking:</strong> Your chauffeur tracks your flight in real time with zero extra delay fees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Meet & Greet with Name Sign:</strong> Driver awaits you directly at the DPS arrivals greeting gate.</span>
                </li>
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/#booking-widget"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  Book DPS Transfer Now
                </Link>
                <a
                  href="https://wa.me/6285190920033?text=Hello%20Great%20Bali%20Airport%20Transfer,%20I%20have%20an%20inquiry%20regarding%20an%20airport%20transfer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 ? (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg mb-6">More Bali Airport Guides</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related._id}
                    href={`/blog/${related.slug}`}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider block mb-1">
                        {related.category ?? "Guide"}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors leading-snug mb-2">
                        {related.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{related.excerpt}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-400">
                      <span>{related.readTime ?? "5 min read"}</span>
                      <span className="text-emerald-700 font-semibold group-hover:underline flex items-center gap-1">
                        Read article <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </main>

      <Footer />
    </div>
  );
}