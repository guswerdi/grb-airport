"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { BALI_BLOG_POSTS, BlogPost } from "@/data/blogs";
import { Calendar, Clock, ArrowRight, BookOpen, User, ChevronRight } from "lucide-react";
import { BALI_DESTINATIONS, FLEET_DETAILS, formatPrice } from "@/data/destinations";

export default function BlogListingPage() {
  const [currency, setCurrency] = useState("USD");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<any>(null);

  const categories = ["All", "Airport Guide", "Cost & Comparison", "Travel Tips"];

  const filteredPosts = BALI_BLOG_POSTS.filter((post) => {
    if (activeCategory === "All") return true;
    return post.category === activeCategory;
  });

  const handleOpenBookingModal = () => {
    const defaultDest = BALI_DESTINATIONS[0];
    const defaultVeh = FLEET_DETAILS[1];
    setModalBookingData({
      transferType: "arrival",
      destination: defaultDest,
      vehicle: defaultVeh,
      priceIdr: defaultDest.rates.comfort,
      currency: currency,
      formattedPrice: formatPrice(defaultDest.rates.comfort, currency),
      pickupDate: new Date().toISOString().split("T")[0],
      pickupTime: "12:00",
      flightNumber: "",
      hotelName: "",
      passengers: 2,
      luggage: 2,
      babySeatNeeded: false,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={(curr) => setCurrency(curr)}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Blog & Guides</span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="bg-white border-b border-slate-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Bali Airport & Travel Guides
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Bali Airport Transfer Guides & Tips
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Essential arrival advice, transparent taxi cost breakdowns, and local Balinese chauffeur insights to make your holiday arrival effortless.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Blog Grid */}
      <main className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col hover:shadow-md hover:border-slate-300 transition-all group"
              >
                {/* Article Image */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs border border-slate-200">
                    {post.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2.5">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        {post.author.name[0]}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-800 block leading-tight">
                          {post.author.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block leading-tight">
                          {post.author.role}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 group-hover:text-emerald-800"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Booking CTA Box */}
          <div className="mt-16 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                Flying to Bali soon? Book your private airport pickup
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Guaranteed fixed rates from IDR 250,000. Free flight tracking, toll included, and meet & greet sign at DPS.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/#booking-widget"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
              >
                Calculate Fare & Book
              </Link>
              <a
                href="https://wa.me/6285190920033?text=Hello%20Great%20Bali%20Airport%20Transfer,%20I%20am%20looking%20to%20book%20an%20airport%20transfer"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors"
              >
                WhatsApp Direct
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingData={modalBookingData}
      />
    </div>
  );
}
