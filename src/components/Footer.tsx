import React from "react";
import Link from "next/link";
import { Plane, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

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
              Bali's premier 5-star private airport transfer and chauffeur service at I Gusti Ngurah Rai International Airport (DPS).
              Guaranteed transparent fixed fares, flight tracking, personalized meet & greet, and modern air-conditioned vehicles.
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
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +62 851-9092-0033 (24 Hours)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>bookings@greatbaliairporttransfer.com</span>
              </div>
            </div>
          </div>

          {/* Popular Airport Routes */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3.5">
              Top Airport Routes
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/bali-airport-transfer-to-ubud" className="hover:text-white transition-colors">
                  Bali Airport to Ubud Transfer
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-transfer-to-seminyak" className="hover:text-white transition-colors">
                  Bali Airport to Seminyak Taxi
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-transfer-to-canggu" className="hover:text-white transition-colors">
                  Bali Airport to Canggu Chauffeur
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-transfer-to-uluwatu" className="hover:text-white transition-colors">
                  Bali Airport to Uluwatu Cliffs
                </Link>
              </li>
              <li>
                <Link href="/bali-airport-transfer-to-nusa-dua" className="hover:text-white transition-colors">
                  Bali Airport to Nusa Dua Resorts
                </Link>
              </li>
              <li>
                <Link href="/#rates-table" className="hover:text-white transition-colors">
                  Bali Airport to Sanur Port
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors text-emerald-400 font-medium">
                  Travel Blog & Airport Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Fleet Categories */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3.5">
              Our Vehicle Fleet
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/#fleet" className="hover:text-white transition-colors">
                  Toyota Veloz (Standard MPV)
                </a>
              </li>
              <li>
                <a href="/#fleet" className="hover:text-white transition-colors">
                  Toyota Innova Zenix (Comfort SUV)
                </a>
              </li>

              <li>
                <a href="/#fleet" className="hover:text-white transition-colors">
                  Toyota HiAce (12-Seater Van)
                </a>
              </li>
              <li>
                <a href="/#booking-widget" className="hover:text-white transition-colors">
                  10-Hour Private Chauffeur Charter
                </a>
              </li>
              <li>
                <a href="/#fleet" className="hover:text-white transition-colors">
                  Baby Car Seats (IDR 50k/seat)
                </a>
              </li>
            </ul>
          </div>

          {/* Guarantees & Payment */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3.5">
              Traveler Guarantees
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Hidden Fees</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free 90-Min Delay Waiting</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Toll & Parking Included</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pay Cash upon Arrival</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1.5">
                Accepted Payments
              </span>
              <div className="flex flex-wrap gap-1 text-[10px] text-slate-300 font-mono">
                <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">Cash IDR</span>
                <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">AUD</span>
                <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">USD</span>
                <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">EUR</span>
                <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">Visa/MC</span>
                <span className="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">Wise</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-slate-950 border-t border-slate-800/80 py-4 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Great Bali Airport Transfer. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#faqs" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#faqs" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#arrival-guide" className="hover:text-slate-300 transition-colors">DPS Airport Guide</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
