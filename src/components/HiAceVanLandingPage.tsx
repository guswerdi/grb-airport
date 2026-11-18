"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Clock,
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

const GROUP_ZONE_IDS = [
  "kuta-legian",
  "seminyak",
  "nusa-dua",
  "sanur",
  "canggu",
  "uluwatu",
  "ubud",
  "sidemen-candidasa",
  "lovina-munduk",
  "amed-tulamben",
];

const FAQS = [
  {
    question: "How much does a 12-seater HiAce van transfer cost from Bali Airport?",
    answer:
      "Fixed HiAce Premio van rates start at IDR 550,000 (~$34 USD) to Kuta, Seminyak, Jimbaran, and Nusa Dua; IDR 650,000 to Sanur and Ubud; and IDR 700,000 to Canggu and Uluwatu—with zero midnight surcharge.",
  },
  {
    question: "Can the Toyota HiAce fit surfboards and golf bags cleanly?",
    answer:
      "Yes. Our HiAce Premio handles up to 12 passengers with 10 standard suitcases, or 6–9 travelers comfortably with multiple surfboard bags up to 7'6\" (230 cm) or hard golf travel cases. Message us ahead for boards over 8 ft.",
  },
  {
    question: "Can a large HiAce van access narrow Canggu or Ubud villa alleys?",
    answer:
      "Most resorts and main villa driveways accommodate HiAce vans. Where private villa lanes in Pererenan, Canggu, or Ubud are strictly single-scooter width, drivers assist luggage the final few steps from the nearest safe drop point.",
  },
  {
    question: "Where does a large group meet the HiAce driver at Bali Airport (DPS)?",
    answer:
      "Walk together out of the arrivals terminal to the Circle K minimart right at the exit gate. Your driver waits there with your name sign and guides your whole group to the van bay with zero parking extra charge.",
  },
  {
    question: "Do we pay per person or per van—and is a deposit required?",
    answer:
      `You always pay per vehicle (never per seat). ${PAYMENT_POLICY.headline}`,
  },
];

interface HiAceVanLandingPageProps {
  exchangeRates?: CurrencyRateMap;
}

export const HiAceVanLandingPage: React.FC<HiAceVanLandingPageProps> = ({
  exchangeRates,
}) => {
  const [currency, setCurrency] = useState("USD");
  const [selectedVehicleId, setSelectedVehicleId] = useState("van");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<Record<string, unknown> | null>(
    null
  );

  const vanZones = BALI_DESTINATIONS.filter((d) =>
    GROUP_ZONE_IDS.includes(d.id)
  );

  const handleOpenBookingModal = (bookingData?: Record<string, unknown>) => {
    if (bookingData) {
      setModalBookingData({ ...bookingData, exchangeRates });
    } else {
      const defaultDest =
        BALI_DESTINATIONS.find((d) => d.id === "canggu") || BALI_DESTINATIONS[0];
      const hiaceVeh = FLEET_DETAILS.find((v) => v.id === "van") || FLEET_DETAILS[2];
      setModalBookingData({
        transferType: "arrival",
        destination: defaultDest,
        vehicle: hiaceVeh,
        priceIdr: defaultDest.rates.van,
        currency,
        exchangeRates,
        formattedPrice: formatPrice(defaultDest.rates.van, currency, exchangeRates),
        pickupDate: new Date().toISOString().split("T")[0],
        pickupTime: "12:00",
        flightNumber: "",
        hotelName: "",
        passengers: 8,
        luggage: 8,
        babySeatNeeded: false,
      });
    }
    setIsModalOpen(true);
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Private 12-Seater Van & Surfboard Airport Transfer",
    name: "Bali Airport HiAce Van Transfer (Groups, Surfboards & Golf Bags)",
    description:
      "Private Toyota HiAce Premio 12-seater airport pickup from DPS across Bali. Seats up to 12 passengers with space for 10 suitcases and 7'6\" surfboard bags. Fixed fares from IDR 550,000 per van.",
    provider: {
      "@type": ["LocalBusiness", "TaxiService"],
      "@id": "https://greatbaliairporttransfer.com/#organization",
    },
    offers: {
      "@type": "Offer",
      price: "550000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: "https://greatbaliairporttransfer.com/bali-airport-van-transfer-hiace",
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
        name: "HiAce Van & Surfboard Transfer",
        item: "https://greatbaliairporttransfer.com/bali-airport-van-transfer-hiace",
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
            HiAce Van &amp; Surfboard Transfer
          </span>
        </div>
      </div>

      <header className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 mb-4 text-xs font-medium text-emerald-300">
              <Users className="w-3.5 h-3.5" />
              <span>Toyota HiAce Premio • 12 Seats • 10 Bags + Surfboards</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Bali Airport <span className="text-emerald-400">HiAce Van</span> &amp; Surfboard Transfer
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Keep your family, wedding party, or surf crew in one private air-conditioned van from DPS Airport—starting from <strong>IDR 550,000 per van</strong> (never per person) with Circle K meet &amp; greet and zero advance deposit.
            </p>
            <div className="flex flex-wrap gap-3 mt-5 text-xs text-slate-300 font-medium">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Up to 12 Passengers</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>10 Bags &amp; 7&apos;6&quot; Surfboards</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Midnight Fee 24/7</span>
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
            preSelectedDestinationId="canggu"
            selectedVehicleId={selectedVehicleId}
            onVehicleChange={setSelectedVehicleId}
            exchangeRates={exchangeRates}
          />
        </div>
      </header>

      <main className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Direct Answers for Surfboards, Golf & Groups */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
              Group, Surfboard &amp; Golf Bag Capacity at a Glance
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              Two separate airport taxis or three rideshare cars often split groups and refuse coffin surfboard bags. One Toyota HiAce Premio carries your entire group together with tolls, DPS exit parking, and 60 minutes free flight-delay wait included.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                <p className="font-bold text-emerald-950 mb-1">Regular Group Transfer</p>
                <p className="text-slate-700 leading-relaxed">
                  Up to <strong>12 passengers + 10 large suitcases</strong> inside a spacious high-roof cabin with dedicated rear A/C and USB ports.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="font-bold text-slate-900 mb-1">Surf Trips &amp; Golf Groups</p>
                <p className="text-slate-600 leading-relaxed">
                  Comfortably carries <strong>6–9 travelers + boardbags up to 7&apos;6&quot;</strong> or bulky golf cases. Tell us board lengths via WhatsApp so we fold rear benches properly.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-950 mb-1">Narrow Villa Lanes Note</p>
                  <p className="text-amber-900 leading-relaxed">
                    If your private villa sits down a scooter-only alley in Canggu or Uluwatu, drivers drop at the closest accessible corner and assist with bags.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* HiAce Fixed Fare Table */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              Fixed HiAce Van Fares From Bali Airport (DPS)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-5">
              One-way flat price per 12-seater Toyota HiAce van (not per passenger)—valid for both DPS Arrivals and Hotel-to-DPS Departures.
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Bali Destination</th>
                    <th className="py-3 px-4">Typical Drive</th>
                    <th className="py-3 px-4 text-right">HiAce Van Rate (Per Van)</th>
                    <th className="py-3 px-4 text-right">Standard Car Ref</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vanZones.map((dest) => (
                    <tr key={dest.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <Link href={`/${dest.slug}`} className="hover:text-emerald-700 hover:underline">
                          {dest.metaName}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {dest.durationMinutes}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-900 bg-emerald-50/30">
                        {formatPrice(dest.rates.van, currency, exchangeRates)}
                        <span className="text-[11px] font-normal text-emerald-700 block">
                          {formatPrice(dest.rates.van, "IDR", exchangeRates)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-600">
                        {formatPrice(dest.rates.standard, currency, exchangeRates)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {PAYMENT_POLICY.shortSummary}
              </span>
              <Link href="/#rates-table" className="font-semibold text-emerald-700 hover:underline">
                View all 18 zones →
              </Link>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">
              HiAce Group &amp; Surfboard Transfer FAQs
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
                Traveling With Longboards (8ft+) or 10+ Bags?
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                Send your board count and flight number on WhatsApp so dispatch prepares seat layout in advance.
              </p>
            </div>
            <a
              href="https://wa.me/6285190920033?text=Hi%20Great%20Bali%20Airport%20Transfer%2C%20I%20need%20a%20Toyota%20HiAce%20van%20from%20DPS%20for%20our%20group%20%2F%20surfboards."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-950 font-bold text-xs uppercase tracking-wide hover:bg-emerald-50 transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book HiAce on WhatsApp</span>
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
