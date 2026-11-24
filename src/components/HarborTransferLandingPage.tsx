"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Anchor,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  CalendarCheck,
  MessageCircle,
  AlertTriangle,
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

const HARBOR_PORTS = [
  {
    id: "sanur",
    portLabel: "Sanur Fast Boat Harbor (Matahari Terbit)",
    islands: "Nusa Penida, Nusa Lembongan, Nusa Ceningan",
    bufferAdvice: "Allow at least 2.5 hrs between flight landing & boat departure",
  },
  {
    id: "klungkung",
    portLabel: "Kusamba / Banjar Bias Port (Klungkung)",
    islands: "Nusa Penida (Sampalan / Buyuk short crossing)",
    bufferAdvice: "Allow at least 3 hrs between flight landing & boat check-in",
  },
  {
    id: "sidemen-candidasa",
    portLabel: "Padangbai Fast Boat Harbor (East Bali)",
    islands: "Gili Trawangan, Gili Air, Gili Meno, Bangsal / Lombok",
    bufferAdvice: "Allow 3.5 – 4 hrs between landing & boat boarding (most Gili boats leave 9 AM–1 PM)",
  },
  {
    id: "amed-tulamben",
    portLabel: "Amed Harbor / Northeast Crossing",
    islands: "Gili Islands & North Lombok coastal departures",
    bufferAdvice: "Best for overnight stays in Amed before morning Gili boats",
  },
];

const FAQS = [
  {
    question: "How much is a transfer from Bali Airport (DPS) to Sanur or Padangbai harbor?",
    answer:
      "Flat per-vehicle fares are IDR 275,000 (~$17 USD) to Sanur Harbor, IDR 400,000 to Klungkung / Kusamba Port, and IDR 850,000 to Padangbai Harbor in Standard Car (Avanza/Veloz, 1–4 pax)—with toll, parking, and fuel 100% included.",
  },
  {
    question: "How much buffer time do I need between my flight landing and a fast boat?",
    answer:
      "Allow roughly 2.5 hours from touchdown to a Sanur fast boat (immigration + baggage takes 45–60 min, plus 25–35 min drive) and 3.5–4 hours for Padangbai fast boats to Gili Trawangan or Lombok.",
  },
  {
    question: "Where do we meet our driver at Bali Airport before heading to the harbor?",
    answer:
      "Walk straight out of DPS arrivals to the Circle K minimart at the exit gate where your chauffeur waits holding your name sign. Complimentary waiting time is 60 minutes from actual landing.",
  },
  {
    question: "Do you pick up passengers returning from Nusa Penida or Gili back to DPS Airport?",
    answer:
      "Yes. Harbor-to-airport and harbor-to-hotel pickups at Sanur, Kusamba, and Padangbai run at the exact same flat zone rates—message your boat company name and estimated docking time.",
  },
  {
    question: "Do I need a deposit and can drivers stop at an ATM before the boat?",
    answer:
      `Zero deposit required—${PAYMENT_POLICY.shortSummary} A quick en-route ATM, SIM, or minimart stop for boat snacks is completely free.`,
  },
];

interface HarborTransferLandingPageProps {
  exchangeRates?: CurrencyRateMap;
}

export const HarborTransferLandingPage: React.FC<HarborTransferLandingPageProps> = ({
  exchangeRates,
}) => {
  const [currency, setCurrency] = useState("USD");
  const [selectedVehicleId, setSelectedVehicleId] = useState("standard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<Record<string, unknown> | null>(
    null
  );

  const harborRows = HARBOR_PORTS.map((port) => {
    const dest = BALI_DESTINATIONS.find((d) => d.id === port.id)!;
    return { ...port, dest };
  });

  const handleOpenBookingModal = (bookingData?: Record<string, unknown>) => {
    if (bookingData) {
      setModalBookingData({ ...bookingData, exchangeRates });
    } else {
      const defaultDest =
        BALI_DESTINATIONS.find((d) => d.id === "sanur") || BALI_DESTINATIONS[0];
      const veh =
        FLEET_DETAILS.find((v) => v.id === selectedVehicleId) || FLEET_DETAILS[0];
      const key =
        (selectedVehicleId as "standard" | "comfort" | "van" | "luxury") ||
        "standard";
      const priceIdr = defaultDest.rates[key] || defaultDest.rates.standard;
      setModalBookingData({
        transferType: "arrival",
        destination: defaultDest,
        vehicle: veh,
        priceIdr,
        currency,
        exchangeRates,
        formattedPrice: formatPrice(priceIdr, currency, exchangeRates),
        pickupDate: new Date().toISOString().split("T")[0],
        pickupTime: "08:00",
        flightNumber: "",
        hotelName: "Sanur Fast Boat Harbor",
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
    serviceType: "Bali Airport to Fast Boat Harbor Private Transfer",
    name: "Bali Airport Transfer to Nusa Penida, Gili & Fast Boat Harbors",
    description:
      "Fixed-rate private transfers between Bali Airport (DPS) and Sanur (IDR 275k), Kusamba (IDR 400k), and Padangbai fast-boat harbors (IDR 850k) for Nusa Penida, Lembongan, and Gili Islands.",
    provider: {
      "@type": ["LocalBusiness", "TaxiService"],
      "@id": "https://greatbaliairporttransfer.com/#organization",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: "275000",
      highPrice: "3500000",
      offerCount: String(HARBOR_PORTS.length * FLEET_DETAILS.length),
      availability: "https://schema.org/InStock",
      url: "https://greatbaliairporttransfer.com/bali-airport-to-fast-boat-harbor",
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
        name: "Fast-Boat Harbor Transfers",
        item: "https://greatbaliairporttransfer.com/bali-airport-to-fast-boat-harbor",
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
            Fast-Boat Harbor Transfers
          </span>
        </div>
      </div>

      <header className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 mb-4 text-xs font-medium text-sky-300">
              <Anchor className="w-3.5 h-3.5" />
              <span>Nusa Penida • Lembongan • Gili Trawangan • Lombok</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Bali Airport to <span className="text-emerald-400">Nusa Penida &amp; Gili Islands</span> Fast Boat Harbor Transfer
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Traveling from <strong>Bali Airport to Nusa Penida, Nusa Lembongan, or the Gili Islands</strong>? Book a direct private car from Ngurah Rai Airport (DPS) to <strong>Sanur Harbor</strong> (16 km, 25–35 mins, from IDR 275,000), <strong>Kusamba Port</strong> (44 km, IDR 400,000), or <strong>Padangbai Harbor for Gili Trawangan</strong> (65 km, 85–100 mins, IDR 850,000)—with flight tracking, Circle K exit-gate pickup, and zero deposit.
            </p>
            <div className="flex flex-wrap gap-3 mt-5 text-xs text-slate-300 font-medium">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sanur Port ~25–35 mins</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Padangbai Port ~90–120 mins</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Toll &amp; Port Drop Included</span>
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
            preSelectedDestinationId="sanur"
            selectedVehicleId={selectedVehicleId}
            onVehicleChange={setSelectedVehicleId}
            exchangeRates={exchangeRates}
          />
        </div>
      </header>

      <main className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* AI Overview Box for Bali Airport to Nusa Penida & Gili Islands */}
          <section className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3">
              How to Get from Bali Airport to Nusa Penida &amp; Gili Islands
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              To travel from <strong>Bali Airport (DPS) to Nusa Penida or Nusa Lembongan</strong>, take a private transfer to <strong>Sanur Fast Boat Harbor</strong> (16 km, 25–35 minutes, fixed <strong>IDR 275,000</strong> per Standard Car) or <strong>Kusamba Port</strong> (44 km, <strong>IDR 400,000</strong>). To reach the <strong>Gili Islands (Gili Trawangan, Gili Air, Lombok)</strong>, take a private transfer from Bali Airport to <strong>Padangbai Harbor</strong> (65 km, 85–100 minutes off-peak, fixed <strong>IDR 850,000</strong> per car)—all including fuel, tolls, parking, flight tracking, and 60 minutes&apos; free waiting with zero deposit.
            </p>
          </section>

          {/* Harbor Pricing & Timing Matrix */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              Fixed Bali Harbor Rates &amp; Boat Timing Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-5">
              Same flat rate per vehicle whether arriving at DPS to catch a boat or returning from the harbor to DPS Airport. Zero deposit and zero early-morning surcharge.
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Harbor &amp; Islands Served</th>
                    <th className="py-3 px-4">Drive Time &amp; Buffer</th>
                    <th className="py-3 px-3 text-right">Standard (1–4)</th>
                    <th className="py-3 px-3 text-right">Innova (1–5)</th>
                    <th className="py-3 px-3 text-right">HiAce (1–12)</th>
                    <th className="py-3 px-3 text-right">VIP Alphard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {harborRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 align-top">
                      <td className="py-3.5 px-4">
                        <Link href={`/${row.dest.slug}`} className="font-bold text-slate-900 hover:text-emerald-700 hover:underline block">
                          {row.portLabel}
                        </Link>
                        <span className="text-[11px] text-slate-500">
                          Islands: {row.islands}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                        <span className="font-semibold text-slate-800 block">
                          {row.dest.distanceKm} km ({row.dest.offPeakMinutes} off-peak / {row.dest.peakMinutes} peak)
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {row.bufferAdvice}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-semibold">
                        {formatPrice(row.dest.rates.standard, currency, exchangeRates)}
                        <span className="text-[10px] font-normal text-slate-600 block">
                          {formatPrice(row.dest.rates.standard, "IDR", exchangeRates)}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-semibold bg-emerald-50/30 text-emerald-900">
                        {formatPrice(row.dest.rates.comfort, currency, exchangeRates)}
                        <span className="text-[10px] font-normal text-emerald-700 block">
                          {formatPrice(row.dest.rates.comfort, "IDR", exchangeRates)}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-semibold">
                        {formatPrice(row.dest.rates.van, currency, exchangeRates)}
                        <span className="text-[10px] font-normal text-slate-600 block">
                          {formatPrice(row.dest.rates.van, "IDR", exchangeRates)}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-semibold">
                        {formatPrice(row.dest.rates.luxury, currency, exchangeRates)}
                        <span className="text-[10px] font-normal text-slate-600 block">
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
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {PAYMENT_POLICY.shortSummary}
              </span>
              <Link href="/#rates-table" className="font-semibold text-emerald-700 hover:underline">
                View all 18 zones →
              </Link>
            </div>

            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Fast-Boat Connection Tip:</strong> Most Gili fast boats depart Padangbai between <strong>09:00 AM and 01:00 PM</strong>, and last Sanur boats to Nusa Penida usually leave around 04:30 PM. If your flight lands later, stay 1 night in Sanur and schedule your port drop the next morning.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">
              Bali Fast-Boat Harbor Transfer FAQs
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

          <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                Catching a Tight Fast Boat From Sanur or Padangbai?
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                Share your flight landing time + boat operator on WhatsApp and we will confirm realistic connection timing right away.
              </p>
            </div>
            <a
              href="https://wa.me/6285190920033?text=Hi%20Great%20Bali%20Airport%20Transfer%2C%20I%20need%20a%20transfer%20to%20Sanur%20%2F%20Padangbai%20fast%20boat%20harbor."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-950 font-bold text-xs uppercase tracking-wide hover:bg-emerald-50 transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Check Port Timing on WhatsApp</span>
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
