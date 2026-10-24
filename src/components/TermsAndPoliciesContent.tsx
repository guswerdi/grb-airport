"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  CalendarCheck,
  Clock,
  Plane,
  Banknote,
  Car,
  Luggage,
  Baby,
  Lock,
  Phone,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";

export function TermsAndPoliciesContent() {
  const [activeSection, setActiveSection] = useState<string>("booking");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState<any>(null);

  const sections = [
    { id: "operator", label: "1. Operator Identity", icon: ShieldCheck },
    { id: "booking", label: "2. Booking & Confirmation", icon: CalendarCheck },
    { id: "pricing", label: "3. Pricing & Inclusions", icon: Banknote },
    { id: "payment", label: "4. Payment Methods", icon: Banknote },
    { id: "flight-delays", label: "5. Flight Delays & Waiting", icon: Plane },
    { id: "cancellation", label: "6. Cancellation & Refunds", icon: Clock },
    { id: "luggage-safety", label: "7. Luggage & Child Seats", icon: Luggage },
    { id: "passenger-conduct", label: "8. Passenger Conduct", icon: Car },
    { id: "privacy", label: "9. Privacy & Data Protection", icon: Lock },
    { id: "contact", label: "10. Contact & Support", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="grow pt-6 pb-20">
        {/* Breadcrumbs & Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-medium">Terms &amp; Policies</span>
          </nav>

          {/* Hero Banner */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs mb-10 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Official Service Agreement &amp; Policies
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Terms of Service &amp; Customer Policies
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Clear, transparent guidelines governing all Bali airport transfer bookings, flight delay guarantees,
                cancellation policies, payments, and data privacy. Operated by Great Rides Bali.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
                <span>
                  <strong>Last Updated:</strong> October 2026
                </span>
                <span>•</span>
                <span>
                  <strong>Governing Jurisdiction:</strong> Republic of Indonesia
                </span>
                <span>•</span>
                <span className="text-emerald-700 font-medium">
                  24/7 Support Hotline Available
                </span>
              </div>
            </div>
          </div>

          {/* Main Layout: Sticky Sidebar + Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Table of Contents Sticky Sidebar */}
            <aside className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Quick Navigation
                </h3>
                <nav className="space-y-1">
                  {sections.map((sec) => {
                    const Icon = sec.icon;
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={() => setActiveSection(sec.id)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                          activeSection === sec.id
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{sec.label}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Need Help Box */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-bold">
                  <MessageCircle className="w-4 h-4" /> Have a Policy Question?
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Need custom arrangements, special luggage requirements, or an immediate booking change?
                </p>
                <a
                  href="https://wa.me/6285190920033?text=Hi%20Great%20Bali%20Airport%20Transfer%2C%20I%20have%20a%20question%20regarding%20your%20terms%20or%20booking%20policy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Ask via WhatsApp
                </a>
              </div>
            </aside>

            {/* Content Body */}
            <div className="lg:col-span-8 space-y-8">
              {/* Section 1: Operator Identity */}
              <section
                id="operator"
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Section 01
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Operator Identity &amp; Licensing
                    </h2>
                  </div>
                </div>
                <div className="prose prose-slate text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>
                    The service branded as <strong>Great Bali Airport Transfer</strong> is operated by{" "}
                    <strong>Great Rides Bali</strong>, providing professional private airport transfers and VIP chauffeur services
                    in Bali, Indonesia.
                  </p>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <p>
                      <strong>Company Name:</strong> Great Rides Bali
                    </p>
                    <p>
                      <strong>Operating Hub:</strong> I Gusti Ngurah Rai International Airport (DPS) Arrival Terminal Pick-Up Area, Tuban, Kuta, Badung, Bali 80361
                    </p>
                    <p>
                      <strong>Customer Concierge:</strong> +62 851-9092-0033 (24 Hours WhatsApp &amp; Voice)
                    </p>
                    <p>
                      <strong>Official Inquiries:</strong> booking.grb@gmail.com
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Booking & Confirmation */}
              <section
                id="booking"
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Section 02
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Booking &amp; Confirmation Policy
                    </h2>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>
                    Bookings can be initiated either via our website booking widget or directly with our 24/7 WhatsApp concierge.
                  </p>
                  <ul className="space-y-2 text-slate-700 list-disc pl-5">
                    <li>
                      <strong>Zero Advance Deposit:</strong> You are not required to provide credit card holds or upfront deposits to confirm standard airport transfer reservations.
                    </li>
                    <li>
                      <strong>Instant WhatsApp Dispatch:</strong> Once submitted, your transfer is immediately locked in our driver assignment schedule. You will receive an instant digital confirmation with your pickup details.
                    </li>
                    <li>
                      <strong>Driver Details (2 Hours Before Touchdown):</strong> Two hours prior to your scheduled landing time, you will receive a WhatsApp message containing your chauffeur&apos;s full name, vehicle model, license plate number, and direct contact.
                    </li>
                    <li>
                      <strong>Flight Information Requirement:</strong> It is the passenger&apos;s responsibility to provide accurate airline and flight number details (e.g. GA402, QF43, SQ938) so we can prepare your driver for your scheduled arrival.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3: Pricing & Inclusions */}
              <section
                id="pricing"
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Section 03
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      All-Inclusive Pricing &amp; Toll Guarantees
                    </h2>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>
                    All rates published on our website are <strong>fixed, flat prices per vehicle (not per passenger)</strong> for one-way private transfers.
                  </p>
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2 text-xs">
                    <p className="font-bold text-emerald-950 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What Every Transfer Rate Includes:
                    </p>
                    <ul className="space-y-1.5 text-emerald-900 list-disc pl-5">
                      <li>Private air-conditioned vehicle with dedicated Balinese chauffeur</li>
                      <li>Bali Mandara Ocean Tollway electronic fee (for destinations utilizing the ocean toll)</li>
                      <li>Official DPS Airport parking &amp; terminal entrance fees</li>
                      <li>Vehicle fuel/petrol and applicable Indonesian local taxes</li>
                      <li>Luggage handling and greeting at the designated meeting point</li>
                      <li>Complimentary quick en-route stop for trusted bank ATM, SIM card kiosk, or money exchange</li>
                    </ul>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    *Note: Complimentary chilled bottled mineral water is an exclusive inclusion provided with our full-day Private Driver &amp; Chauffeur Charter service.
                  </p>
                  <p>
                    You will never be asked to pay midnight surcharges, luggage surcharges, or peak-season additions on confirmed bookings.
                  </p>
                </div>
              </section>

              {/* Section 4: Payment Methods */}
              <section
                id="payment"
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Section 04
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Payment Options (Cash &amp; Online)
                    </h2>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>
                    We provide complete flexibility so travelers can choose whichever payment method is most convenient:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Option A: Cash on Arrival
                      </h4>
                      <p className="text-xs text-slate-600">
                        Pay cash directly to your chauffeur upon arrival at your villa or hotel. Accepted currencies include:
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2 text-[11px] font-mono font-semibold text-slate-700">
                        <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">IDR (Indonesian Rupiah)</span>
                        <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">AUD</span>
                        <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">USD</span>
                        <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">EUR</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Option B: Secure Online Prepay
                      </h4>
                      <p className="text-xs text-slate-600">
                        Prefer to have everything paid prior to your trip? Request an encrypted payment invoice via WhatsApp supporting:
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2 text-[11px] font-mono font-semibold text-slate-700">
                        <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">Visa / Mastercard</span>
                        <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">Wise Transfer</span>
                        <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">PayPal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Flight Delays & Waiting Policy */}
              <section
                id="flight-delays"
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Section 05
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Flight Delays &amp; Waiting Grace Period
                    </h2>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>
                    Flight schedules can change due to weather, air traffic control, or airline operational delays.
                  </p>
                  <ul className="space-y-2 text-slate-700 list-disc pl-5">
                    <li>
                      <strong>60-Minute Complimentary Grace Wait:</strong> A full 60 minutes of complimentary waiting time is provided starting from the moment your aircraft lands on the tarmac. This provides ample time to clear immigration, electronic visa on arrival (e-VoA), and baggage carousel retrieval.
                    </li>
                    <li>
                      <strong>Flight Delays &amp; Airline Reschedules:</strong> If your airline reschedules or delays your flight before departure, simply send a quick message to our 24/7 WhatsApp concierge so we can update your chauffeur&apos;s pickup schedule with zero penalty fees.
                    </li>
                    <li>
                      <strong>Extended Customs Queues:</strong> If you experience exceptional queues in customs or lost baggage claims, connect to the airport&apos;s free Wi-Fi (<em>&ldquo;Ngurah Rai Free WiFi&rdquo;</em>) and message your driver or WhatsApp support. Your driver will remain stationed at the terminal until you exit.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 6: Cancellation & Amendments */}
              <section
                id="cancellation"
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Section 06
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      100% Free Cancellation &amp; Rescheduling Policy
                    </h2>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>
                    We believe travel planning should be stress-free:
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-slate-800">
                        <strong>Free Cancellation:</strong> You can cancel your reservation completely free of charge up to 24 hours prior to your scheduled airport pickup time.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-slate-800">
                        <strong>Airline Cancellations &amp; Diversions:</strong> If your airline cancels or diverts your flight into another airport, simply notify us as soon as possible via WhatsApp and we will cancel or rebook your transfer at zero penalty.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-slate-800">
                        <strong>Prepaid Refunds:</strong> If you prepaid online and cancel more than 24 hours before pickup, a 100% refund will be issued via the original payment method within 3 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7: Luggage & Child Safety Seats */}
              <section
                id="luggage-safety"
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Luggage className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Section 07
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Luggage Capacities &amp; Child Safety Seats
                    </h2>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>
                    To ensure a safe and comfortable ride without blocking vehicle sightlines or overloading axles:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                      <p className="font-bold text-slate-900 mb-1">Standard MPV</p>
                      <p className="text-slate-500 mb-1">Toyota Veloz / Avanza</p>
                      <p className="text-emerald-700 font-semibold">Max 4 Pax + 3 Large Suitcases</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                      <p className="font-bold text-slate-900 mb-1">Comfort SUV</p>
                      <p className="text-slate-500 mb-1">Toyota Innova Zenix</p>
                      <p className="text-emerald-700 font-semibold">Max 5 Pax + 4 Large Suitcases</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                      <p className="font-bold text-slate-900 mb-1">Big Van (HiAce)</p>
                      <p className="text-slate-500 mb-1">Toyota HiAce Premio</p>
                      <p className="text-emerald-700 font-semibold">Max 12 Pax + 10 Suitcases + Boards</p>
                    </div>
                  </div>
                  <p className="pt-2">
                    <strong>Child Safety Seats:</strong> Sanitized European-standard infant seats (0–2 years) and child booster seats (3–7 years) can be reserved upon request during booking for IDR 50,000 per seat per trip.
                  </p>
                  <p>
                    <strong>Surfboards &amp; Golf Bags:</strong> Oversized items such as surfboards (up to 7&apos;6&quot;) or heavy golf bags require reserving the Toyota HiAce Premio van to prevent damage to passenger cabin upholstery.
                  </p>
                </div>
              </section>

              {/* Section 8: Passenger Conduct & Non-Smoking */}
              <section
                id="passenger-conduct"
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Section 08
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Passenger Conduct &amp; 100% Non-Smoking Policy
                    </h2>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>
                    We maintain exceptionally high fleet hygiene so every arriving guest enjoys a fresh, clean journey:
                  </p>
                  <ul className="space-y-2 text-slate-700 list-disc pl-5">
                    <li>
                      <strong>Strict Non-Smoking Rule:</strong> Smoking and vaping/e-cigarettes are strictly prohibited inside all company vehicles at all times. If you wish to smoke before departing, your driver will wait outside the airport terminal.
                    </li>
                    <li>
                      <strong>Alcohol &amp; Prohibited Substances:</strong> Open containers of alcoholic beverages and illegal substances under Indonesian law are strictly forbidden inside the vehicles.
                    </li>
                    <li>
                      <strong>Vehicle Cleanliness:</strong> A professional detailing fee of up to IDR 500,000 may apply if passengers cause severe interior fouling or liquid spills requiring deep shampooing.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 9: Privacy & Data Protection */}
              <section
                id="privacy"
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Section 09
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Privacy Policy &amp; Data Protection
                    </h2>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>
                    Great Rides Bali takes customer privacy and confidential travel information with the highest seriousness:
                  </p>
                  <ul className="space-y-2 text-slate-700 list-disc pl-5">
                    <li>
                      <strong>Data We Collect:</strong> We only collect information strictly necessary to fulfill your transfer — including passenger name, contact phone/WhatsApp number, flight number, arrival date/time, and destination hotel/villa name.
                    </li>
                    <li>
                      <strong>Zero Third-Party Marketing:</strong> We never sell, rent, or trade your personal information, phone number, or travel itinerary to marketing brokers, third-party hotels, or tour agencies.
                    </li>
                    <li>
                      <strong>Driver Access Scope:</strong> Your assigned chauffeur is provided only with the operational data required to conduct your pickup (your name for the arrival board, flight number, and drop-off address).
                    </li>
                    <li>
                      <strong>Right to Erasure:</strong> You can contact us at any time via WhatsApp or email to request the complete deletion of your booking history and contact record from our dispatch database.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 10: Contact & Dispute Resolution */}
              <section
                id="contact"
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Section 10
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Customer Service &amp; Dispute Resolution
                    </h2>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>
                    If you experience any dissatisfaction or have questions concerning your service, our management team is on call 24 hours a day to resolve issues immediately:
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                    <p>
                      <strong>Customer Support WhatsApp:</strong> +62 851-9092-0033
                    </p>
                    <p>
                      <strong>Management Email:</strong> booking.grb@gmail.com
                    </p>
                    <p>
                      <strong>Governing Law:</strong> These terms are governed by the statutory regulations of Badung Regency, Bali Province, and the Republic of Indonesia.
                    </p>
                  </div>
                </div>
              </section>
            </div>
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
}
