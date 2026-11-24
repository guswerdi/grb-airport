import React from "react";
import {
  Plane,
  HeartHandshake,
  Award,
  CreditCard,
  CheckCircle,
} from "lucide-react";

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-white border-y border-slate-200/80 py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {/* Item 1 */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-sm">
                Flight Tracking & Free Waiting
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                Chauffeur tracks your flight live. 60 mins complimentary wait.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-sm">
                Flat Fares • Zero Midnight Fee
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                Same rate 24/7. Mandara toll, DPS parking &amp; fuel included.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-sm">
                Circle K Exit-Gate Meet
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                English-speaking driver waits with your name sign—plus free ATM/SIM stop.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-sm">
                Zero Deposit • Cash or Link
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                Pay cash on drop-off (IDR/AUD/USD/EUR) or prepay online (Card/Wise/PayPal).
              </p>
            </div>
          </div>
        </div>

        {/* Airport Credentials Sub-Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Dedicated Local Balinese Chauffeur Team</span>
          </div>
          <div className="flex items-center gap-4">
            <span>International Arrivals Meet &amp; Greet (Circle K)</span>
            <span className="text-slate-300">•</span>
            <span>Domestic Arrivals &amp; Hotel-to-DPS Pickups</span>
          </div>
        </div>
      </div>
    </section>
  );
};
