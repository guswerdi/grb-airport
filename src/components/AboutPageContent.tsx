"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  Banknote,
  Phone,
  Mail,
  ChevronRight,
  ArrowRight,
  Car,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import {
  BALI_DESTINATIONS,
  CurrencyRateMap,
  FLEET_DETAILS,
  formatPrice,
  RATES_LAST_REVIEWED,
} from "@/data/destinations";
import { CORE_USPS, PAYMENT_POLICY } from "@/data/policies";

const RATES_REVIEWED_LABEL = new Date(RATES_LAST_REVIEWED).toLocaleDateString(
  "en-US",
  { month: "long", year: "numeric", timeZone: "UTC" }
);

interface AboutPageContentProps {
  exchangeRates?: CurrencyRateMap;
}

export const AboutPageContent: React.FC<AboutPageContentProps> = ({
  exchangeRates,
}) => {
  const [currency, setCurrency] = useState("USD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<Record<string, unknown> | null>(
    null
  );

  const handleOpenBookingModal = () => {
    const defaultDest = BALI_DESTINATIONS[0];
    const defaultVeh = FLEET_DETAILS[0];
    setModalBookingData({
      transferType: "arrival",
      destination: defaultDest,
      vehicle: defaultVeh,
      priceIdr: defaultDest.rates.standard,
      currency,
      exchangeRates,
      formattedPrice: formatPrice(defaultDest.rates.standard, currency, exchangeRates),
      pickupDate: new Date().toISOString().split("T")[0],
      pickupTime: "12:00",
      flightNumber: "",
      hotelName: "",
      passengers: 2,
      luggage: 2,
      babySeatNeeded: false,
    });
    setIsModalOpen(true);
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Great Bali Airport Transfer",
    url: "https://greatbaliairporttransfer.com/about",
    description:
      "Operated by Great Rides Bali: dedicated local Balinese chauffeurs providing fixed-rate DPS airport arrivals and hotel departures with zero deposit.",
    mainEntity: {
      "@type": ["LocalBusiness", "TaxiService"],
      "@id": "https://greatbaliairporttransfer.com/#organization",
    },
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
        name: "About Us",
        item: "https://greatbaliairporttransfer.com/about",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">About Us</span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="bg-slate-900 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-emerald-300">
            <Users className="w-3.5 h-3.5" />
            <span>Operated by Great Rides Bali • Verified {RATES_REVIEWED_LABEL}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            About Great Bali Airport Transfer
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            We are a dedicated Bali airport chauffeur team focused on one promise: after a long flight into Denpasar (DPS), you should walk straight out of customs to a real local driver who knows where your villa is—for an honest fixed fare paid only after you arrive.
          </p>
        </div>
      </header>

      <main className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Who We Are & How Dispatch Works */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Direct Local Dispatch — Zero Hidden Brokers
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Many international booking aggregators resell Bali airport rides at the last minute, leaving travelers stranded at arrival gates. When you reserve through <strong>Great Bali Airport Transfer</strong> (operated directly by <strong>Great Rides Bali</strong>), our local dispatch coordinator assigns an English-speaking Balinese tourism chauffeur directly from our inspected team.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>2 hours before your flight touches down</strong>, you receive your assigned driver&apos;s full name, vehicle license plate, and direct WhatsApp number. Your driver monitors live flight arrival status and waits outside the <strong>Circle K minimart at the DPS exit gate</strong> holding your personalized name sign.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Authorized Cooperative Chauffeurs
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-semibold border border-slate-200">
                  <Clock className="w-4 h-4 text-emerald-600" /> 24/7 Same Flat Fares
                </span>
              </div>
            </div>
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <Image
                src="/images/innova-zenix.jpg"
                alt="Toyota Innova Zenix private airport transfer vehicle in Bali"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </section>

          {/* Core Guarantees */}
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Our Four Operating Promises
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CORE_USPS.map((usp) => (
                <div
                  key={usp.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2"
                >
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {usp.badge}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{usp.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{usp.summary}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Transparency & Standards */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <Banknote className="w-4 h-4" /> Transparent Settlement
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Clear Payment &amp; Cancellation Rules
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {PAYMENT_POLICY.headline}
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cash on Drop-Off:</strong> {PAYMENT_POLICY.cashOnArrival.currencies.join(", ")}. Paid directly to your chauffeur upon hotel arrival.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Prepay Online Link Before Pickup:</strong> {PAYMENT_POLICY.onlinePrepay.methods.join(", ")} via WhatsApp invoice link. Drivers do not carry mobile card machines inside vehicles.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cancellation:</strong> {PAYMENT_POLICY.cancellationRule}
                  </span>
                </li>
              </ul>
              <Link
                href="/terms-and-policies"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline pt-1"
              >
                <span>Read complete Terms &amp; Policies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <Car className="w-4 h-4" /> Inspected Private Fleet
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Clean, Non-Smoking Vehicles for Every Group
              </h2>
              <div className="space-y-3 text-xs">
                {FLEET_DETAILS.map((veh) => (
                  <div
                    key={veh.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-bold text-slate-900">
                        {veh.name} ({veh.model})
                      </p>
                      <p className="text-slate-600">{veh.tagline}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded shrink-0">
                      1–{veh.passengers} pax • {veh.luggage} bags
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-1 text-xs font-bold text-emerald-700">
                <Link href="/bali-airport-transfer-with-baby-seat" className="hover:underline">
                  Baby Seats (IDR 50k) →
                </Link>
                <Link href="/bali-airport-van-transfer-hiace" className="hover:underline">
                  12-Seat Surfboard HiAce →
                </Link>
                <Link href="/bali-airport-to-fast-boat-harbor" className="hover:underline">
                  Fast-Boat Harbor Transfers →
                </Link>
              </div>
            </div>
          </section>

          {/* Direct Verified Contact Box */}
          <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Contact Our 24/7 Bali Dispatch Team
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Need help confirming child seats, oversized surfboard bags, or last-minute flight delays? Message our dispatch team directly—any time of day or night.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" /> DPS Arrival Pick-Up Area, Tuban, Kuta, Bali 80361
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-emerald-400" /> booking.grb@gmail.com
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="https://wa.me/6285190920033?text=Hello%20Great%20Bali%20Airport%20Transfer%2C%20I%20have%20a%20question%20about%20booking%20an%20airport%20transfer."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp +62 851-9092-0033</span>
              </a>
              <button
                type="button"
                onClick={handleOpenBookingModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Reserve Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
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
