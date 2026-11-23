import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import { formatSanityDate, SanityPost } from "@/lib/sanity/client";
import { isRemoteImageUrl, optimizeSanityImageUrl } from "@/lib/sanity/image";

interface LatestGuidesSectionProps {
  posts: SanityPost[];
}

export const LatestGuidesSection: React.FC<LatestGuidesSectionProps> = ({
  posts,
}) => {
  const featuredPosts = posts.slice(0, 3);

  return (
    <section
      id="arrival-guides"
      className="py-16 sm:py-20 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Updated Local Guides
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bali Airport Guides &amp; Specialized Transfers
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Practical walkthroughs for DPS Circle K pickup, honest fare breakdowns, child seats, and hotel-to-airport departure timing.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>All Travel Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Always-current Specialized Service Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            href="/bali-airport-transfer-with-baby-seat"
            className="group flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-400 transition-all"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                Family Transfers • IDR 50,000 / seat
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800">
                Bali Airport Transfer With Pre-Installed Baby &amp; Booster Seats
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Infant seats (0–2 yrs) and boosters (3–7 yrs) pre-fitted before DPS pickup.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-700 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/bali-airport-departure-transfer"
            className="group flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-sky-50/70 border border-sky-200 hover:border-sky-400 transition-all"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block mb-0.5">
                Hotel ➔ DPS Departures • 24/7 Flat Fares
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-900">
                Bali Airport Departure Transfer &amp; Pickup Leave-Time Guide
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Exact leave-hotel buffers from Ubud, Canggu, Seminyak &amp; Uluwatu—zero 4 AM surcharge.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-sky-700 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/bali-airport-van-transfer-hiace"
            className="group flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block mb-0.5">
                Groups &amp; Surf Trips • From IDR 550,000 / van
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800">
                12-Seat Toyota HiAce Van &amp; Surfboard Transfers
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Up to 12 passengers, 10 large bags &amp; 7&apos;6&quot; surfboards or golf travel cases in one vehicle.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-700 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/bali-airport-to-fast-boat-harbor"
            className="group flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200 hover:border-amber-400 transition-all"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-0.5">
                Nusa Penida &amp; Gili Ports • From IDR 275,000
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-900">
                Bali Airport Transfer to Nusa Penida &amp; Gili Fast Boat Harbors
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Flat-rate port transfers with realistic flight-to-boat buffer timing guidance.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-700 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Sanity Blog Cards */}
        {featuredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => {
              const dateLabel = formatSanityDate(
                post._updatedAt || post.publishedAt
              );
              return (
                <article
                  key={post._id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-emerald-300 hover:shadow-sm transition-all group"
                >
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative h-44 w-full bg-slate-200 overflow-hidden"
                    >
                      {post.mainImage?.url ? (
                        <Image
                          src={optimizeSanityImageUrl(post.mainImage.url, 640)}
                          alt={post.mainImage.alt || post.title}
                          fill
                          unoptimized={isRemoteImageUrl(post.mainImage.url)}
                          className="object-cover group-hover:scale-103 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-emerald-900 text-white text-xs font-bold px-4 text-center">
                          {post.category || "Bali Transfer Guide"}
                        </div>
                      )}
                    </Link>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 mb-2">
                        <span className="font-bold text-emerald-700 uppercase tracking-wide">
                          {post.category || "Airport Guide"}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {dateLabel}
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                      </Link>
                      {post.excerpt && (
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs border-t border-slate-200/70">
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime || "4 min read"}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
