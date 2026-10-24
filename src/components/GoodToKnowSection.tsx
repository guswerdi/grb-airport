"use client";

import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Plane,
  ShieldCheck,
  Banknote,
  Car,
  Smartphone,
  Luggage,
  Baby,
  Clock,
  UserCheck,
  Wifi,
  CheckCircle2,
  MessageCircle,
  CalendarCheck,
  Info,
} from "lucide-react";
import { GOOD_TO_KNOW_ITEMS, GoodToKnowItem } from "@/data/goodToKnow";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  MapPin,
  Plane,
  ShieldCheck,
  Banknote,
  Car,
  Smartphone,
  Luggage,
  Baby,
  Clock,
  UserCheck,
  Sparkles,
  Wifi,
};

const CATEGORIES = [
  "All",
  "Arrival & Meeting",
  "Pricing & Tolls",
  "Flight Tracking",
  "Vehicles & Luggage",
  "Payment & Booking",
  "Traveler Perks",
] as const;

export const GoodToKnowSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredItems = GOOD_TO_KNOW_ITEMS.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  return (
    <section
      id="good-to-know"
      className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6 lg:px-8 border-t border-slate-200"
    >
      {/* Backwards-compatible anchor for legacy #faqs links */}
      <span id="faqs" className="absolute -top-24 pointer-events-none opacity-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Essential Traveler Tips & Facts
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Good to Know: Bali Airport Arrival &amp; Transfer Tips
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Direct, verified facts and local arrival advice for DPS Ngurah Rai Airport.
            Structured clearly for travelers, itinerary planners, and AI search engines — zero guesswork, zero hidden rules.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? GOOD_TO_KNOW_ITEMS.length
                : GOOD_TO_KNOW_ITEMS.filter((item) => item.category === cat).length;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600 ring-offset-1"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? "bg-emerald-700 text-emerald-100"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Good to Know Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const IconComponent = ICON_MAP[item.iconName] || Info;
            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:border-emerald-300 hover:shadow-md transition-all duration-200 group"
              >
                {/* Top Bar with Icon, Category, Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                {/* Key Fact Highlight Box (Direct AI-extractable statement) */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 mb-3.5">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-emerald-950 leading-relaxed">
                      <span className="font-extrabold text-emerald-900 uppercase tracking-wide text-[10px] mr-1">
                        Key Fact:
                      </span>
                      {item.keyFact}
                    </p>
                  </div>
                </div>

                {/* Detailed Authoritative Paragraph */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.summary}
                </p>
              </article>
            );
          })}
        </div>

        {/* Bottom Fast Assistance Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Have a special itinerary, odd landing time, or surfboard luggage?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Our 24/7 Bali airport concierge responds immediately on WhatsApp with personalized vehicle recommendations.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <a
              href="https://wa.me/6285190920033?text=Hi%20Great%20Bali%20Airport%20Transfer%2C%20I%20would%20like%20to%20ask%20about%20an%20airport%20transfer."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <a
              href="#rates-table"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer border border-slate-200"
            >
              <CalendarCheck className="w-4 h-4 text-slate-600" />
              View All Rates
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
