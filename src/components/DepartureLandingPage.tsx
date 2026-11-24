"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  CalendarCheck,
  AlertTriangle,
  PlaneTakeoff,
  MessageCircle,
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

const RATES_REVIEWED_LABEL = new Date(RATES_LAST_REVIEWED).toLocaleDateString(
  "en-US",
  { month: "long", year: "numeric", timeZone: "UTC" }
);

interface BufferGuidance {
  id: string;
  normalDrive: string;
  bufferedDrive: string;
  leaveIntl: string;
  leaveDom: string;
}

const DEPARTURE_BUFFERS: BufferGuidance[] = [
  {
    id: "kuta-legian",
    normalDrive: "15 – 25 mins",
    bufferedDrive: "30 – 45 mins",
    leaveIntl: "3.5 – 4 hrs before flight",
    leaveDom: "2.5 – 3 hrs before flight",
  },
  {
    id: "jimbaran",
    normalDrive: "15 – 25 mins",
    bufferedDrive: "30 – 40 mins",
    leaveIntl: "3.5 – 4 hrs before flight",
    leaveDom: "2.5 – 3 hrs before flight",
  },
  {
    id: "seminyak",
    normalDrive: "30 – 45 mins",
    bufferedDrive: "60 – 90 mins",
    leaveIntl: "4 – 4.5 hrs before flight",
    leaveDom: "3 – 3.5 hrs before flight",
  },
  {
    id: "nusa-dua",
    normalDrive: "20 – 30 mins",
    bufferedDrive: "35 – 45 mins",
    leaveIntl: "3.5 – 4 hrs before flight",
    leaveDom: "2.5 – 3 hrs before flight",
  },
  {
    id: "sanur",
    normalDrive: "25 – 35 mins",
    bufferedDrive: "45 – 60 mins",
    leaveIntl: "4 hrs before flight",
    leaveDom: "3 hrs before flight",
  },
  {
    id: "canggu",
    normalDrive: "45 – 75 mins",
    bufferedDrive: "90 – 120 mins",
    leaveIntl: "4.5 – 5 hrs before flight",
    leaveDom: "3.5 – 4 hrs before flight",
  },
  {
    id: "uluwatu",
    normalDrive: "45 – 65 mins",
    bufferedDrive: "75 – 105 mins",
    leaveIntl: "4.5 hrs before flight",
    leaveDom: "3.5 hrs before flight",
  },
  {
    id: "ubud",
    normalDrive: "60 – 90 mins",
    bufferedDrive: "120 – 150 mins",
    leaveIntl: "5 – 5.5 hrs before flight",
    leaveDom: "4 – 4.5 hrs before flight",
  },
  {
    id: "sidemen-candidasa",
    normalDrive: "90 – 120 mins",
    bufferedDrive: "135 – 165 mins",
    leaveIntl: "5.5 – 6 hrs before flight",
    leaveDom: "4.5 – 5 hrs before flight",
  },
  {
    id: "lovina-munduk",
    normalDrive: "2.5 – 3.5 hrs",
    bufferedDrive: "3.5 – 4 hrs",
    leaveIntl: "6.5 – 7 hrs before flight",
    leaveDom: "5.5 – 6 hrs before flight",
  },
  {
    id: "amed-tulamben",
    normalDrive: "2.5 – 3.5 hrs",
    bufferedDrive: "3.5 – 4 hrs",
    leaveIntl: "6.5 – 7 hrs before flight",
    leaveDom: "5.5 – 6 hrs before flight",
  },
];

const FAQS = [
  {
    question: "How much is a transfer from Ubud or Seminyak to Bali Airport (DPS)?",
    answer:
      "Departure transfers use the exact same fixed per-vehicle rates as arrivals (not per person). From Seminyak to DPS Airport, fares are IDR 250,000 (Standard Car, 1–4 pax), IDR 300,000 (Comfort Innova, 1–5 pax), and IDR 600,000 (HiAce Van, 1–12 pax). From Ubud to DPS Airport, fares are IDR 400,000 (Standard), IDR 500,000 (Comfort), and IDR 800,000 (HiAce). Tolls and fuel are included.",
  },
  {
    question: "How early should I leave Ubud, Canggu, or Seminyak for Bali Airport?",
    answer:
      "Allow 3 hours before international flights and 2 hours before domestic flights for check-in and immigration. Including Bali traffic buffers, leave Ubud 5–5.5 hours before an international flight, Canggu 4.5–5 hours prior, and Seminyak 4–4.5 hours prior. Add an extra 30–60 minutes if departing during peak afternoon congestion (3 PM–7 PM) or holidays.",
  },
  {
    question: "Is there an extra charge for early-morning or midnight hotel pickups?",
    answer:
      "No. Great Bali Airport Transfer operates 24/7 with zero early-morning or midnight surcharge. A 3:00 AM pickup from Ubud or Canggu costs the exact same fixed fare as a midday pickup.",
  },
  {
    question: "Does the driver pick us up directly from our private villa or hotel lobby?",
    answer:
      "Yes. Your chauffeur arrives at your hotel lobby or villa entrance 10–15 minutes before the scheduled pickup time. If your villa is on a narrow lane (common in Ubud and Canggu), share a Google Maps pin on WhatsApp when booking and our driver will coordinate the closest car-accessible point and assist with luggage.",
  },
  {
    question: "Are tolls and airport drop-off fees included in departure fares?",
    answer:
      "Yes. Vehicle hire, fuel, driver, Bali Mandara Ocean Tollway fees, and DPS departure drop-off fees are 100% included. No deposit is required, and you can cancel free up to 24 hours before pickup.",
  },
  {
    question: "Does the driver drop us at the International or Domestic terminal?",
    answer:
      "Both. Let us know your airline or flight number when booking so your chauffeur drives straight to the right departures ramp at I Gusti Ngurah Rai International Airport (DPS).",
  },
];

interface DepartureLandingPageProps {
  exchangeRates?: CurrencyRateMap;
}

export const DepartureLandingPage: React.FC<DepartureLandingPageProps> = ({
  exchangeRates,
}) => {
  const [currency, setCurrency] = useState("USD");
  const [selectedVehicleId, setSelectedVehicleId] = useState("standard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<Record<string, unknown> | null>(
    null
  );

  const departureRows = DEPARTURE_BUFFERS.map((buf) => {
    const dest = BALI_DESTINATIONS.find((d) => d.id === buf.id)!;
    return { ...buf, dest };
  });

  const handleOpenBookingModal = (bookingData?: Record<string, unknown>) => {
    if (bookingData) {
      setModalBookingData({ ...bookingData, exchangeRates });
    } else {
      const defaultDest =
        BALI_DESTINATIONS.find((d) => d.id === "ubud") || BALI_DESTINATIONS[0];
      const defaultVeh =
        FLEET_DETAILS.find((v) => v.id === selectedVehicleId) ||
        FLEET_DETAILS[0];
      const key =
        (selectedVehicleId as "standard" | "comfort" | "van" | "luxury") ||
        "standard";
      const priceIdr = defaultDest.rates[key] || defaultDest.rates.standard;
      setModalBookingData({
        transferType: "departure",
        destination: defaultDest,
        vehicle: defaultVeh,
        priceIdr,
        currency,
        exchangeRates,
        formattedPrice: formatPrice(priceIdr, currency, exchangeRates),
        pickupDate: new Date().toISOString().split("T")[0],
        pickupTime: "10:00",
        flightNumber: "",
        hotelName: "",
        passengers: 2,
        luggage: 2,
        babySeatNeeded: false,
      });
    }
    setIsModalOpen(true);
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Hotel to Bali Airport Departure Transfer",
    name: "Bali Airport Departure Transfer (Hotel or Villa to DPS)",
    description:
      "Pre-booked private hotel and villa transfers to Ngurah Rai International Airport (DPS) in Bali. Same fixed per-vehicle rates from IDR 250,000, zero early-morning surcharge, Bali Mandara toll included, 24/7 WhatsApp dispatch.",
    provider: {
      "@type": ["LocalBusiness", "TaxiService"],
      "@id": "https://greatbaliairporttransfer.com/#organization",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Bali, Indonesia",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: "250000",
      highPrice: "2400000",
      offerCount: String(BALI_DESTINATIONS.length * FLEET_DETAILS.length),
      availability: "https://schema.org/InStock",
      url: "https://greatbaliairporttransfer.com/bali-airport-departure-transfer",
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
        name: "Bali Airport Departure Transfer",
        item: "https://greatbaliairporttransfer.com/bali-airport-departure-transfer",
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
        onCurrencyChange={(curr) => setCurrency(curr)}
        onOpenBookingModal={() => handleOpenBookingModal()}
      />

      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">
            Bali Airport Departure Transfer (Hotel to DPS)
          </span>
        </div>
      </div>

      <header className="relative w-full bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="/images/dest-ubud.jpg"
            alt="Private Bali departure transfer from hotel or villa to DPS airport"
            fill
            priority
            fetchPriority="high"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto pt-10 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 mb-3 sm:mb-4">
              <PlaneTakeoff className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-slate-200">
                Hotel / Villa to DPS Airport • Zero Early-Morning Surcharge
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Bali Airport{" "}
              <span className="text-emerald-400">Departure Transfer</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Reliable private drop-off from your Ubud, Canggu, Seminyak,
              Uluwatu, or Sanur hotel directly to Ngurah Rai International or
              Domestic Departures (DPS). Fixed per-vehicle rates from{" "}
              <strong className="text-white">IDR 250,000</strong> (same rate 24/7,
              tolls &amp; fuel included, zero deposit).
            </p>

            <div className="flex flex-wrap gap-3 mt-5 text-xs text-slate-300 font-medium">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>24/7 Pickups (No Night Fee)</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mandara Toll &amp; Fuel Included</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Rates verified:{" "}
                  <time dateTime={RATES_LAST_REVIEWED}>{RATES_REVIEWED_LABEL}</time>
                </span>
              </div>
            </div>
          </div>

          <BookingWidget
            currentCurrency={currency}
            onOpenBookingModal={handleOpenBookingModal}
            selectedVehicleId={selectedVehicleId}
            onVehicleChange={setSelectedVehicleId}
            initialTransferType="departure"
            exchangeRates={exchangeRates}
          />
        </div>
      </header>

      <main className="py-16 sm:py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Quick Answer */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              How Early Should You Leave for Bali Airport (DPS)?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Airlines at Ngurah Rai Airport recommend arriving{" "}
              <strong>3 hours before international flights</strong> and{" "}
              <strong>2 hours before domestic flights</strong>. Because Bali
              traffic around the southern bypass, Sunset Road, and Canggu
              shortcuts slows sharply between <strong>3:00 PM and 7:00 PM</strong>,
              add an extra <strong>30–60 minutes</strong> buffer during afternoon
              rush hours or busy holiday periods.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Recommended Ubud &amp; Seminyak Departure Times:</strong>{" "}
                For an international flight, leave <strong>Ubud 5–5.5 hours</strong>{" "}
                prior, <strong>Canggu 4.5–5 hours</strong> prior, and{" "}
                <strong>Seminyak 4–4.5 hours</strong> prior. All fares below are
                flat <strong>per vehicle (not per person)</strong> with zero
                early-morning or midnight surcharge.
              </div>
            </div>
          </section>

          {/* Departure Buffer & Fare Matrix */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              2026 Hotel-to-DPS Departure Times &amp; Fixed Fares
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Prices are one-way per private vehicle and include fuel, driver,
              and Bali Mandara tollway fees. Switch currencies in the top bar for
              indicative USD, AUD, EUR, or GBP amounts.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[980px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Pickup Area</th>
                    <th className="py-3 px-3">Normal / Buffered Drive</th>
                    <th className="py-3 px-3">Leave (Intl / Dom)</th>
                    <th className="py-3 px-3 text-right">
                      Standard (Avanza)
                    </th>
                    <th className="py-3 px-3 text-right bg-emerald-50/60 text-emerald-900">
                      Comfort (Innova)
                    </th>
                    <th className="py-3 px-3 text-right">Big Van (HiAce)</th>
                    <th className="py-3 px-3 text-right">VIP Alphard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {departureRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <Link
                          href={`/${row.dest.slug}`}
                          className="hover:text-emerald-700 hover:underline"
                        >
                          {row.dest.metaName}
                        </Link>
                        <span className="block text-[11px] font-normal text-slate-400">
                          ~{row.dest.distanceKm} km to DPS
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        <span className="font-medium text-slate-800 block">
                          {row.normalDrive}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Buffer: {row.bufferedDrive}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700">
                        <span className="font-semibold block">
                          Intl: {row.leaveIntl}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Dom: {row.leaveDom}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-semibold">
                        {formatPrice(row.dest.rates.standard, currency, exchangeRates)}
                        <span className="text-[10px] font-normal text-slate-400 block">
                          {formatPrice(row.dest.rates.standard, "IDR", exchangeRates)}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-semibold bg-emerald-50/30 text-emerald-900">
                        {formatPrice(row.dest.rates.comfort, currency, exchangeRates)}
                        <span className="text-[10px] font-normal text-emerald-700 block">
                          {formatPrice(row.dest.rates.comfort, "IDR", exchangeRates)}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-semibold">
                        {formatPrice(row.dest.rates.van, currency, exchangeRates)}
                        <span className="text-[10px] font-normal text-slate-400 block">
                          {formatPrice(row.dest.rates.van, "IDR", exchangeRates)}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-semibold">
                        {formatPrice(row.dest.rates.luxury, currency, exchangeRates)}
                        <span className="text-[10px] font-normal text-slate-400 block">
                          {formatPrice(row.dest.rates.luxury, "IDR", exchangeRates)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero deposit required • Free cancellation up to 24h prior.
              </span>
              <a
                href="https://wa.me/6285190920033?text=Hi%20Great%20Bali%20Airport%20Transfer%2C%20I%20would%20like%20to%20book%20a%20hotel%20to%20DPS%20airport%20departure%20transfer."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Confirm your departure pickup time on WhatsApp
              </a>
            </div>
          </section>

          {/* Departure Checklist */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              Smooth Departure Checklist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                <h3 className="font-bold text-slate-900 mb-1">
                  1. WhatsApp Driver Details Sent 2 Hours Prior
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  You receive your chauffeur&apos;s name, WhatsApp contact, and
                  license plate 2 hours before your scheduled hotel or villa
                  pickup—including early-morning 2 AM–6 AM departures.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                <h3 className="font-bold text-slate-900 mb-1">
                  2. Villa Gate &amp; Luggage Assistance
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Share a Google Maps pin if your villa sits off a narrow lane in
                  Ubud, Seminyak, or Canggu. Your chauffeur helps load bags and
                  coordinates directly with reception or villa staff.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                <h3 className="font-bold text-slate-900 mb-1">
                  3. Optional En-Route Stop Included
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Need to stop by a bank ATM, convenience store, or souvenir shop
                  before reaching the terminal? Ask your chauffeur along the way
                  at no extra fee for quick stops.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                <h3 className="font-bold text-slate-900 mb-1">
                  4. Direct Terminal Ramp Drop-Off
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  We drop you directly outside DPS International or Domestic
                  Departures—no walking across parking garages with heavy
                  suitcases or surfboards.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions: Hotel to Bali Airport Transfers
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-200"
                >
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
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
