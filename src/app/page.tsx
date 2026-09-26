"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustBar } from "@/components/TrustBar";
import { PopularRoutesSection } from "@/components/PopularRoutesSection";
import { FareCalculatorTable } from "@/components/FareCalculatorTable";
import { FleetSection } from "@/components/FleetSection";
import { ArrivalGuide } from "@/components/ArrivalGuide";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { BALI_DESTINATIONS, FLEET_DETAILS, Destination, formatPrice } from "@/data/destinations";
import { Phone, MessageCircle } from "lucide-react";

export default function HomePage() {
  const [currency, setCurrency] = useState<string>("USD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<any>(null);

  // Handle route selection from table or popular route cards
  const handleSelectRoute = (dest: Destination, vehicleType: string = "comfort") => {
    const selectedVeh = FLEET_DETAILS.find((v) => v.id === vehicleType) || FLEET_DETAILS[1];
    let priceIdr = dest.rates.comfort;
    if (vehicleType === "standard") priceIdr = dest.rates.standard;
    if (vehicleType === "luxury") priceIdr = dest.rates.luxury;
    if (vehicleType === "van") priceIdr = dest.rates.van;

    setModalBookingData({
      transferType: "arrival",
      destination: dest,
      vehicle: selectedVeh,
      priceIdr: priceIdr,
      currency: currency,
      formattedPrice: formatPrice(priceIdr, currency),
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

  const handleSelectRouteQuick = (destId: string) => {
    const dest = BALI_DESTINATIONS.find((d) => d.id === destId) || BALI_DESTINATIONS[0];
    handleSelectRoute(dest, "comfort");
  };

  const handleSelectVehicle = (vehicleId: string) => {
    const veh = FLEET_DETAILS.find((v) => v.id === vehicleId) || FLEET_DETAILS[0];
    const defaultDest = BALI_DESTINATIONS[0]; // Ubud
    let priceIdr = defaultDest.rates.standard;
    if (vehicleId === "comfort") priceIdr = defaultDest.rates.comfort;
    if (vehicleId === "luxury") priceIdr = defaultDest.rates.luxury;
    if (vehicleId === "van") priceIdr = defaultDest.rates.van;

    setModalBookingData({
      transferType: "arrival",
      destination: defaultDest,
      vehicle: veh,
      priceIdr: priceIdr,
      currency: currency,
      formattedPrice: formatPrice(priceIdr, currency),
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

  const handleOpenBookingModal = (bookingData?: any) => {
    if (bookingData) {
      setModalBookingData(bookingData);
    } else {
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
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Navigation */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={(newCurr) => setCurrency(newCurr)}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Hero Section with Interactive Fare Calculator */}
      <HeroSection
        currentCurrency={currency}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Trust & Guarantee Banner */}
      <TrustBar />

      {/* Popular Destination Routes */}
      <PopularRoutesSection
        currentCurrency={currency}
        onSelectRouteQuick={handleSelectRouteQuick}
      />

      {/* Fixed Rates Matrix Table */}
      <FareCalculatorTable
        currentCurrency={currency}
        onSelectRoute={(dest, vehType) => handleSelectRoute(dest, vehType)}
      />

      {/* Fleet Showcase */}
      <FleetSection
        currentCurrency={currency}
        onSelectVehicle={handleSelectVehicle}
      />

      {/* Denpasar Airport Arrival Guide */}
      <ArrivalGuide />

      {/* Traveler Reviews & Ratings */}
      <ReviewsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Reservation Checkout Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingData={modalBookingData}
      />

      {/* Floating 24/7 WhatsApp Chauffeur Concierge Button */}
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
}
