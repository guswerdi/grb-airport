"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustBar } from "@/components/TrustBar";
import { QuickAnswersSection } from "@/components/QuickAnswersSection";
import { PopularRoutesSection } from "@/components/PopularRoutesSection";
import { FareCalculatorTable } from "@/components/FareCalculatorTable";
import { FleetSection } from "@/components/FleetSection";
import { ArrivalGuide } from "@/components/ArrivalGuide";
import { TransportComparisonSection } from "@/components/TransportComparisonSection";
import { LatestGuidesSection } from "@/components/LatestGuidesSection";
import { GoodToKnowSection } from "@/components/GoodToKnowSection";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import {
  BALI_DESTINATIONS,
  CurrencyRateMap,
  Destination,
  EXCHANGE_RATES,
  FLEET_DETAILS,
  formatPrice,
} from "@/data/destinations";
import type { GoodToKnowItem } from "@/data/goodToKnow";
import type { SanityPost, SanitySiteSettings } from "@/lib/sanity/client";
import { MessageCircle } from "lucide-react";

interface HomeClientProps {
  exchangeRates?: CurrencyRateMap;
  ratesAreLive?: boolean;
  latestPosts?: SanityPost[];
  siteSettings?: SanitySiteSettings | null;
  dynamicFaqItems?: GoodToKnowItem[];
}

export const HomeClient: React.FC<HomeClientProps> = ({
  exchangeRates = EXCHANGE_RATES,
  ratesAreLive = false,
  latestPosts = [],
  siteSettings = null,
  dynamicFaqItems,
}) => {
  const [currency, setCurrency] = useState<string>("USD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<Record<string, unknown> | null>(null);
  const [sharedVehicleId, setSharedVehicleId] = useState<string>("standard");

  const handleSelectRoute = (dest: Destination, vehicleType: string = "standard") => {
    const selectedVeh = FLEET_DETAILS.find((v) => v.id === vehicleType) || FLEET_DETAILS[0];
    let priceIdr = dest.rates.standard;
    if (vehicleType === "comfort") priceIdr = dest.rates.comfort;
    if (vehicleType === "luxury") priceIdr = dest.rates.luxury;
    if (vehicleType === "van") priceIdr = dest.rates.van;

    setModalBookingData({
      transferType: "arrival",
      destination: dest,
      vehicle: selectedVeh,
      priceIdr,
      currency,
      exchangeRates,
      formattedPrice: formatPrice(priceIdr, currency, exchangeRates),
      pickupDate: new Date().toISOString().split("T")[0],
      pickupTime: "14:00",
      flightNumber: "",
      hotelName: "",
      passengers: selectedVeh.passengers >= 2 ? 2 : selectedVeh.passengers,
      luggage: selectedVeh.luggage >= 2 ? 2 : selectedVeh.luggage,
      babySeatNeeded: false,
    });
    setIsModalOpen(true);
  };

  const handleSelectRouteQuick = (destId: string, vehicleType: string = sharedVehicleId) => {
    const dest = BALI_DESTINATIONS.find((d) => d.id === destId) || BALI_DESTINATIONS[0];
    handleSelectRoute(dest, vehicleType);
  };

  const handleSelectVehicle = (vehicleId: string) => {
    const veh = FLEET_DETAILS.find((v) => v.id === vehicleId) || FLEET_DETAILS[0];
    const defaultDest = BALI_DESTINATIONS[0];
    let priceIdr = defaultDest.rates.standard;
    if (vehicleId === "comfort") priceIdr = defaultDest.rates.comfort;
    if (vehicleId === "luxury") priceIdr = defaultDest.rates.luxury;
    if (vehicleId === "van") priceIdr = defaultDest.rates.van;

    setModalBookingData({
      transferType: "arrival",
      destination: defaultDest,
      vehicle: veh,
      priceIdr,
      currency,
      exchangeRates,
      formattedPrice: formatPrice(priceIdr, currency, exchangeRates),
      pickupDate: new Date().toISOString().split("T")[0],
      pickupTime: "14:00",
      flightNumber: "",
      hotelName: "",
      passengers: 2,
      luggage: 2,
      babySeatNeeded: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenBookingModal = (bookingData?: Record<string, unknown>) => {
    if (bookingData) {
      setModalBookingData({ ...bookingData, exchangeRates });
    } else {
      const defaultDest = BALI_DESTINATIONS[0];
      const defaultVeh = FLEET_DETAILS.find((v) => v.id === sharedVehicleId) || FLEET_DETAILS[0];
      const rateKey = (sharedVehicleId as "standard" | "comfort" | "luxury" | "van") || "standard";
      const priceIdr = defaultDest.rates[rateKey] || defaultDest.rates.standard;
      setModalBookingData({
        transferType: "arrival",
        destination: defaultDest,
        vehicle: defaultVeh,
        priceIdr,
        currency,
        exchangeRates,
        formattedPrice: formatPrice(priceIdr, currency, exchangeRates),
        pickupDate: new Date().toISOString().split("T")[0],
        pickupTime: "12:00",
        flightNumber: "",
        hotelName: "",
        passengers: 2,
        luggage: 2,
        babySeatNeeded: false,
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={(newCurr) => setCurrency(newCurr)}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      <HeroSection
        currentCurrency={currency}
        onOpenBookingModal={handleOpenBookingModal}
        selectedVehicleId={sharedVehicleId}
        onVehicleChange={setSharedVehicleId}
        exchangeRates={exchangeRates}
        heroBadge={siteSettings?.heroBadge}
        heroSubtext={siteSettings?.heroSubtext}
      />

      <TrustBar />

      {/* Direct Answers & Clear USP Strip */}
      <QuickAnswersSection
        usps={siteSettings?.usps}
        directAnswers={siteSettings?.directAnswers}
        liveNotice={siteSettings?.liveNotice}
        ratesAreLive={ratesAreLive}
      />

      <PopularRoutesSection
        currentCurrency={currency}
        onSelectRouteQuick={handleSelectRouteQuick}
        selectedVehicleId={sharedVehicleId}
        onVehicleChange={setSharedVehicleId}
        exchangeRates={exchangeRates}
      />

      <FareCalculatorTable
        currentCurrency={currency}
        selectedVehicleId={sharedVehicleId}
        onSelectRoute={(dest, vehType) => handleSelectRoute(dest, vehType)}
        exchangeRates={exchangeRates}
        ratesAreLive={ratesAreLive}
      />

      <FleetSection
        currentCurrency={currency}
        onSelectVehicle={handleSelectVehicle}
        exchangeRates={exchangeRates}
      />

      <ArrivalGuide />

      <TransportComparisonSection />

      <LatestGuidesSection posts={latestPosts} />

      <GoodToKnowSection
        items={dynamicFaqItems && dynamicFaqItems.length > 0 ? dynamicFaqItems : undefined}
      />

      <Footer />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingData={modalBookingData}
      />

      <aside aria-label="WhatsApp Chauffeur Concierge" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <a
          href="https://wa.me/6285190920033?text=Hi%20Great%20Bali%20Airport%20Transfer,%20I%20would%20like%20to%20inquire%20about%20a%20private%20airport%20transfer"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 p-3 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl shadow-emerald-950/80 transition-all hover:scale-105 border border-emerald-400/30 group"
          aria-label="Direct 24/7 WhatsApp Chat"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
          </div>
          <span className="hidden sm:inline">24/7 WhatsApp Chauffeur</span>
        </a>
      </aside>
    </div>
  );
};
