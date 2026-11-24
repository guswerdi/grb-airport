"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Baby,
  CheckCircle2,
  ShieldCheck,
  Clock,
  ChevronRight,
  CalendarCheck,
  Users,
  Briefcase,
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

const FAMILY_ZONE_IDS = [
  "kuta-legian",
  "jimbaran",
  "seminyak",
  "nusa-dua",
  "sanur",
  "canggu",
  "uluwatu",
  "ubud",
];

const SEAT_TYPES = [
  {
    type: "Infant / Baby Car Seat",
    ageRange: "0 – 2 years",
    price: "IDR 50,000 / trip",
    notes:
      "Sanitized, European-standard infant seat pre-installed in your vehicle prior to DPS pickup. Share your baby's age when booking.",
  },
  {
    type: "Child Booster Seat",
    ageRange: "3 – 7 years",
    price: "IDR 50,000 / trip",
    notes:
      "Elevated booster seat designed for young children transitioning to vehicle seatbelts on Bali highway and hill roads.",
  },
];

const FAQS = [
  {
    question: "How much does a baby car seat cost for a Bali airport transfer?",
    answer:
      "Child and baby car seats cost IDR 50,000 (~$3 USD) per seat, per one-way trip, in addition to the fixed per-vehicle fare. Standard vehicles start from IDR 250,000 to Kuta, Seminyak, Jimbaran, and Nusa Dua, or IDR 400,000 to Ubud.",
  },
  {
    question: "What ages and seat types are available?",
    answer:
      "We provide sanitized European-standard baby car seats for infants aged 0 to 2 years and child booster seats for children aged 3 to 7 years. Tell us your children's ages when booking so we select and pre-install the right seat.",
  },
  {
    question: "Which vehicle is best for a family with baby seats and strollers?",
    answer:
      "For 1 child seat plus 2–3 adults and medium luggage, our Comfort Car (Toyota Innova Zenix) gives generous legroom and cargo space for a stroller. For multiple child seats, 5+ passengers, or double prams, we recommend our Toyota HiAce Premio 12-seater van.",
  },
  {
    question: "How far in advance should I request a child seat?",
    answer:
      "Please request your baby or booster seat when booking—ideally at least 24 hours before your flight lands—so our dispatch team can sanitize and pre-install it before your chauffeur leaves for DPS Airport.",
  },
  {
    question: "Where do we meet our driver at Bali Airport with kids and luggage?",
    answer:
      "After clearing immigration, e-VoA, baggage claim, and customs, walk out the arrivals exit straight to the Circle K minimart at the exit gate. Your driver waits there holding your name sign and helps load strollers and suitcases. Complimentary waiting time is 60 minutes from landing.",
  },
  {
    question: "Do we need to pay a deposit to reserve a car with a baby seat?",
    answer:
      "No advance deposit is required. Book online or via WhatsApp with zero credit card hold, pay cash on arrival (IDR, AUD, USD, or EUR) or online, and cancel free up to 24 hours before pickup.",
  },
];

interface BabySeatLandingPageProps {
  exchangeRates?: CurrencyRateMap;
}

export const BabySeatLandingPage: React.FC<BabySeatLandingPageProps> = ({
  exchangeRates,
}) => {
  const [currency, setCurrency] = useState("USD");
  const [selectedVehicleId, setSelectedVehicleId] = useState("comfort");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<Record<string, unknown> | null>(
    null
  );

  const familyZones = BALI_DESTINATIONS.filter((d) =>
    FAMILY_ZONE_IDS.includes(d.id)
  );

  const handleOpenBookingModal = (bookingData?: Record<string, unknown>) => {
    if (bookingData) {
      setModalBookingData({ ...bookingData, exchangeRates });
    } else {
      const defaultDest =
        BALI_DESTINATIONS.find((d) => d.id === "ubud") || BALI_DESTINATIONS[0];
      const defaultVeh =
        FLEET_DETAILS.find((v) => v.id === selectedVehicleId) ||
        FLEET_DETAILS[1];
      const key =
        (selectedVehicleId as "standard" | "comfort" | "van" | "luxury") ||
        "comfort";
      const priceIdr = defaultDest.rates[key] || defaultDest.rates.comfort;
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
        passengers: 3,
        luggage: 3,
        babySeatNeeded: true,
      });
    }
    setIsModalOpen(true);
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Family Private Airport Transfer with Baby Car Seat",
    name: "Bali Airport Transfer with Baby Seat & Child Booster (DPS)",
    description:
      "Pre-booked private Bali airport transfers from DPS with sanitized European-standard baby seats (0-2 years) and child booster seats (3-7 years) for IDR 50,000 per seat. Fixed fares from IDR 250,000 per vehicle, tolls and parking included.",
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
      url: "https://greatbaliairporttransfer.com/bali-airport-transfer-with-baby-seat",
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
        name: "Bali Airport Transfer with Baby Seat",
        item: "https://greatbaliairporttransfer.com/bali-airport-transfer-with-baby-seat",
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
            Bali Airport Transfer with Baby Seat
          </span>
        </div>
      </div>

      <header className="relative w-full bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="/images/innova-zenix.jpg"
            alt="Toyota Innova Zenix family Bali airport transfer with baby car seat"
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
              <Baby className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-slate-200">
                Sanitized Baby &amp; Booster Seats • IDR 50,000 / Seat
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Bali Airport Transfer{" "}
              <span className="text-emerald-400">with Baby Seat</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Travel safely from Ngurah Rai International Airport (DPS) to your
              Bali resort or villa with pre-installed European-standard baby car
              seats (0–2 yrs) and child booster seats (3–7 yrs). Fixed fares from{" "}
              <strong className="text-white">IDR 250,000</strong> per vehicle,
              60-minute free waiting, and zero deposit required.
            </p>

            <div className="flex flex-wrap gap-3 mt-5 text-xs text-slate-300 font-medium">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pre-Installed Before Pickup</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>60-Min Free Delay Wait</span>
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
            initialBabySeatNeeded={true}
            exchangeRates={exchangeRates}
          />
        </div>
      </header>

      <main className="py-16 sm:py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Quick Answer Summary */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              Quick Summary: Child &amp; Baby Seats at DPS Airport
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              Most Bali airport taxis and Grab/Gojek cars do{" "}
              <strong>not</strong> carry child safety seats. Great Bali Airport
              Transfer provides sanitized European-standard baby seats (0–2 years)
              and child booster seats (3–7 years) for{" "}
              <strong>IDR 50,000 (~$3 USD) per seat per trip</strong>, fitted in
              advance before your chauffeur arrives at the Circle K minimart at
              the DPS arrivals exit gate.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SEAT_TYPES.map((seat) => (
                <div
                  key={seat.type}
                  className="bg-slate-50 rounded-xl border border-slate-200 p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {seat.type}
                    </h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {seat.price}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 mb-1.5">
                    Age range: {seat.ageRange}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {seat.notes}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Family Fleet Comparison */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Choosing the Right Vehicle for Strollers &amp; Child Seats
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Child seats take up one full passenger seat. Factor in folded prams,
              travel cots, and large family suitcases when picking your vehicle tier.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {FLEET_DETAILS.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="rounded-xl border border-slate-200 p-5 bg-slate-50/70 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold mb-3">
                      {vehicle.model}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-700 font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-500" /> Up to{" "}
                        {vehicle.passengers} pax
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500" />{" "}
                        {vehicle.luggage} bags
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {vehicle.id === "standard" &&
                        "Best for 1–2 adults with 1 baby/booster seat and standard luggage plus a compact folded stroller."}
                      {vehicle.id === "comfort" &&
                        "Recommended for families: spacious captain seating, smooth suspension, and room for 1–2 child seats plus a full-size pram and 4 suitcases."}
                      {vehicle.id === "van" &&
                        "Ideal for multi-family trips or 5+ travelers needing 2–3 child seats, double strollers, and up to 10 suitcases."}
                      {vehicle.id === "luxury" &&
                        "Executive reclining leather captain seats for up to 5 passengers and 4 suitcases—fits 1–2 child seats in quiet comfort."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVehicleId(vehicle.id);
                      handleOpenBookingModal();
                    }}
                    className="mt-4 w-full py-2 rounded-lg bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Book {vehicle.name} + Baby Seat
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Family Route Fares */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Fixed Bali Airport Fares for Family Routes (2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              All rates below are flat one-way prices per vehicle (not per person)
              including Bali Mandara Tollway and DPS airport parking. Add{" "}
              <strong>IDR 50,000 per child seat</strong>.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[820px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">Drive Time</th>
                    <th className="py-3 px-4 text-right">
                      Standard (Avanza, 1–4 pax)
                    </th>
                    <th className="py-3 px-4 text-right bg-emerald-50/60 text-emerald-900">
                      Comfort (Innova, 1–5 pax)
                    </th>
                    <th className="py-3 px-4 text-right">
                      Big Van (HiAce, 1–12 pax)
                    </th>
                    <th className="py-3 px-4 text-right">
                      VIP Alphard (1–5 pax)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {familyZones.map((dest) => (
                    <tr key={dest.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <Link
                          href={`/${dest.slug}`}
                          className="hover:text-emerald-700 hover:underline"
                        >
                          {dest.metaName}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {dest.durationMinutes}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">
                        {formatPrice(dest.rates.standard, currency, exchangeRates)}{" "}
                        <span className="text-[11px] font-normal text-slate-400 block">
                          {formatPrice(dest.rates.standard, "IDR", exchangeRates)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold bg-emerald-50/30 text-emerald-900">
                        {formatPrice(dest.rates.comfort, currency, exchangeRates)}{" "}
                        <span className="text-[11px] font-normal text-emerald-700 block">
                          {formatPrice(dest.rates.comfort, "IDR", exchangeRates)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">
                        {formatPrice(dest.rates.van, currency, exchangeRates)}{" "}
                        <span className="text-[11px] font-normal text-slate-400 block">
                          {formatPrice(dest.rates.van, "IDR", exchangeRates)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">
                        {formatPrice(dest.rates.luxury, currency, exchangeRates)}{" "}
                        <span className="text-[11px] font-normal text-slate-400 block">
                          {formatPrice(dest.rates.luxury, "IDR", exchangeRates)}
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
                Need all 18 Bali zones?{" "}
                <Link
                  href="/#rates-table"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  View full rate table →
                </Link>
              </span>
              <a
                href="https://wa.me/6285190920033?text=Hi%20Great%20Bali%20Airport%20Transfer%2C%20I%20would%20like%20to%20book%20an%20airport%20transfer%20with%20a%20baby%20car%20seat."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Ask about multiple child seats on WhatsApp
              </a>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions: Baby Seat Airport Transfers
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
