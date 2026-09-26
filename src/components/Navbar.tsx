"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plane, Phone, ShieldCheck, Menu, X, DollarSign, ChevronDown } from "lucide-react";
import { EXCHANGE_RATES } from "@/data/destinations";

interface NavbarProps {
  currentCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
  onOpenBookingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency = "USD",
  onCurrencyChange,
  onOpenBookingModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Rates", href: "/#rates-table" },
    { label: "Routes", href: "/#popular-routes" },
    { label: "Fleet", href: "/#fleet" },
    { label: "Arrival Guide", href: "/#arrival-guide" },
    { label: "Blog", href: "/blog" },
    { label: "Reviews", href: "/#reviews" },
    { label: "FAQs", href: "/#faqs" },
  ];

  return (
    <>
      {/* Top Notice Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              24/7 Real-Time Flight Tracking & Meet at DPS Arrival Hall
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              Ngurah Rai International Airport (DPS) Official Chauffeur Service
            </span>
          </div>
          <div className="flex items-center gap-5 text-slate-300">
            <a
              href="https://wa.me/6285190920033?text=Hello%20Great%20Bali%20Airport%20Transfer,%20I%20would%20like%20to%20inquire%20about%20an%20airport%20transfer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +62 851-9092-0033</span>
            </a>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Fixed All-Inclusive Fares
            </span>
          </div>
        </div>
      </div>

      {/* Main Clean Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200"
            : "bg-white border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-18 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-700 transition-colors">
                <Plane className="w-4 h-4 -rotate-45" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-lg font-bold tracking-tight text-slate-900">
                    Bali<span className="text-emerald-700">Transfer</span>
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 px-1.5 py-0.5 rounded leading-none">
                    DIRECT
                  </span>
                </div>
                <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium mt-1">
                  DPS Airport Chauffeur
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Single line, never wraps */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-600">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="whitespace-nowrap hover:text-emerald-700 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Currency Selector & CTAs */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              {/* Currency Selector */}
              <div className="relative flex items-center bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 h-9 px-2 text-xs transition-colors">
                <DollarSign className="w-3.5 h-3.5 text-slate-500 mr-0.5" />
                <select
                  value={currentCurrency}
                  onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                  className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer pr-4 appearance-none"
                  aria-label="Select Currency"
                >
                  {Object.keys(EXCHANGE_RATES).map((curr) => (
                    <option key={curr} value={curr} className="bg-white text-slate-900">
                      {curr}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 pointer-events-none" />
              </div>

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/6285190920033?text=Hello%20Great%20Bali%20Airport%20Transfer,%20I%20want%20to%20book%20a%20private%20airport%20transfer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              {/* Book Button */}
              <button
                onClick={() => {
                  if (onOpenBookingModal) {
                    onOpenBookingModal();
                  } else {
                    document.getElementById("booking-widget")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs whitespace-nowrap shadow-xs transition-colors cursor-pointer flex items-center justify-center"
              >
                Book Transfer
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="relative flex items-center bg-slate-100 rounded-lg px-2 py-1 text-xs border border-slate-200">
                <select
                  value={currentCurrency}
                  onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                  className="bg-transparent text-slate-800 font-semibold focus:outline-none"
                  aria-label="Select Currency"
                >
                  {Object.keys(EXCHANGE_RATES).map((curr) => (
                    <option key={curr} value={curr} className="bg-white text-slate-900">
                      {curr}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-emerald-700 py-1.5 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://wa.me/6285190920033?text=Hello%20Great%20Bali%20Airport%20Transfer,%20I%20want%20to%20book%20a%20private%20airport%20transfer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-600" /> WhatsApp (+62 851-9092-0033)
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenBookingModal) {
                    onOpenBookingModal();
                  } else {
                    document.getElementById("booking-widget")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full text-center py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-sm"
              >
                Book Transfer
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
