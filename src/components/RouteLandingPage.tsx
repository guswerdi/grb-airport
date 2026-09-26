"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Star,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingWidget } from "@/components/BookingWidget";
import { BookingModal } from "@/components/BookingModal";
import { Destination, FLEET_DETAILS, formatPrice } from "@/data/destinations";

interface RouteLandingPageProps {
  destination: Destination;
  heroImage: string;
  routeOverview: string;
  travelTips: string[];
  faqs: { question: string; answer: string }[];
}

export const RouteLandingPage: React.FC<RouteLandingPageProps> = ({
  destination,
  heroImage,
  routeOverview,
  travelTips,
  faqs,
}) => {
  const [currency, setCurrency] = useState("USD");
  const [selectedVehicleId, setSelectedVehicleId] = useState("comfort");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<any>(null);

  const vehicleTiers = [
    {
      id: "standard",
      name: "Standard Car",
      sub: "Avanza (1-4 Pax)",
      rateKey: "standard" as const,
      fleet: FLEET_DETAILS[0],
    },
    {
      id: "comfort",
      name: "Comfort Car",
      sub: "Innova (1-5 Pax)",
      rateKey: "comfort" as const,
      fleet: FLEET_DETAILS[1],
    },
    {
      id: "van",
      name: "Big Van",
      sub: "HiAce (1-12 Pax)",
      rateKey: "van" as const,
      fleet: FLEET_DETAILS[2],
    },
  ];

  const selectedTier =
    vehicleTiers.find((t) => t.id === selectedVehicleId) ?? vehicleTiers[1];
  const selectedPriceIdr = destination.rates[selectedTier.rateKey];

  const handleOpenBookingModal = (bookingData?: any) => {
    if (bookingData) {
      setModalBookingData(bookingData);
    } else {
      setModalBookingData({
        transferType: "arrival",
        destination: destination,
        vehicle: selectedTier.fleet,
        priceIdr: selectedPriceIdr,
        currency: currency,
        formattedPrice: formatPrice(selectedPriceIdr, currency),
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://greatbaliairporttransfer.com/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `DPS to ${destination.name.split("(")[0].trim()}`,
        "item": `https://greatbaliairporttransfer.com/${destination.slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Private Airport Transfer",
    name: `Bali Airport (DPS) to ${destination.name} Private Transfer`,
    description: `Fixed-price private airport transfer from I Gusti Ngurah Rai International Airport (DPS) to ${destination.name}. Meet & greet with name sign, free flight tracking, toll and parking included.`,
    provider: {
      "@type": "TaxiService",
      "@id": "https://greatbaliairporttransfer.com/#organization",
      name: "Great Bali Airport Transfer",
    },
    areaServed: {
      "@type": "Place",
      name: `${destination.name}, Bali, Indonesia`,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Standard Car (Toyota Avanza, 1-4 pax)",
        price: destination.rates.standard,
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: `https://greatbaliairporttransfer.com/${destination.slug}`,
      },
      {
        "@type": "Offer",
        name: "Comfort Car (Toyota Innova Zenix, 1-5 pax)",
        price: destination.rates.comfort,
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: `https://greatbaliairporttransfer.com/${destination.slug}`,
      },
      {
        "@type": "Offer",
        name: "VIP Alphard (1-4 pax)",
        price: destination.rates.luxury,
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: `https://greatbaliairporttransfer.com/${destination.slug}`,
      },
      {
        "@type": "Offer",
        name: "Big Van (Toyota HiAce Premio, 1-12 pax)",
        price: destination.rates.van,
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: `https://greatbaliairporttransfer.com/${destination.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* SEO & GEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar
        currentCurrency={currency}
        onCurrencyChange={(curr) => setCurrency(curr)}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span>Routes</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">DPS to {destination.name.split("(")[0]}</span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="relative w-full bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={heroImage}
            alt={`Bali Airport Transfer to ${destination.name}`}
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto pt-10 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 sm:mb-10">
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

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Bali Airport Transfer to{" "}
              <span className="text-emerald-400">{destination.name.split("(")[0]}</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              {destination.description} Private chauffeur meet & greet at Denpasar Ngurah Rai Airport (DPS) directly to your hotel lobby or villa doorstep.
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-3 mt-5 text-xs text-slate-300 font-medium">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Distance: ~{destination.distanceKm} km</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Duration: {destination.durationMinutes}</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Toll & Parking Included</span>
              </div>
            </div>
          </div>

          {/* Embedded Booking Widget */}
          <BookingWidget
            currentCurrency={currency}
            onOpenBookingModal={handleOpenBookingModal}
            preSelectedDestinationId={destination.id}
          />
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-16 sm:py-24 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main 2 Cols */}
          <div className="lg:col-span-2 space-y-10">
            {/* Route Overview */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                Route Overview & What to Expect
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                {routeOverview}
              </p>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                <div>
                  <strong className="block mb-0.5 font-bold">Local Traffic Tip:</strong>
                  {destination.trafficTip}
                </div>
              </div>
            </section>

            {/* Popular Hotels Served */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                Popular Hotels & Resorts on This Route
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mb-4">
                We provide direct luggage handling and door-to-door drops to all accommodations in this area:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {destination.popularHotels.map((hotel, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{hotel}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Chauffeur Travel Tips */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                Essential Tips for Travelers
              </h2>
              <div className="space-y-3">
                {travelTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Route Specific FAQs */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
                FAQs: Bali Airport Transfer to {destination.name.split("(")[0]}
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm mb-1.5">{faq.question}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Price summary */}
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs sticky top-24">
              <h3 className="text-base font-bold text-slate-900 mb-0.5">
                Fixed Transfer Rates
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                DPS Airport ⇄ {destination.name.split("(")[0]}
              </p>

              <div className="space-y-2.5 text-xs">
                {vehicleTiers.map((tier) => {
                  const isSelected = tier.id === selectedVehicleId;
                  const priceIdr = destination.rates[tier.rateKey];
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedVehicleId(tier.id)}
                      aria-pressed={isSelected}
                      className={`w-full p-3 rounded-xl flex justify-between items-center text-left border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-400"
                          : "bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                            isSelected
                              ? "border-emerald-600"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-emerald-600 block" />
                          )}
                        </span>
                        <div>
                          <span
                            className={`font-bold block ${
                              isSelected ? "text-emerald-900" : "text-slate-900"
                            }`}
                          >
                            {tier.name}
                          </span>
                          <span
                            className={`text-[11px] ${
                              isSelected ? "text-emerald-700" : "text-slate-500"
                            }`}
                          >
                            {tier.sub}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-bold text-sm block ${
                            isSelected ? "text-emerald-900" : "text-slate-900"
                          }`}
                        >
                          {formatPrice(priceIdr, currency)}
                        </span>
                        <span
                          className={`text-[10px] ${
                            isSelected ? "text-emerald-700" : "text-slate-400"
                          }`}
                        >
                          {formatPrice(priceIdr, "IDR")}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                <a
                  href={`https://wa.me/6285190920033?text=${encodeURIComponent(
                    `Hi Great Bali Airport Transfer, I want to book a transfer from DPS to ${destination.name} with a ${selectedTier.name} (${selectedTier.fleet.model}) - fixed rate ${formatPrice(selectedPriceIdr, "IDR")}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  Book on WhatsApp
                </a>

                <button
                  onClick={() => handleOpenBookingModal()}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer"
                >
                  Reserve Online
                </button>
              </div>
            </div>
          </aside>
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
};
