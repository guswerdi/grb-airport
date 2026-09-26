"use client";

import React from "react";
import Image from "next/image";
import { Users, Briefcase, Check, Award } from "lucide-react";
import { FLEET_DETAILS, formatPrice, BALI_DESTINATIONS } from "@/data/destinations";

interface FleetSectionProps {
  currentCurrency: string;
  onSelectVehicle: (vehicleId: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  currentCurrency,
  onSelectVehicle,
}) => {
  return (
    <section id="fleet" className="py-16 sm:py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5 text-emerald-600" /> Inspected Modern Fleet
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Private Bali Chauffeur Fleet
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Every vehicle in our fleet is 100% non-smoking, deeply cleaned before every journey,
            and equipped with air conditioning, USB chargers, and complimentary bottled water.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {FLEET_DETAILS.map((vehicle) => {
            const vehicleRateKey = vehicle.id as "standard" | "comfort" | "luxury" | "van";
            const basePriceIdr = Math.min(
              ...BALI_DESTINATIONS.map((d) => d.rates[vehicleRateKey] || 250000)
            );

            return (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col hover:shadow-md hover:border-slate-300 transition-all group"
              >
                {/* Vehicle Image */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.name} - Bali Airport Transfer`}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  {vehicle.popular && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
                      Popular Pick
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-emerald-700 font-medium mt-0.5">
                      {vehicle.model}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {vehicle.tagline}
                    </p>

                    {/* Capacity Specs */}
                    <div className="grid grid-cols-2 gap-2 my-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        <span>Max {vehicle.passengers} Pax</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                        <span>{vehicle.luggage} Bags</span>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-1.5 mb-5">
                      {vehicle.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                        Starting from
                      </span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-slate-900">
                          {formatPrice(basePriceIdr, currentCurrency)}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {formatPrice(basePriceIdr, "IDR")}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs tracking-wide transition-colors cursor-pointer"
                    >
                      Book {vehicle.name}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
