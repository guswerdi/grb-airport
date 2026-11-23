"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Banknote,
  CreditCard,
  Clock,
  MapPin,
  Baby,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";
import {
  CORE_USPS,
  DirectAnswerItem,
  HOME_DIRECT_ANSWERS,
  PAYMENT_POLICY,
  UspItem,
} from "@/data/policies";
import { RATES_LAST_REVIEWED } from "@/data/destinations";

const RATES_REVIEWED_LABEL = new Date(RATES_LAST_REVIEWED).toLocaleDateString(
  "en-US",
  { month: "long", year: "numeric", timeZone: "UTC" }
);

const USP_ICONS: Record<string, React.FC<{ className?: string }>> = {
  "zero-deposit": Banknote,
  "all-inclusive-24-7": ShieldCheck,
  "circle-k-meet": MapPin,
  "family-surf-ready": Baby,
};

interface QuickAnswersSectionProps {
  usps?: UspItem[];
  directAnswers?: DirectAnswerItem[];
  liveNotice?: string | null;
  ratesAreLive?: boolean;
}

export const QuickAnswersSection: React.FC<QuickAnswersSectionProps> = ({
  usps,
  directAnswers,
  liveNotice,
  ratesAreLive = false,
}) => {
  const activeUsps = usps && usps.length > 0 ? usps : CORE_USPS;
  const activeAnswers =
    directAnswers && directAnswers.length > 0
      ? directAnswers
      : HOME_DIRECT_ANSWERS;

  return (
    <section
      id="why-choose-us"
      className="py-12 sm:py-16 bg-slate-50 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {liveNotice && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2.5 text-xs sm:text-sm text-amber-950">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="font-medium">{liveNotice}</p>
          </div>
        )}

        {/* Part 0: 45-60 Word Plain-Sentence AI Overview Box for Homepage */}
        <div
          id="ai-overview-summary"
          className="bg-white rounded-2xl border border-emerald-200 p-5 sm:p-6 shadow-2xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Bali Airport Transfer Summary (DPS)
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              4 Vehicle Classes • 18 Fixed-Price Zones • 10+ Yrs Local Chauffeurs
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            A <strong>private Bali airport transfer</strong> from I Gusti Ngurah Rai International Airport (DPS) to your hotel costs a fixed{" "}
            <strong>IDR 250,000 (~$16 USD)</strong> to Kuta, Seminyak, Jimbaran, or Nusa Dua;{" "}
            <strong>IDR 275,000</strong> to Sanur; <strong>IDR 325,000</strong> to Canggu or Uluwatu; and{" "}
            <strong>IDR 400,000</strong> to Ubud per Standard Car (with Comfort Innova, 12-seat HiAce, VIP Toyota Alphard, and <strong>Bali airport transfer with baby seat</strong> at IDR 50,000 available)—including fuel, tolls, parking, flight tracking, and 60 minutes&apos; free waiting at the DPS Circle K arrivals gate with zero deposit.
          </p>
        </div>

        {/* Part 1: Clear USP Strip */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Why Book With Us
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Why Book a Private Bali Airport Transfer With Us
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Updated <time dateTime={RATES_LAST_REVIEWED}>{RATES_REVIEWED_LABEL}</time>
                {ratesAreLive ? " • Live FX active" : ""}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeUsps.map((usp) => {
              const Icon = USP_ICONS[usp.id] || ShieldCheck;
              return (
                <div
                  key={usp.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-emerald-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {usp.badge}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-1.5">
                      {usp.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {usp.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: Payment Clarity + Direct Answers Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Clear Payment Methods Box */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Payment Methods
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Zero Deposit • Two Simple Ways to Pay
                </h3>
              </div>
              <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5">
                <p className="font-bold text-emerald-950 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {PAYMENT_POLICY.cashOnArrival.title}
                </p>
                <p className="text-slate-700 leading-relaxed mb-2">
                  Pay cash directly to your chauffeur on hotel drop-off—no credit card hold to book.
                </p>
                <div className="flex flex-wrap gap-1 font-mono text-[10px] font-bold text-emerald-900">
                  {PAYMENT_POLICY.cashOnArrival.currencies.map((cur) => (
                    <span
                      key={cur}
                      className="bg-white border border-emerald-200 px-2 py-0.5 rounded"
                    >
                      Cash {cur}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <p className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <CreditCard className="w-4 h-4 text-slate-700 shrink-0" />
                  {PAYMENT_POLICY.onlinePrepay.title}
                </p>
                <p className="text-slate-600 leading-relaxed mb-2">
                  Want a cashless trip? Request an invoice link via WhatsApp after confirming and pay ahead of pickup.
                </p>
                <div className="flex flex-wrap gap-1 font-mono text-[10px] font-bold text-slate-800">
                  {PAYMENT_POLICY.onlinePrepay.methods.map((method) => (
                    <span
                      key={method}
                      className="bg-white border border-slate-200 px-2 py-0.5 rounded"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 font-medium">
                Important: Drivers do <strong>not</strong> carry card machines inside vehicles. Card/Wise/PayPal payments must be settled via online link before pickup.
              </p>

              <Link
                href="/terms-and-policies#payment"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline pt-1"
              >
                <span>Read full payment &amp; 24h free cancellation policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Direct Answers List */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Quick Facts
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Direct Answers at a Glance
                </h3>
              </div>
              <a
                href="#good-to-know"
                className="text-xs font-semibold text-emerald-700 hover:underline shrink-0"
              >
                All 12 FAQs ↓
              </a>
            </div>

            <dl className="divide-y divide-slate-100 space-y-3">
              {activeAnswers.map((item) => (
                <div key={item.question} className="pt-3 first:pt-0">
                  <dt className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    {item.question}
                  </dt>
                  <dd className="text-xs text-slate-600 leading-relaxed">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
