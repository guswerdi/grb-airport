"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  ChevronRight,
  CalendarCheck,
  MessageCircle,
  Users,
  Briefcase,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingWidget } from "@/components/BookingWidget";
import { BookingModal } from "@/components/BookingModal";
import {
  BALI_DESTINATIONS,
  CurrencyRateMap,
  FLEET_DETAILS,
  formatPrice,
  RATES_LAST_REVIEWED,
} from "@/data/destinations";
import { PAYMENT_POLICY } from "@/data/policies";

const RATES_REVIEWED_LABEL = new Date(RATES_LAST_REVIEWED).toLocaleDateString(
  "en-US",
  { month: "long", year: "numeric", timeZone: "UTC" }
);

const FAQS = [
  {
    question: "How much does a VIP Toyota Alphard airport transfer cost in Bali?",
    answer:
      "Fixed one-way Toyota Alphard Executive rates from Bali Airport (DPS) are IDR 1,800,000 (~$112 USD) to South Bali (Kuta, Seminyak, Jimbaran, Nusa Dua, Nusa Dua Hills, Tanjung Benoa, Kerobokan, and Sanur); IDR 2,400,000 (~$149 USD) to Canggu, Uluwatu (Bulgari / Alila / Six Senses), Ubud (Four Seasons Sayan / Mandapa), Tanah Lot, Klungkung, and Tegallalang; and IDR 3,500,000 (~$217 USD) to Padangbai, Munduk, Lovina, and Amed.",
  },
  {
    question: "How many passengers and suitcases fit inside the Toyota Alphard?",
    answer:
      "Our Toyota Alphard Executive comfortably seats up to 5 passengers with 4 large check-in suitcases (ideal for 2–4 adults enjoying first-class reclining captain chairs with ottomans).",
  },
  {
    question: "What is included in the VIP luxury Bali airport transfer?",
    answer:
      "Every VIP Alphard booking includes Circle K exit-gate meet-and-greet with your personalized name board, full luggage escort, 60 minutes complimentary flight delay waiting, Bali Mandara Ocean Tollway & DPS airport parking fees, dual-zone climate control, fast USB-C charging, and 24/7 flat pricing with zero midnight surcharge.",
  },
  {
    question: "Is a deposit required to reserve a Toyota Alphard at Bali Airport?",
    answer:
      `No deposit is required. ${PAYMENT_POLICY.shortSummary}`,
  },
  {
    question: "Can we book a return VIP Alphard transfer from our resort back to DPS Airport?",
    answer:
      "Yes—hotel-to-DPS departure transfers in the Toyota Alphard cost the exact same fixed rate per vehicle with free 24-hour cancellation.",
  },
];

interface VipAlphardLandingPageProps {
  exchangeRates?: CurrencyRateMap;
}

export const VipAlphardLandingPage: React.FC<VipAlphardLandingPageProps> = ({
  exchangeRates,
}) => {
  const [currency, setCurrency] = useState("USD");
  const [selectedVehicleId, setSelectedVehicleId] = useState("luxury");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<Record<string, unknown> | null>(
    null
  );

  const alphardVehicle =
    FLEET_DETAILS.find((v) => v.id === "luxury") || FLEET_DETAILS[1];

  const handleOpenBookingModal = (bookingData?: Record<string, unknown>) => {
    if (bookingData) {
      setModalBookingData({ ...bookingData, exchangeRates });
    } else {
      const defaultDest =
        BALI_DESTINATIONS.find((d) => d.id === "nusa-dua") || BALI_DESTINATIONS[0];
      setModalBookingData({
        transferType: "arrival",
        destination: defaultDest,
        vehicle: alphardVehicle,
        priceIdr: defaultDest.rates.luxury,
        currency,
        exchangeRates,
        formattedPrice: formatPrice(defaultDest.rates.luxury, currency, exchangeRates),
        pickupDate: new Date().toISOString().split("T")[0],
        pickupTime: "14:00",
        flightNumber: "",
        hotelName: "",
        passengers: 2,
        luggage: 3,
        babySeatNeeded: false,
      });
    }
    setIsModalOpen(true);
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "VIP Luxury Toyota Alphard Bali Airport Transfer",
    name: "Bali VIP Airport Transfer — Toyota Alphard Executive Chauffeur",
    description:
      "First-class private Toyota Alphard Executive airport transfer from I Gusti Ngurah Rai Airport (DPS) to Nusa Dua, Uluwatu, Seminyak, Canggu, and Ubud. Fixed fares from IDR 1,800,000 per vehicle with zero deposit.",
    provider: {
      "@type": ["LocalBusiness", "TaxiService"],
      "@id": "https://greatbaliairporttransfer.com/#organization",
    },
    offers: {
      "@type": "Offer",
      price: "1800000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: "https://greatbaliairporttransfer.com/bali-airport-transfer-vip-alphard",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://greatbaliairporttransfer.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "VIP Toyota Alphard Transfer",
        item: "https://greatbaliairporttransfer.com/bali-airport-transfer-vip-alphard",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
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
        onCurrencyChange={setCurrency}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">
            VIP Luxury Toyota Alphard Transfer
          </span>
        </div>
      </div>

      <header className="relative bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-alphard.jpg"
            alt="Bali VIP Luxury Airport Transfer Toyota Alphard Executive"
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 mb-4 text-xs font-medium text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Captain Chairs • First-Class DPS Arrival</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Bali VIP Airport Transfer: <span className="text-emerald-400">Toyota Alphard</span> From IDR 1.8M
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Arrive at your 5-star Bali resort or private villa in whisper-quiet luxury. Fixed per-vehicle <strong>Toyota Alphard airport transfer</strong> fares from <strong>IDR 1,800,000</strong>—with Circle K exit-gate chauffeur meet &amp; greet, 60-min free flight wait, toll included, and zero deposit.
            </p>
            <div className="flex flex-wrap gap-3 mt-5 text-xs text-slate-300 font-medium">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>1–5 Passengers (Captain Seats)</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>Up to 4 Large Suitcases</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Deposit • Cash or Link</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Rates verified: <time dateTime={RATES_LAST_REVIEWED}>{RATES_REVIEWED_LABEL}</time>
                </span>
              </div>
            </div>
          </div>

          <BookingWidget
            currentCurrency={currency}
            onOpenBookingModal={handleOpenBookingModal}
            preSelectedDestinationId="nusa-dua"
            selectedVehicleId={selectedVehicleId}
            onVehicleChange={setSelectedVehicleId}
            exchangeRates={exchangeRates}
          />
        </div>
      </header>

      <main className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* AI Overview Answer Box */}
          <section className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3">
              Bali VIP Luxury Airport Transfer (Toyota Alphard) at a Glance
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              A private <strong>VIP Toyota Alphard airport transfer</strong> from Bali Airport (DPS) costs a fixed{" "}
              <strong>IDR 1,800,000 (~$112 USD)</strong> to Nusa Dua, Nusa Dua Hills (Apurva Kempinski / Ritz-Carlton), Seminyak, Jimbaran, Kuta, Sanur, Tanjung Benoa, or Kerobokan;{" "}
              <strong>IDR 2,400,000 (~$149 USD)</strong> to Canggu, Uluwatu (Bulgari / Alila / Six Senses), Ubud (Four Seasons Sayan / Mandapa), Tanah Lot, Klungkung, or Tegallalang; and{" "}
              <strong>IDR 3,500,000 (~$217 USD)</strong> to Padangbai, Munduk, Lovina, or Amed—seating up to 5 passengers with 4 suitcases, fuel, tolls, parking, flight tracking, and 60 minutes&apos; free waiting included with zero deposit.
            </p>
          </section>

          {/* All 18 Zone Rates for VIP Alphard */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              Fixed Toyota Alphard Airport Transfer Rates (All 18 Bali Zones)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-5">
              All-inclusive one-way rates per Toyota Alphard Executive vehicle for both DPS arrivals and resort-to-airport departures.
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Destination &amp; 5-Star Resorts</th>
                    <th className="py-3 px-3">Distance &amp; Time</th>
                    <th className="py-3 px-3 text-right">VIP Alphard (1–5 Pax)</th>
                    <th className="py-3 px-3 text-right">Book</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BALI_DESTINATIONS.map((dest) => (
                    <tr key={dest.id} className="hover:bg-slate-50 align-middle">
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/${dest.slug}`}
                          className="font-bold text-slate-900 hover:text-emerald-700 hover:underline block"
                        >
                          {dest.name}
                        </Link>
                        <span className="text-[11px] text-slate-500">
                          {dest.popularHotels.slice(0, 3).join(", ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        <span className="font-semibold text-slate-800 block">{dest.distanceKm} km</span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {dest.offPeakMinutes} ({dest.peakMinutes} peak)
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-extrabold text-emerald-900 whitespace-nowrap">
                        {formatPrice(dest.rates.luxury, currency, exchangeRates)}
                        <span className="text-[10px] font-normal text-slate-500 block">
                          {formatPrice(dest.rates.luxury, "IDR", exchangeRates)}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenBookingModal({
                              transferType: "arrival",
                              destination: dest,
                              vehicle: alphardVehicle,
                              priceIdr: dest.rates.luxury,
                              currency,
                              exchangeRates,
                              formattedPrice: formatPrice(dest.rates.luxury, currency, exchangeRates),
                              pickupDate: new Date().toISOString().split("T")[0],
                              pickupTime: "14:00",
                              flightNumber: "",
                              hotelName: "",
                              passengers: 2,
                              luggage: 3,
                              babySeatNeeded: false,
                            })
                          }
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">
              VIP Toyota Alphard Airport Transfer FAQs
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.question} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                Arriving at DPS for a 5-Star Resort or Honeymoon Villa?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Book your executive Toyota Alphard directly on WhatsApp with zero deposit.
              </p>
            </div>
            <a
              href="https://wa.me/6285190920033?text=Hi%20Great%20Bali%20Airport%20Transfer%2C%20I%20would%20like%20to%20book%20a%20VIP%20Toyota%20Alphard%20airport%20transfer."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wide hover:bg-emerald-400 transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book VIP Alphard on WhatsApp</span>
            </a>
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
};
