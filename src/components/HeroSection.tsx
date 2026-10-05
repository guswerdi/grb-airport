"use client";

import React from "react";
import Image from "next/image";
import { Star, ShieldCheck, Clock, Sparkles, MapPin } from "lucide-react";
import { BookingWidget } from "./BookingWidget";

interface HeroSectionProps {
  currentCurrency: string;
  onOpenBookingModal: (bookingData: any) => void;
  selectedVehicleId?: string;
  onVehicleChange?: (vehicleId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentCurrency,
  onOpenBookingModal,
  selectedVehicleId,
  onVehicleChange,
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
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-medium text-slate-200">
              4.9/5 Rating • 4,850+ Verified Traveler Reviews
            </span>
          </div>

          {/* Clean H1 */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
            Bali Airport Transfer <br />
            <span className="text-emerald-400">Private Chauffeur</span> & Fixed Rates
          </h1>

          <p className="mt-3 text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
            Skip hectic taxi queues with our reliable <strong>Bali airport pickup</strong>.
            Your personal English-speaking driver greets you at the arrival hall with a personalized name sign.
            Top-rated <strong>Bali airport transfers</strong> with 100% fixed fares, flight tracking, and toll included.
          </p>

          {/* 4 Clean Value Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> 60-Min Free Flight Waiting
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Tollways & Parking Included
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Door-to-Door Villa Drop
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Free 12h Cancellation
            </span>
          </div>
        </div>

        {/* Compact, Proportional Booking Bar */}
        <BookingWidget
          currentCurrency={currentCurrency}
          onOpenBookingModal={onOpenBookingModal}
          selectedVehicleId={selectedVehicleId}
          onVehicleChange={onVehicleChange}
        />
      </div>
    </section>
  );
};
