import React from "react";
import { Star, CheckCircle, ThumbsUp } from "lucide-react";
import { BALI_REVIEWS } from "@/data/reviews";

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" /> 4,850+ Verified Traveler Reviews
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Travelers Worldwide
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Real experiences from families, couples, and solo travelers arriving at Bali Ngurah Rai Airport.
          </p>

          <div className="flex items-center justify-center gap-1.5 mt-3 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-slate-900 font-bold text-sm ml-2">
              4.9 / 5.0 Average Rating
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BALI_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">
                    {review.date}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-700 font-medium mb-3 flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{review.route}</span>
                  <span className="text-slate-500">{review.vehicle}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                  "{review.title}"
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {review.comment}
                </p>
              </div>

              {/* Author info */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{review.author}</span>
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <span>{review.countryFlag}</span>
                    <span>{review.country}</span>
                  </div>
                </div>

                <div className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                  Verified Trip
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
