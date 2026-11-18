"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Clock, Sparkles, MapPin } from "lucide-react";
import { BookingWidget } from "./BookingWidget";
import type { CurrencyRateMap } from "@/data/destinations";

interface HeroSectionProps {
  currentCurrency: string;
  onOpenBookingModal: (bookingData: any) => void;
  selectedVehicleId?: string;
  onVehicleChange?: (vehicleId: string) => void;
  exchangeRates?: CurrencyRateMap;
  heroBadge?: string;
  heroSubtext?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentCurrency,
  onOpenBookingModal,
  selectedVehicleId,
  onVehicleChange,
  exchangeRates,
  heroBadge,
  heroSubtext,
}) => {
  return (
    <section className="relative w-full bg-slate-900 text-white overflow-hidden">
      {/* Background Image that covers the full section */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/innova-zenix.jpg"
          alt="Private Bali Airport Transfer Chauffeur at Ngurah Rai International Airport DPS"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center opacity-30 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-slate-900/65" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto pt-10 sm:pt-14 pb-14 sm:pb-18 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 mb-3 sm:mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-slate-200">
              {heroBadge || "Fixed Flat Fares • Zero Deposit • Zero Midnight Fee"}
            </span>
          </div>

          {/* Clean H1 */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
            Bali Airport Transfer <br />
            <span className="text-emerald-400">Private Chauffeur</span> &amp; Fixed Rates
          </h1>

          <p className="mt-3 text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
            {heroSubtext ? (
              heroSubtext
            ) : (
              <>
                Skip terminal taxi haggling with our direct <strong>Bali airport pickup</strong> from{" "}
                <strong>IDR 250,000</strong>. Your English-speaking driver waits outside Circle K at the DPS exit gate
                with your name sign—zero deposit required, cash on drop-off or online link, 24/7 with no midnight surcharge.
              </>
            )}
          </p>

          {/* 4 Clean USP Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> 60-Min Free Flight Wait
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Zero Deposit (Cash or Link)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Circle K Gate Meet &amp; Toll Incl.
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Free ATM/SIM Stop &amp; 24h Cancel
            </span>
          </div>
        </div>

        {/* Compact, Proportional Booking Bar */}
        <BookingWidget
          currentCurrency={currentCurrency}
          onOpenBookingModal={onOpenBookingModal}
          selectedVehicleId={selectedVehicleId}
          onVehicleChange={onVehicleChange}
          exchangeRates={exchangeRates}
        />
      </div>
    </section>
  );
};
