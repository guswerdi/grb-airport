"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  CalendarCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingWidget } from "@/components/BookingWidget";
import { BookingModal } from "@/components/BookingModal";
import { RouteInteractiveMap } from "@/components/RouteInteractiveMap";
import {
  CurrencyRateMap,
  DEPARTURE_LEAVE_GUIDE,
  Destination,
  FLEET_DETAILS,
  formatPrice,
  RATES_LAST_REVIEWED,
} from "@/data/destinations";
import { ROUTE_GEOMETRY } from "@/data/routeCoordinates";
import { TRANSFER_EXCLUSIONS, TRANSFER_INCLUSIONS } from "@/data/policies";

/** Current fare-review month rendered in UTC so server and client match. */
const RATES_REVIEWED_LABEL = new Date(RATES_LAST_REVIEWED).toLocaleDateString(
  "en-US",
  { month: "long", year: "numeric", timeZone: "UTC" }
);

interface RouteLandingPageProps {
  destination: Destination;
  heroImage: string;
  routeOverview: string;
  travelTips: string[];
  faqs: { question: string; answer: string }[];
  exchangeRates?: CurrencyRateMap;
}

export const RouteLandingPage: React.FC<RouteLandingPageProps> = ({
  destination,
  heroImage,
  routeOverview,
  travelTips,
  faqs,
  exchangeRates,
}) => {
  const [currency, setCurrency] = useState("USD");
  const [selectedVehicleId, setSelectedVehicleId] = useState("standard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<Record<string, unknown> | null>(null);

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
      sub: "Innova Zenix (1-5 Pax)",
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
    {
      id: "luxury",
      name: "VIP Luxury Alphard",
      sub: "Toyota Alphard (1-5 Pax)",
      rateKey: "luxury" as const,
      fleet: FLEET_DETAILS[3] || FLEET_DETAILS[1],
    },
  ];

  const selectedTier =
    vehicleTiers.find((t) => t.id === selectedVehicleId) ?? vehicleTiers[1];
  const selectedPriceIdr = destination.rates[selectedTier.rateKey];

  const handleOpenBookingModal = (bookingData?: Record<string, unknown>) => {
    if (bookingData) {
      setModalBookingData(bookingData);
    } else {
      setModalBookingData({
        transferType: "arrival",
        destination: destination,
        vehicle: selectedTier.fleet,
        priceIdr: selectedPriceIdr,
        currency: currency,
        exchangeRates,
        formattedPrice: formatPrice(selectedPriceIdr, currency, exchangeRates),
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
        "name": `Bali Airport Transfer to ${destination.name.split("(")[0].trim()}`,
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
      ...(ROUTE_GEOMETRY[destination.id]
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: ROUTE_GEOMETRY[destination.id].coordinates[0],
              longitude: ROUTE_GEOMETRY[destination.id].coordinates[1],
            },
          }
        : {}),
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
        name: "Big Van (Toyota HiAce Premio, 1-12 pax)",
        price: destination.rates.van,
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: `https://greatbaliairporttransfer.com/${destination.slug}`,
      },
      {
        "@type": "Offer",
        name: "VIP Luxury MPV (Toyota Alphard Executive, 1-5 pax)",
        price: destination.rates.luxury,
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: `https://greatbaliairporttransfer.com/${destination.slug}`,
      },
    ],
  };

  const shortDestName = destination.metaName || destination.name.split("(")[0].trim();
  const leaveGuide = DEPARTURE_LEAVE_GUIDE[destination.id] || {
    internationalBefore: "3.5 – 4.5 hrs",
    domesticBefore: "2.5 – 3.5 hrs",
  };
  const startingRateK = `${(destination.rates.standard / 1000).toLocaleString("en-US")}K`;

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
          <span className="text-slate-900 font-semibold">Bali Airport Transfer to {shortDestName}</span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="relative w-full bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={heroImage}
            alt={`Bali Airport to ${destination.name} Private Transfer`}
            fill
            priority
            fetchPriority="high"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto pt-10 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 sm:mb-10">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 mb-3 sm:mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-slate-200">
                Fixed All-Inclusive Fares • Zero Deposit • 10+ Yrs Local Chauffeurs
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Bali Airport Transfer to{" "}
              <span className="text-emerald-400">{shortDestName}</span>
            </h1>
            <p className="mt-1.5 text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              <span className="text-emerald-400">Bali Airport to {shortDestName}</span> From IDR {startingRateK} / Car
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              {destination.description} Direct private chauffeur pickup at Denpasar Ngurah Rai Airport (DPS) Circle K exit gate straight to your {shortDestName} hotel lobby or villa doorstep.
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-3 mt-5 text-xs text-slate-300 font-medium">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Distance: {destination.distanceKm} km from DPS</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Off-Peak: {destination.offPeakMinutes} • Peak: {destination.peakMinutes}</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Toll, Parking &amp; 60-Min Wait Included</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Rates reviewed:{" "}
                  <time dateTime={RATES_LAST_REVIEWED}>{RATES_REVIEWED_LABEL}</time>
                </span>
              </div>
            </div>
          </div>

          {/* Embedded Booking Widget */}
          <BookingWidget
            currentCurrency={currency}
            onOpenBookingModal={handleOpenBookingModal}
            preSelectedDestinationId={destination.id}
            selectedVehicleId={selectedVehicleId}
            onVehicleChange={setSelectedVehicleId}
            exchangeRates={exchangeRates}
          />
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-16 sm:py-24 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main 2 Cols */}
          <div className="lg:col-span-2 space-y-10">
            {/* 40-60 Word Plain-Sentence AI Overview Answer Box + Quick Facts */}
            <section
              id="route-answer-box"
              className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-200 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Bali Airport to {shortDestName}: Distance, Travel Time &amp; Fixed Price
                </h2>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Zero Deposit • 24/7 Flat Fares
                </span>
              </div>

              {/* Quotable 45-60 word plain-sentence paragraph for Google AI Overviews */}
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 mb-4">
                <strong>Bali Airport (DPS) to {shortDestName}</strong> is{" "}
                <strong>{destination.distanceKm} km</strong> and takes{" "}
                <strong>{destination.offPeakMinutes} off-peak</strong> (
                <strong>{destination.peakMinutes} in peak traffic</strong>). A private transfer costs{" "}
                <strong>{formatPrice(destination.rates.standard, "IDR")}</strong> ({formatPrice(destination.rates.standard, currency, exchangeRates)}) per Standard Car (1–4 pax),{" "}
                <strong>{formatPrice(destination.rates.comfort, "IDR")}</strong> per Comfort Innova (1–5 pax),{" "}
                <strong>{formatPrice(destination.rates.van, "IDR")}</strong> per 12-seat HiAce van, or{" "}
                <strong>{formatPrice(destination.rates.luxury, "IDR")}</strong> per VIP Toyota Alphard—including fuel, tolls, parking, flight tracking, and 60 minutes&apos; free waiting with zero deposit.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                  <p className="font-bold text-slate-900 mb-1">
                    Q: How much is Bali Airport to {shortDestName} per car?
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>{formatPrice(destination.rates.standard, currency, exchangeRates)}</strong> ({formatPrice(destination.rates.standard, "IDR", exchangeRates)}) Standard Avanza,{" "}
                    <strong>{formatPrice(destination.rates.comfort, currency, exchangeRates)}</strong> Comfort Innova,{" "}
                    <strong>{formatPrice(destination.rates.van, currency, exchangeRates)}</strong> 12-seat HiAce, or{" "}
                    <strong>{formatPrice(destination.rates.luxury, currency, exchangeRates)}</strong> VIP Alphard. Zero midnight fee.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                  <p className="font-bold text-slate-900 mb-1">
                    Q: What is the distance from Bali Airport to {shortDestName}?
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    The distance is <strong>{destination.distanceKm} km</strong>, taking <strong>{destination.offPeakMinutes} off-peak</strong> and <strong>{destination.peakMinutes} at peak</strong>. For {shortDestName} to airport departures, leave{" "}
                    <strong>{leaveGuide.internationalBefore}</strong> before International flights.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                  <p className="font-bold text-slate-900 mb-1">
                    Q: Where do I meet my driver at Bali Airport?
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Walk outside the arrivals exit straight to the <strong>Circle K minimart</strong> holding your name sign—with <strong>60 minutes free wait</strong> and a free ATM/SIM stop.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                  <p className="font-bold text-slate-900 mb-1">
                    Q: How do I pay &amp; is a deposit required?
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Zero deposit.</strong> Pay cash on drop-off (IDR, AUD, USD, EUR) or prepay before pickup via Visa/MC, Wise, or PayPal WhatsApp link (no in-car card machines).
                  </p>
                </div>
              </div>
            </section>

            {/* Route Overview */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                Route Overview &amp; What to Expect
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

              {/* Route Inclusions & Exclusions Breakdown */}
              <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4">
                  <h3 className="text-xs sm:text-sm font-extrabold text-emerald-950 flex items-center gap-1.5 mb-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Included in Your Fixed Rate</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {TRANSFER_INCLUSIONS.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5 mb-2.5">
                    <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Excluded / Optional Add-Ons</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {TRANSFER_EXCLUSIONS.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Full 4-Vehicle Price Table with Inclusions Next to the Number */}
            <section
              id="route-price-table"
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Bali Airport to {shortDestName} Price by Vehicle (All-Inclusive)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-5">
                Flat one-way price per private vehicle (not per person) for both Bali Airport to {shortDestName} arrivals and {shortDestName} to Bali Airport departures.
              </p>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs sm:text-sm text-left">
                  <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Vehicle Class</th>
                      <th className="py-3 px-3">Capacity</th>
                      <th className="py-3 px-3">Fixed Price / Car</th>
                      <th className="py-3 px-4">Included in Price</th>
                      <th className="py-3 px-3 text-right">Book</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {vehicleTiers.map((tier) => {
                      const priceIdr = destination.rates[tier.rateKey];
                      return (
                        <tr key={tier.id} className="hover:bg-slate-50 align-middle">
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">{tier.name}</span>
                            <span className="text-[11px] text-slate-500">{tier.fleet.model}</span>
                          </td>
                          <td className="py-3.5 px-3 text-slate-700 whitespace-nowrap">
                            1–{tier.fleet.passengers} pax • {tier.fleet.luggage} bags
                          </td>
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span className="font-extrabold text-emerald-900 text-sm block">
                              {formatPrice(priceIdr, currency, exchangeRates)}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              {formatPrice(priceIdr, "IDR", exchangeRates)}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-600">
                            Fuel, Mandara toll, DPS parking, 60-min free wait, flight tracking &amp; zero deposit
                          </td>
                          <td className="py-3.5 px-3 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedVehicleId(tier.id);
                                handleOpenBookingModal({
                                  transferType: "arrival",
                                  destination,
                                  vehicle: tier.fleet,
                                  priceIdr,
                                  currency,
                                  exchangeRates,
                                  formattedPrice: formatPrice(priceIdr, currency, exchangeRates),
                                  pickupDate: new Date().toISOString().split("T")[0],
                                  pickupTime: "12:00",
                                  flightNumber: "",
                                  hotelName: "",
                                  passengers: Math.min(2, tier.fleet.passengers),
                                  luggage: Math.min(2, tier.fleet.luggage),
                                  babySeatNeeded: false,
                                });
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Interactive Route Map with Animated Chauffeur Car */}
            <RouteInteractiveMap destination={destination} />

            {/* Popular Hotels Served */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                Popular Hotels &amp; Resorts Served in {shortDestName}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mb-4">
                Direct luggage handling and door-to-door drops from Bali Airport (DPS) to all {shortDestName} hotels, resorts, and private villas (fixed from {formatPrice(destination.rates.standard, "IDR")} per car):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {destination.popularHotels.map((hotel, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium text-slate-800">{hotel}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      {destination.offPeakMinutes}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Taxi vs Grab vs Private Transfer Comparison */}
            <section
              id="route-comparison"
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Bali Airport to {shortDestName}: Private Transfer vs Grab vs Airport Taxi
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-5">
                Unlike Grab or Gojek—which are not allowed to pick up at the immediate DPS arrivals exit curb and add airport lounge surcharges, peak-hour surge, and toll fees extra—our chauffeur meets you right outside customs at the Circle K exit gate at a 100% fixed price.
              </p>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs sm:text-sm text-left">
                  <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Feature ({destination.distanceKm} km Route)</th>
                      <th className="py-3 px-4 bg-emerald-50 text-emerald-950">Our Private Transfer</th>
                      <th className="py-3 px-4">Grab / Gojek at DPS</th>
                      <th className="py-3 px-4">Airport Counter Taxi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Fare to {shortDestName}</td>
                      <td className="py-3 px-4 bg-emerald-50/40 font-bold text-emerald-900">
                        Fixed {formatPrice(destination.rates.standard, "IDR")} / car (all-in)
                      </td>
                      <td className="py-3 px-4">Dynamic surge + airport lounge &amp; toll extra</td>
                      <td className="py-3 px-4">Fixed counter tariff + toll/night surcharges</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">DPS Pickup Point</td>
                      <td className="py-3 px-4 bg-emerald-50/40 font-medium text-slate-900">
                        Circle K at arrivals exit gate (name sign)
                      </td>
                      <td className="py-3 px-4">Walk with bags to ride-hail pickup lounge</td>
                      <td className="py-3 px-4">Queue at terminal taxi ticket counter</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Flight Delay Wait</td>
                      <td className="py-3 px-4 bg-emerald-50/40 font-medium text-slate-900">
                        60 mins free wait + live flight tracking
                      </td>
                      <td className="py-3 px-4">Driver cancels after ~5–10 mins wait</td>
                      <td className="py-3 px-4">No pre-assigned driver tracking</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Toll, Parking &amp; Night Fee</td>
                      <td className="py-3 px-4 bg-emerald-50/40 font-medium text-slate-900">
                        100% included • Zero 12 AM–5 AM fee
                      </td>
                      <td className="py-3 px-4">Passenger pays toll &amp; exit fee extra</td>
                      <td className="py-3 px-4">Passenger pays toll &amp; night surcharge</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Deposit &amp; Payment</td>
                      <td className="py-3 px-4 bg-emerald-50/40 font-medium text-slate-900">
                        Zero deposit • Cash on drop-off or link
                      </td>
                      <td className="py-3 px-4">In-app card or cash IDR</td>
                      <td className="py-3 px-4">Upfront payment at counter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Return Trip Section: Destination to Bali Airport (DPS) */}
            <section
              id="return-trip-to-airport"
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Return Trip: {shortDestName} to Bali Airport (DPS)
                </h2>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-900 border border-sky-200">
                  Same Fixed Rate • Free 24h Cancel
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Booking a <strong>{shortDestName} to Bali Airport</strong> departure transfer costs the exact same fixed per-car rate as arrival ({formatPrice(destination.rates.standard, "IDR")} Standard Car, {formatPrice(destination.rates.comfort, "IDR")} Comfort Innova, {formatPrice(destination.rates.van, "IDR")} 12-Seat HiAce, or {formatPrice(destination.rates.luxury, "IDR")} VIP Alphard). Your chauffeur arrives at your {shortDestName} hotel lobby or villa 10–15 minutes early, loads your luggage, and drops you directly at the DPS International or Domestic departures curb.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                  <span className="font-bold text-slate-900 block mb-1">
                    International Flight Pickup Buffer ({shortDestName} → DPS)
                  </span>
                  <span className="text-slate-600">
                    Leave {shortDestName} <strong>{leaveGuide.internationalBefore}</strong> before your scheduled departure (covers the {destination.distanceKm} km drive taking {destination.offPeakMinutes} off-peak / {destination.peakMinutes} peak + 3 hrs airline check-in).
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                  <span className="font-bold text-slate-900 block mb-1">
                    Domestic Flight Pickup Buffer ({shortDestName} → DPS)
                  </span>
                  <span className="text-slate-600">
                    Leave {shortDestName} <strong>{leaveGuide.domesticBefore}</strong> before domestic departures (covers drive time + 2 hrs domestic terminal check-in).
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleOpenBookingModal({
                    transferType: "departure",
                    destination,
                    vehicle: selectedTier.fleet,
                    priceIdr: selectedPriceIdr,
                    currency,
                    exchangeRates,
                    formattedPrice: formatPrice(selectedPriceIdr, currency, exchangeRates),
                    pickupDate: new Date().toISOString().split("T")[0],
                    pickupTime: "10:00",
                    flightNumber: "",
                    hotelName: "",
                    passengers: 2,
                    luggage: 2,
                    babySeatNeeded: false,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer"
              >
                Book {shortDestName} to Bali Airport Return ({formatPrice(selectedPriceIdr, currency, exchangeRates)})
              </button>
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

            {/* Good to Know: Route Essentials & Tips */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Essential Route Tips &amp; Good to Know
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Good to Know: Bali Airport Transfer to {destination.name.split("(")[0]}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Direct route facts, realistic travel times, and arrival advice for {destination.name.split("(")[0]}.
              </p>
              <div className="space-y-3.5">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-emerald-200 transition-colors">
                    <h3 className="font-bold text-slate-950 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-3.5 border-l-2 border-emerald-500/40">
                      {faq.answer}
                    </p>
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
                Bali Airport ⇄ {destination.name.split("(")[0]}
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
                          {formatPrice(priceIdr, currency, exchangeRates)}
                        </span>
                        <span
                          className={`text-[10px] ${
                            isSelected ? "text-emerald-700" : "text-slate-400"
                          }`}
                        >
                          {formatPrice(priceIdr, "IDR", exchangeRates)}
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
