"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  PlaneTakeoff,
  Users,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Send,
  ArrowRightLeft,
  Car,
  Building2,
  Plane,
} from "lucide-react";
import {
  BALI_DESTINATIONS,
  FLEET_DETAILS,
  formatPrice,
  Destination,
} from "@/data/destinations";

interface BookingWidgetProps {
  currentCurrency: string;
  onOpenBookingModal: (bookingData: any) => void;
  preSelectedDestinationId?: string;
  selectedVehicleId?: string;
  onVehicleChange?: (vehicleId: string) => void;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  currentCurrency,
  onOpenBookingModal,
  preSelectedDestinationId,
  selectedVehicleId: controlledVehicleId,
  onVehicleChange,
}) => {
  const [transferType, setTransferType] = useState<"arrival" | "departure" | "daytour">("arrival");
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(
    preSelectedDestinationId || "ubud"
  );
  const [selectedVehicleIdInternal, setSelectedVehicleIdInternal] =
    useState<string>("comfort");
  // Controlled when parent passes selectedVehicleId + onVehicleChange
  // (vehicle choice shared with Popular Routes cards), otherwise internal.
  const selectedVehicleId = controlledVehicleId ?? selectedVehicleIdInternal;
  const setSelectedVehicleId = onVehicleChange ?? setSelectedVehicleIdInternal;
  const [pickupDate, setPickupDate] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>("12:00");
  const [flightNumber, setFlightNumber] = useState<string>("");
  const [hotelName, setHotelName] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(2);
  const [luggage, setLuggage] = useState<number>(2);
  const [babySeatNeeded, setBabySeatNeeded] = useState<boolean>(false);

  // Auto-clamp passengers and luggage if user selects a smaller vehicle
  useEffect(() => {
    const veh = FLEET_DETAILS.find((v) => v.id === selectedVehicleId);
    if (veh) {
      if (passengers > veh.passengers) {
        setPassengers(veh.passengers);
      }
      if (luggage > veh.luggage) {
        setLuggage(veh.luggage);
      }
    }
  }, [selectedVehicleId]);

  // Active destination
  const activeDestination: Destination = useMemo(() => {
    return (
      BALI_DESTINATIONS.find((d) => d.id === selectedDestinationId) ||
      BALI_DESTINATIONS[0]
    );
  }, [selectedDestinationId]);

  // Calculate price based on destination & vehicle (for airport transfers)
  const calculatedPriceIdr = useMemo(() => {
    if (transferType === "daytour") return 0;

    const rates = activeDestination.rates;
    if (selectedVehicleId === "standard") return rates.standard;
    if (selectedVehicleId === "comfort") return rates.comfort;
    if (selectedVehicleId === "luxury") return rates.luxury;
    return rates.van;
  }, [transferType, activeDestination, selectedVehicleId]);

  const activeVehicle = useMemo(() => {
    return (
      FLEET_DETAILS.find((v) => v.id === selectedVehicleId) || FLEET_DETAILS[1]
    );
  }, [selectedVehicleId]);

  // Handle WhatsApp Direct Booking / Quote Link
  const generateWhatsAppLink = () => {
    if (transferType === "daytour") {
      const text =
        `Hello, I would like to request a quote for a 10-hour private car charter:\n\n` +
        `Starting Area: ${activeDestination.name.split("(")[0].trim()}\n` +
        `Car: ${activeVehicle.shortLabel || activeVehicle.name}\n` +
        `Date & Time: ${pickupDate || "Flexible"} at ${pickupTime}\n` +
        (hotelName ? `Pickup Location: ${hotelName}\n` : "") +
        (flightNumber ? `Planned Route / Stops: ${flightNumber}\n` : "") +
        `Passengers: ${passengers} pax, ${luggage} bags\n` +
        (babySeatNeeded ? `Baby Seat: Yes, needed (IDR 50k/seat)\n` : "") +
        `\nCould you please share the rate quote and availability? Thank you!`;

      return `https://wa.me/6285190920033?text=${encodeURIComponent(text)}`;
    }

    const isArrival = transferType === "arrival";
    const route = isArrival
      ? `DPS Airport to ${activeDestination.name.split("(")[0].trim()}`
      : `${hotelName || activeDestination.name.split("(")[0].trim()} to DPS Airport`;

    const text =
      `Hello, I would like to book a Bali airport transfer:\n\n` +
      `Service: ${isArrival ? "Airport Arrival Pickup" : "Hotel to Airport Drop-off"}\n` +
      `Route: ${route}\n` +
      `Car: ${activeVehicle.shortLabel || activeVehicle.name}\n` +
      `Price: ${formatPrice(calculatedPriceIdr, currentCurrency)} (${formatPrice(calculatedPriceIdr, "IDR")})\n` +
      `Date & Time: ${pickupDate || "Today/Soon"} at ${pickupTime}\n` +
      (flightNumber ? `Flight: ${flightNumber}\n` : "") +
      (hotelName ? `${isArrival ? "Drop-off Hotel" : "Pickup Hotel"}: ${hotelName}\n` : "") +
      `Passengers: ${passengers} pax, ${luggage} bags\n` +
      (babySeatNeeded ? `Baby Seat: Yes, needed (IDR 50k/seat)\n` : "") +
      `\nPlease confirm availability. Thank you!`;

    return `https://wa.me/6285190920033?text=${encodeURIComponent(text)}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waUrl = generateWhatsAppLink();
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }
  };

  return (
    <div
      id="booking-widget"
      className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-4 sm:p-6 text-slate-900">
        {/* Service Type Switcher - Fully Responsive Segmented Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
          <div className="grid grid-cols-3 sm:flex items-center gap-1.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setTransferType("arrival")}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg font-semibold sm:font-medium text-xs transition-colors cursor-pointer text-center ${
                transferType === "arrival"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <PlaneTakeoff className="w-3.5 h-3.5 rotate-45 shrink-0" />
              <span className="hidden sm:inline">Airport Pickup</span>
              <span className="sm:hidden">Pickup</span>
            </button>

            <button
              type="button"
              onClick={() => setTransferType("departure")}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg font-semibold sm:font-medium text-xs transition-colors cursor-pointer text-center ${
                transferType === "departure"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Hotel to Airport</span>
              <span className="sm:hidden">Drop-off</span>
            </button>

            <button
              type="button"
              onClick={() => setTransferType("daytour")}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 sm:py-1.5 rounded-lg font-semibold sm:font-medium text-xs transition-colors cursor-pointer text-center ${
                transferType === "daytour"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">10-Hour Charter</span>
              <span className="sm:hidden">Day Tour</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Toll & Parking Included</span>
          </div>
        </div>

        {/* Dynamic Route Flow Banner */}
        {transferType === "arrival" && (
          <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl px-3.5 py-2 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-emerald-950 font-medium mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"></span>
              <span className="font-semibold text-emerald-900">Pickup: Bali Airport (DPS) Arrivals</span>
              <span className="text-slate-400">➔</span>
              <span className="text-slate-800">
                Drop-off: <strong>{activeDestination.name.split("(")[0]}</strong>
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded font-mono">
                ~{activeDestination.distanceKm} km ({activeDestination.durationMinutes})
              </span>
            </div>
            <span className="text-[11px] text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200 font-semibold self-start sm:self-auto shrink-0 shadow-2xs">
              Driver awaits with Name Sign at Gate
            </span>
          </div>
        )}

        {transferType === "departure" && (
          <div className="bg-sky-50/90 border border-sky-200 rounded-xl px-3.5 py-2 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sky-950 font-medium mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse shrink-0"></span>
              <span className="font-semibold text-sky-900">
                Pickup: Hotel / Villa in {activeDestination.name.split("(")[0]}
              </span>
              <span className="text-slate-400">➔</span>
              <span className="text-slate-800">
                Drop-off: <strong>Bali Airport (DPS) Departures</strong>
              </span>
              <span className="text-[10px] text-sky-700 bg-sky-100/80 px-1.5 py-0.5 rounded font-mono">
                ~{activeDestination.distanceKm} km ({activeDestination.durationMinutes})
              </span>
            </div>
            <span className="text-[11px] text-sky-800 bg-white px-2 py-0.5 rounded border border-sky-200 font-semibold self-start sm:self-auto shrink-0 shadow-2xs">
              Direct Hotel Lobby to Terminal
            </span>
          </div>
        )}

        {transferType === "daytour" && (
          <div className="bg-amber-50/90 border border-amber-200 rounded-xl px-3.5 py-2 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-amber-950 font-medium mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="font-semibold text-amber-950">10-Hour Private Chauffeur Charter</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-800">
                Starting from: <strong>{activeDestination.name.split("(")[0]}</strong>
              </span>
            </div>
            <span className="text-[11px] text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200 font-semibold self-start sm:self-auto shrink-0 shadow-2xs">
              Custom Quote by Admin • Fuel & Chauffeur Included
            </span>
          </div>
        )}

        <form onSubmit={handleBookingSubmit} className="space-y-3">
          {/* Main 4-Column Compact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Destination / Origin Area */}
            <div className="space-y-1">
              <label
                htmlFor="destination-select"
                className="text-[11px] font-semibold text-slate-700 flex items-center justify-between"
              >
                <span className="flex items-center gap-1">
                  {transferType === "arrival" ? (
                    <>
                      <MapPin className="w-3 h-3 text-emerald-600" /> Drop-off Area in Bali
                    </>
                  ) : transferType === "departure" ? (
                    <>
                      <Building2 className="w-3 h-3 text-sky-600" /> Pickup Area in Bali
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3 h-3 text-amber-600" /> Tour Pickup Zone
                    </>
                  )}
                </span>
                <span className="text-[10px] text-slate-500 font-normal">
                  ~{activeDestination.distanceKm}km
                </span>
              </label>
              <select
                value={selectedDestinationId}
                onChange={(e) => setSelectedDestinationId(e.target.value)}
                className={`w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2.5 py-2 text-xs focus:outline-none font-medium cursor-pointer ${
                  transferType === "departure"
                    ? "focus:border-sky-600 focus:bg-white"
                    : transferType === "daytour"
                    ? "focus:border-amber-600 focus:bg-white"
                    : "focus:border-emerald-600 focus:bg-white"
                }`}
                id="destination-select"
              >
                {BALI_DESTINATIONS.map((dest) => (
                  <option key={dest.id} value={dest.id} className="text-slate-900">
                    {dest.name.split("(")[0]}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Car Type */}
            <div className="space-y-1">
              <label
                htmlFor="car-type-select"
                className="text-[11px] font-semibold text-slate-700 flex items-center gap-1"
              >
                <Car className="w-3 h-3 text-emerald-600" /> Car Type
              </label>
              <select
                id="car-type-select"
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className={`w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2.5 py-2 text-xs focus:outline-none font-medium cursor-pointer ${
                  transferType === "departure"
                    ? "focus:border-sky-600 focus:bg-white"
                    : transferType === "daytour"
                    ? "focus:border-amber-600 focus:bg-white"
                    : "focus:border-emerald-600 focus:bg-white"
                }`}
              >
                {FLEET_DETAILS.map((veh) => {
                  if (transferType === "daytour") {
                    return (
                      <option key={veh.id} value={veh.id} className="text-slate-900">
                        {veh.shortLabel || veh.name} (Quote on Request)
                      </option>
                    );
                  }

                  let p = activeDestination.rates.standard;
                  if (veh.id === "comfort") p = activeDestination.rates.comfort;
                  if (veh.id === "luxury") p = activeDestination.rates.luxury;
                  if (veh.id === "van") p = activeDestination.rates.van;

                  return (
                    <option key={veh.id} value={veh.id} className="text-slate-900">
                      {veh.shortLabel || veh.name} — {formatPrice(p, currentCurrency)}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* 3. Date & Time */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  {transferType === "arrival" ? (
                    <>
                      <Calendar className="w-3 h-3 text-emerald-600" /> Landing Date & Time
                    </>
                  ) : transferType === "departure" ? (
                    <>
                      <Clock className="w-3 h-3 text-sky-600" /> Hotel Pickup Time
                    </>
                  ) : (
                    <>
                      <Calendar className="w-3 h-3 text-amber-600" /> Tour Date & Start Time
                    </>
                  )}
                </span>
                {transferType === "departure" && (
                  <span className="text-[10px] text-sky-700 font-normal">3h before flight</span>
                )}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  id="pickup-date"
                  type="date"
                  aria-label="Pickup date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className={`bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2 py-2 text-xs focus:outline-none cursor-pointer ${
                    transferType === "departure"
                      ? "focus:border-sky-600 focus:bg-white"
                      : transferType === "daytour"
                      ? "focus:border-amber-600 focus:bg-white"
                      : "focus:border-emerald-600 focus:bg-white"
                  }`}
                  required
                />
                <input
                  id="pickup-time"
                  type="time"
                  aria-label="Pickup time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className={`bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2 py-2 text-xs focus:outline-none cursor-pointer ${
                    transferType === "departure"
                      ? "focus:border-sky-600 focus:bg-white"
                      : transferType === "daytour"
                      ? "focus:border-amber-600 focus:bg-white"
                      : "focus:border-emerald-600 focus:bg-white"
                  }`}
                  required
                />
              </div>
            </div>

            {/* 4. Flight Number (Arrival) OR Pickup Hotel (Departure) OR Tour Stops (Day Tour) */}
            <div className="space-y-1">
              {transferType === "arrival" ? (
                <>
                  <label
                    htmlFor="arrival-flight-no"
                    className="text-[11px] font-semibold text-slate-700 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1">
                      <Plane className="w-3 h-3 text-emerald-600" /> Arrival Flight No.
                    </span>
                    <span className="text-[10px] text-emerald-700 font-normal">Live Delay Tracking</span>
                  </label>
                  <input
                    id="arrival-flight-no"
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. SQ944, QF43, GA402"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-600 focus:bg-white placeholder:text-slate-400 font-medium"
                  />
                </>
              ) : transferType === "departure" ? (
                <>
                  <label
                    htmlFor="pickup-hotel"
                    className="text-[11px] font-semibold text-slate-700 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-sky-600" /> Pickup Hotel / Villa
                    </span>
                    <span className="text-[10px] text-sky-700 font-normal">Lobby Pickup</span>
                  </label>
                  <input
                    id="pickup-hotel"
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    placeholder="e.g. Padma Resort Legian Lobby"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-sky-600 focus:bg-white placeholder:text-slate-400 font-medium"
                  />
                </>
              ) : (
                <>
                  <label
                    htmlFor="tour-wishlist"
                    className="text-[11px] font-semibold text-slate-700 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" /> Tour Wishlist
                    </span>
                    <span className="text-[10px] text-amber-800 font-normal">Customizable</span>
                  </label>
                  <input
                    id="tour-wishlist"
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. Ubud waterfalls, rice terraces"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-amber-600 focus:bg-white placeholder:text-slate-400 font-medium"
                  />
                </>
              )}
            </div>
          </div>

          {/* Row 2: Secondary Context Field Based on Transfer Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {transferType === "arrival" ? (
              <>
                <div className="space-y-1">
                  <label
                    htmlFor="dropoff-hotel"
                    className="text-[11px] font-semibold text-slate-700 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-emerald-600" /> Drop-off Hotel / Resort / Villa Name
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                  </label>
                  <input
                    id="dropoff-hotel"
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    placeholder="e.g. W Bali Seminyak, The Mulia, or private villa address"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-600 focus:bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2 self-end">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Your driver tracks flight delays in real time and waits holding your name sign at DPS arrival greeting gate.
                  </span>
                </div>
              </>
            ) : transferType === "departure" ? (
              <>
                <div className="space-y-1">
                  <label
                    htmlFor="departure-flight-no"
                    className="text-[11px] font-semibold text-slate-700 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1">
                      <Plane className="w-3 h-3 text-sky-600" /> Departure Flight No. & Terminal
                    </span>
                    <span className="text-[10px] text-sky-700 font-normal">International or Domestic</span>
                  </label>
                  <input
                    id="departure-flight-no"
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. SQ945 (International) or GA403 (Domestic)"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-sky-600 focus:bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-sky-50/50 border border-sky-100 rounded-lg px-3 py-2 self-end">
                  <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>
                    Recommended pickup: 3–4 hours before International flights; 2 hours before Domestic flights.
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <label
                    htmlFor="tour-pickup-hotel"
                    className="text-[11px] font-semibold text-slate-700 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-amber-600" /> Morning Pickup Hotel / Villa Address
                    </span>
                    <span className="text-[10px] text-amber-800 font-normal">Lobby or Villa</span>
                  </label>
                  <input
                    id="tour-pickup-hotel"
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    placeholder="e.g. Villa in Seminyak, Resort lobby in Ubud..."
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-amber-600 focus:bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-amber-50/50 border border-amber-100 rounded-lg px-3 py-2 self-end">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Includes private AC car for 10 hours, dedicated chauffeur, fuel & toll. Exact rate will be quoted by admin based on your customized itinerary.
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Bottom Bar: Pricing + Quick Counters + CTA Buttons - Fully Responsive */}
          <div className="pt-3.5 border-t border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full lg:w-auto">
              {/* Price Preview */}
              <div className="flex items-baseline justify-between sm:justify-start w-full sm:w-auto">
                {transferType === "daytour" ? (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-700 block leading-tight flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600 inline" /> Custom Tour Rate
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
                        Request a Quote
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                      Price determined by admin based on your route
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                      Guaranteed Fixed Fare
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
                        {formatPrice(calculatedPriceIdr, currentCurrency)}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        ({formatPrice(calculatedPriceIdr, "IDR")})
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive Pax & Luggage Adjusters */}
              <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
                {/* Person / Passengers Counter */}
                <div 
                  className="flex items-center justify-between sm:justify-start bg-slate-100/90 border border-slate-200 rounded-lg p-1 text-xs shadow-2xs"
                  title="Number of passengers"
                >
                  <div className="flex items-center gap-1.5 px-2 py-0.5 min-w-0">
                    <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="font-bold text-slate-800 text-xs tabular-nums truncate">
                      {passengers} <span className="text-[10px] sm:text-[11px] font-medium text-slate-500">pax</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 border-l border-slate-200/80 pl-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setPassengers((prev) => Math.max(1, prev - 1))}
                      disabled={passengers <= 1}
                      className="w-6 h-6 sm:w-5 sm:h-5 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-black shadow-2xs transition-all cursor-pointer select-none"
                      aria-label="Decrease passengers"
                      title="Decrease passengers"
                    >
                      −
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (passengers >= activeVehicle.passengers) {
                          if (selectedVehicleId === "standard") {
                            setSelectedVehicleId("comfort");
                          } else if (selectedVehicleId === "comfort" || selectedVehicleId === "luxury") {
                            setSelectedVehicleId("van");
                          }
                        }
                        setPassengers((prev) => Math.min(12, prev + 1));
                      }}
                      disabled={passengers >= 12}
                      className="w-6 h-6 sm:w-5 sm:h-5 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-black shadow-2xs transition-all cursor-pointer select-none"
                      aria-label="Increase passengers"
                      title={passengers >= activeVehicle.passengers ? `Increase passengers (auto-upgrades vehicle)` : `Increase passengers`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Bag / Luggage Counter */}
                <div 
                  className="flex items-center justify-between sm:justify-start bg-slate-100/90 border border-slate-200 rounded-lg p-1 text-xs shadow-2xs"
                  title="Number of suitcases/bags"
                >
                  <div className="flex items-center gap-1.5 px-2 py-0.5 min-w-0">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="font-bold text-slate-800 text-xs tabular-nums truncate">
                      {luggage} <span className="text-[10px] sm:text-[11px] font-medium text-slate-500">{luggage === 1 ? "bag" : "bags"}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 border-l border-slate-200/80 pl-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setLuggage((prev) => Math.max(0, prev - 1))}
                      disabled={luggage <= 0}
                      className="w-6 h-6 sm:w-5 sm:h-5 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-black shadow-2xs transition-all cursor-pointer select-none"
                      aria-label="Decrease luggage"
                      title="Decrease luggage"
                    >
                      −
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (luggage >= activeVehicle.luggage) {
                          if (selectedVehicleId === "standard") {
                            setSelectedVehicleId("comfort");
                          } else if (selectedVehicleId === "comfort" || selectedVehicleId === "luxury") {
                            setSelectedVehicleId("van");
                          }
                        }
                        setLuggage((prev) => Math.min(10, prev + 1));
                      }}
                      disabled={luggage >= 10}
                      className="w-6 h-6 sm:w-5 sm:h-5 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-black shadow-2xs transition-all cursor-pointer select-none"
                      aria-label="Increase luggage"
                      title={luggage >= activeVehicle.luggage ? `Increase luggage (auto-upgrades vehicle)` : `Increase luggage`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="w-full lg:w-auto">
              <button
                type="submit"
                id="btn-reserve-instant"
                className={`w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer ${
                  transferType === "daytour"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {transferType === "daytour"
                    ? "Request Quote via WhatsApp ➔"
                    : "Book via WhatsApp ➔"}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
