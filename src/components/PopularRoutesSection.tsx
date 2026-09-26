"use client";

import React from "react";
import Image from "next/image";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { formatPrice } from "@/data/destinations";

interface PopularRoutesSectionProps {
  currentCurrency: string;
  onSelectRouteQuick: (destId: string) => void;
}

export const PopularRoutesSection: React.FC<PopularRoutesSectionProps> = ({
  currentCurrency,
  onSelectRouteQuick,
}) => {
  const topRoutes = [
    {
      id: "seminyak",
      slug: "bali-airport-transfer-to-seminyak",
      title: "DPS Airport to Seminyak",
      tag: "Beach Clubs & Villas",
      distance: "12 km",
      time: "30 - 45 min",
      priceIdr: 250000,
      image: "/images/dest-seminyak.jpg",
      highlight: "Ku De Ta, Potato Head, W Bali, Petitenget, Oberoi",
      description: "Direct transfer to Bali's stylish beachfront district. Arrive refreshed and ready for beachside sunset cocktails.",
    },
    {
      id: "canggu",
      slug: "bali-airport-transfer-to-canggu",
      title: "DPS Airport to Canggu",
      tag: "Surfing & Cafes",
      distance: "19 km",
      time: "45 - 75 min",
      priceIdr: 325000,
      image: "/images/dest-seminyak.jpg",
      highlight: "Berawa Beach, Batu Bolong, Echo Beach, Atlas Beach Fest, Finns",
      description: "Fast transit avoiding notorious shortcut bottlenecks with our experienced local drivers and optimized routing.",
    },
    {
      id: "uluwatu",
      slug: "bali-airport-transfer-to-uluwatu",
      title: "DPS Airport to Uluwatu",
      tag: "Clifftop Resorts & Surf",
      distance: "22 km",
      time: "45 - 65 min",
      priceIdr: 325000,
      image: "/images/dest-uluwatu.jpg",
      highlight: "Bulgari Resort, Alila Uluwatu, Six Senses, Bingin, Padang Padang",
      description: "Climb to the southern peninsula cliffs. Breathtaking ocean panoramas, legendary surf breaks, and clifftop villas.",
    },
    {
      id: "ubud",
      slug: "bali-airport-transfer-to-ubud",
      title: "DPS Airport to Ubud",
      tag: "Cultural & Wellness",
      distance: "38 km",
      time: "60 - 90 min",
      priceIdr: 400000,
      image: "/images/dest-ubud.jpg",
      highlight: "Four Seasons Sayan, Mandapa Ritz-Carlton, Viceroy, Monkey Forest",
      description: "Scenic private transfer to central Ubud. Enjoy a peaceful drive through Balinese artisan villages and rainforest valleys.",
    },
  ];

  return (
    <section id="popular-routes" className="py-16 sm:py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> High-Demand Routes
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Bali Airport Transfer Routes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Fixed private rates from Denpasar Ngurah Rai Airport (DPS) to Bali's most coveted destinations.
            </p>
          </div>

          <a
            href="#rates-table"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold text-xs tracking-wide"
          >
            <span>View All Bali Rates & Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Route Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div className="relative h-44 w-full bg-slate-100">
                <Image
                  src={route.image}
                  alt={route.title}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs border border-slate-200">
                  {route.tag}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {route.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500 my-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {route.distance}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {route.time}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {route.description}
                  </p>

                  <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 mb-3">
                    <span className="text-slate-700 font-medium">Hotels: </span>
                    {route.highlight}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Fixed From
                    </span>
                    <span className="text-base font-extrabold text-slate-900">
                      {formatPrice(route.priceIdr, currentCurrency)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectRouteQuick(route.id);
                      document.getElementById("booking-widget")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
