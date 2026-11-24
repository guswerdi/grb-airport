import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BALI_DESTINATIONS } from "@/data/destinations";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      {/* Upper Footer: SEO route clusters and quick links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex">
              <Logo variant="light" size={34} />
            </Link>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Private fixed-rate Bali airport transfer and chauffeur service from I Gusti Ngurah Rai International Airport (DPS) across Bali.
              Transparent fixed fares, flight tracking, personalized meet &amp; greet, and clean air-conditioned vehicles.
            </p>

            <div className="space-y-2 text-slate-300 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Ngurah Rai International Airport (DPS), Arrival Terminal Pick-Up Area, Tuban, Kuta, Bali 80361
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/6285190920033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors"
                >
                  WhatsApp: +62 851-9092-0033 (24 Hours)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>booking.grb@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Popular Airport Routes */}
          <div>
            <p className="text-white font-bold uppercase tracking-wider text-xs mb-2.5">
              Top Airport Routes
            </p>
            <ul className="space-y-0.5">
              <li>
                <Link href="/bali-airport-transfer-to-ubud" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Ubud Private Transfer
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-transfer-to-seminyak" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Seminyak &amp; Petitenget
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-transfer-to-canggu" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Canggu &amp; Berawa
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-transfer-to-uluwatu" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Uluwatu &amp; Bingin
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-transfer-to-nusa-dua" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Nusa Dua Resorts
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-transfer-to-sanur" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Sanur Fast-Boat Harbor
                </Link>
              </li>
              <li>
                <Link href="/blog" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors text-emerald-400 font-medium">
                  Travel Blog &amp; Airport Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Fleet Categories */}
          <div>
            <p className="text-white font-bold uppercase tracking-wider text-xs mb-2.5">
              Our Vehicle Fleet
            </p>
            <ul className="space-y-0.5">
              <li>
                <Link href="/#fleet" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Toyota Veloz (Standard MPV)
                </Link>
              </li>
              <li>
                <Link href="/#fleet" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Toyota Innova Zenix (Comfort SUV)
                </Link>
              </li>

              <li>
                <Link href="/bali-airport-van-transfer-hiace" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Toyota HiAce (12-Seat &amp; Surfboards)
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-departure-transfer" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Hotel to DPS Departure Transfer
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-transfer-with-baby-seat" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Baby Car Seats (IDR 50k/seat)
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-to-fast-boat-harbor" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  Sanur &amp; Padangbai Harbor Transfers
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-transfer-vip-alphard" className="inline-flex items-center min-h-7 py-1 hover:text-white transition-colors">
                  VIP Toyota Alphard Luxury Transfer
                </Link>
              </li>
            </ul>
          </div>

          {/* Guarantees & Payment */}
          <div>
            <p className="text-white font-bold uppercase tracking-wider text-xs mb-3.5">
              Traveler Guarantees
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Hidden Fees</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free 60-Min Delay Waiting</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Midnight Surcharge (24/7)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Deposit • Cash or Link</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Cash on Drop-Off
                </span>
                <div className="flex flex-wrap gap-1 text-[10px] text-slate-300 font-mono">
                  <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">IDR</span>
                  <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">AUD</span>
                  <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">USD</span>
                  <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">EUR</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Prepay Online Link (No In-Car Cards)
                </span>
                <div className="flex flex-wrap gap-1 text-[10px] text-slate-300 font-mono">
                  <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">Visa/MC</span>
                  <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">Wise</span>
                  <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* All Bali Route Guides */}
        <div className="mt-10 pt-8 border-t border-slate-800/80">
          <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mb-2">
            All Bali Airport Transfer Routes
          </p>
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-400">
            {BALI_DESTINATIONS.map((dest) => (
              <Link
                key={dest.id}
                href={`/${dest.slug}`}
                className="inline-flex items-center min-h-8 min-w-8 px-1.5 py-1 hover:text-white transition-colors"
              >
                {dest.metaName}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-slate-950 border-t border-slate-800/80 py-4 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Great Bali Airport Transfer. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/about" className="inline-flex items-center min-h-7 py-1 hover:text-slate-200 transition-colors">About Us</Link>
            <span aria-hidden="true">•</span>
            <Link href="/#good-to-know" className="inline-flex items-center min-h-7 py-1 hover:text-slate-200 transition-colors">Good to Know &amp; Tips</Link>
            <span aria-hidden="true">•</span>
            <Link href="/terms-and-policies" className="inline-flex items-center min-h-7 py-1 hover:text-slate-200 transition-colors">Terms &amp; Policies</Link>
            <span aria-hidden="true">•</span>
            <Link href="/#arrival-guide" className="inline-flex items-center min-h-7 py-1 hover:text-slate-200 transition-colors">Bali Airport Arrival Guide</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
