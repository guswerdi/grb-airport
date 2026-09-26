"use client";

import React, { useState, useMemo } from "react";
import { Search, Clock, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import {
  BALI_DESTINATIONS,
  Destination,
  formatPrice,
} from "@/data/destinations";

interface FareCalculatorTableProps {
  currentCurrency: string;
  onSelectRoute: (destination: Destination, vehicleType: string) => void;
}

export const FareCalculatorTable: React.FC<FareCalculatorTableProps> = ({
  currentCurrency,
  onSelectRoute,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const regions = ["All", "South Bali", "Central Bali", "Uluwatu & Bukit", "North & East Bali"];

  const filteredDestinations = useMemo(() => {
    return BALI_DESTINATIONS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.popularHotels.some((h) => h.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.region.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion =
        selectedRegion === "All" || item.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, selectedRegion]);

  return (
    <section id="rates-table" className="py-16 sm:py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold mb-2">
            Guaranteed Fixed Rates Matrix
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bali Airport Transfer Rates & Tariffs
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Fixed pricing per vehicle (not per person). All rates include Bali Mandara tollway,
            DPS airport parking fee, fuel, and greeting chauffeur with your name sign.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          {/* Region Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedRegion === reg
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search area or resort (e.g. Ubud, W Bali)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Rates Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Mobile Swipe Guidance Banner */}
          <div className="flex md:hidden items-center justify-between px-3.5 py-2 bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500 font-medium">
            <span>👉 Swipe horizontally for all car options</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              3 Fleet Options
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[780px]">
              <thead>
                <tr className="bg-slate-50/90 text-slate-700 font-semibold text-xs border-b border-slate-200">
                  <th className="py-3.5 px-4 sm:px-6 min-w-[200px] align-bottom">
                    <span className="text-slate-900 font-bold block">Destination & Route</span>
                    <span className="font-normal text-[11px] text-slate-500">Bali Drop-off Zone</span>
                  </th>
                  <th className="py-3.5 px-3 text-center min-w-[120px] whitespace-nowrap align-bottom">
                    <span className="text-slate-900 font-bold block">Distance & Time</span>
                    <span className="font-normal text-[11px] text-slate-500">From DPS Airport</span>
                  </th>
                  <th className="py-3.5 px-3.5 text-right min-w-[130px] whitespace-nowrap align-bottom">
                    <span className="text-slate-900 font-bold block">Standard Car</span>
                    <span className="font-normal text-[11px] text-slate-500 block">
                      Avanza (1–4 Pax)
                    </span>
                  </th>
                  <th className="py-3.5 px-3.5 text-right min-w-[130px] whitespace-nowrap align-bottom bg-emerald-50/50">
                    <span className="text-emerald-900 font-bold block">Comfort Car</span>
                    <span className="font-normal text-[11px] text-emerald-700 block">
                      Innova (1–5 Pax)
                    </span>
                  </th>

                  <th className="py-3.5 px-3.5 text-right min-w-[130px] whitespace-nowrap align-bottom">
                    <span className="text-slate-900 font-bold block">Big Van</span>
                    <span className="font-normal text-[11px] text-slate-500 block">
                      HiAce (12 Pax)
                    </span>
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 text-center min-w-[90px] whitespace-nowrap align-bottom">
                    <span className="text-slate-900 font-bold block">Book</span>
                    <span className="font-normal text-[11px] text-slate-500">Instant</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredDestinations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No routes found matching "{searchTerm}". Please try another Bali area.
                    </td>
                  </tr>
                ) : (
                  filteredDestinations.map((dest) => (
                    <tr
                      key={dest.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="py-3.5 px-4 sm:px-6">
                        <Link href={`/${dest.slug}`} className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors hover:underline cursor-pointer block">
                          {dest.name}
                        </Link>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          Popular: {dest.popularHotels.slice(0, 3).join(", ")}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <span className="font-medium text-slate-800 block">
                          ~{dest.distanceKm} km
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {dest.durationMinutes}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <div className="font-bold text-slate-800">
                          {formatPrice(dest.rates.standard, currentCurrency)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {formatPrice(dest.rates.standard, "IDR")}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap bg-emerald-50/40">
                        <div className="font-bold text-emerald-800">
                          {formatPrice(dest.rates.comfort, currentCurrency)}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {formatPrice(dest.rates.comfort, "IDR")}
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <div className="font-bold text-slate-800">
                          {formatPrice(dest.rates.van, currentCurrency)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {formatPrice(dest.rates.van, "IDR")}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-center whitespace-nowrap">
                        <button
                          onClick={() => onSelectRoute(dest, "comfort")}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                        >
                          <span>Select</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>All prices include driver, fuel, Bali Mandara tollway, and airport parking fees.</span>
            </div>
            <div className="text-emerald-700 font-medium">
              Need a custom multi-destination drop or private Bali island tour? Chat with us on WhatsApp 24/7.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
