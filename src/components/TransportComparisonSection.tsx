"use client";

import React from "react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export const TransportComparisonSection: React.FC = () => {
  const comparisonData = [
    {
      feature: "Price Certainty",
      private: { text: "Fixed upfront. No hidden fees.", icon: "check" },
      ridehailing: { text: "Surge pricing during rush hours/rain.", icon: "warning" },
      taxi: { text: "Metered. Often unpredictable.", icon: "cross" },
    },
    {
      feature: "Meeting Point",
      private: { text: "Arrival Hall with Name Sign", icon: "check" },
      ridehailing: { text: "Walk 15 mins outside airport terminal", icon: "cross" },
      taxi: { text: "Wait in long queues at taxi counter", icon: "cross" },
    },
    {
      feature: "Luggage & Comfort",
      private: { text: "Pre-booked vehicle size (Vans available)", icon: "check" },
      ridehailing: { text: "Random small cars, luggage issues", icon: "warning" },
      taxi: { text: "Standard sedans mostly", icon: "warning" },
    },
    {
      feature: "Toll & Parking Fees",
      private: { text: "All-inclusive (Free)", icon: "check" },
      ridehailing: { text: "Passenger pays extra", icon: "cross" },
      taxi: { text: "Passenger pays extra", icon: "cross" },
    },
    {
      feature: "Flight Delay Tracking",
      private: { text: "Yes, driver waits automatically", icon: "check" },
      ridehailing: { text: "No", icon: "cross" },
      taxi: { text: "No", icon: "cross" },
    },
  ];

  const renderIcon = (type: string) => {
    if (type === "check") return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
    if (type === "cross") return <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
    return <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />;
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Private Transfer vs. Grab / Airport Taxi
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Wondering what's the best way to get from Bali Airport (DPS) to your hotel? 
            Here is an honest comparison of your transport options upon arrival in Bali.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-700">
              <tr>
                <th scope="col" className="px-6 py-4 rounded-tl-2xl w-1/4">Feature / Benefit</th>
                <th scope="col" className="px-6 py-4 bg-emerald-50 text-emerald-900 w-1/4">
                  Great Bali Transfer
                  <span className="block text-[10px] font-normal text-emerald-700 mt-1">Recommended</span>
                </th>
                <th scope="col" className="px-6 py-4 w-1/4">Grab / Gojek</th>
                <th scope="col" className="px-6 py-4 rounded-tr-2xl w-1/4">Regular Airport Taxi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <th scope="row" className="px-6 py-5 font-semibold text-slate-900 align-top">
                    {row.feature}
                  </th>
                  <td className="px-6 py-5 bg-emerald-50/30 align-top">
                    <div className="flex items-start gap-2.5">
                      {renderIcon(row.private.icon)}
                      <span className="text-slate-800 font-medium">{row.private.text}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex items-start gap-2.5">
                      {renderIcon(row.ridehailing.icon)}
                      <span className="text-slate-600">{row.ridehailing.text}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex items-start gap-2.5">
                      {renderIcon(row.taxi.icon)}
                      <span className="text-slate-600">{row.taxi.text}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5 sm:p-6 text-sm text-blue-900">
          <strong>Expert Tip for Bali Arrivals:</strong> Ride-hailing apps like Grab and Gojek are heavily restricted inside the Ngurah Rai Airport terminals. If you choose a ride-hailing app, you will have to carry your luggage and walk about 15-20 minutes outside the airport gates to a designated pickup zone. Pre-booking a private transfer is the only way to have a driver wait for you directly inside the Arrival Hall holding a name sign.
        </div>
      </div>
    </section>
  );
};
