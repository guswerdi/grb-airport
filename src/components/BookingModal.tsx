"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Car,
  Plane,
  ShieldCheck,
  Send,
  Copy,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: any;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingData,
}) => {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const [specialNotes, setSpecialNotes] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [copiedRef, setCopiedRef] = useState(false);

  if (!isOpen || !bookingData) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(bookingRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const generateWhatsAppConfirmation = (overrideRef?: string) => {
    const currentRef = overrideRef || bookingRef;
    const isArrival = bookingData.transferType === "arrival";
    const isDeparture = bookingData.transferType === "departure";
    const isDaytour = bookingData.transferType === "daytour";

    if (isDaytour) {
      const text =
        `Hello, I would like to request a quote for a 10-hour private car charter:\n\n` +
        `Name: ${guestName || "Guest"}\n` +
        `WhatsApp: ${guestPhone}\n` +
        `Starting Area: ${bookingData.destination?.name?.split("(")[0].trim()}\n` +
        `Car: ${bookingData.vehicle?.name}\n` +
        `Date & Time: ${bookingData.pickupDate || "Flexible"} at ${bookingData.pickupTime}\n` +
        (bookingData.hotelName ? `Pickup Location: ${bookingData.hotelName}\n` : "") +
        (bookingData.flightNumber ? `Planned Route / Stops: ${bookingData.flightNumber}\n` : "") +
        (specialNotes ? `Notes: ${specialNotes}\n` : "") +
        (bookingData.babySeatNeeded ? `Baby Seat: Yes, needed (IDR 50k/seat)\n` : "") +
        `\nCould you please share the rate quote and availability? Thank you!`;

      return `https://wa.me/6285190920033?text=${encodeURIComponent(text)}`;
    }

    const routeText = isDeparture
      ? `${bookingData.hotelName || bookingData.destination?.name?.split("(")[0].trim()} to DPS Airport`
      : `DPS Airport to ${bookingData.destination?.name?.split("(")[0].trim()}`;

    const text =
      `Hello, I would like to book a Bali airport transfer:\n\n` +
      `Name: ${guestName || "Guest"}\n` +
      `WhatsApp: ${guestPhone}\n` +
      `Service: ${isDeparture ? "Hotel to Airport Drop-off" : "Airport Arrival Pickup"}\n` +
      `Route: ${routeText}\n` +
      `Car: ${bookingData.vehicle?.name}\n` +
      `Price: ${bookingData.formattedPrice} (${bookingData.priceIdr?.toLocaleString()} IDR)\n` +
      `Date & Time: ${bookingData.pickupDate || "Today/Soon"} at ${bookingData.pickupTime}\n` +
      (bookingData.flightNumber ? `Flight: ${bookingData.flightNumber}\n` : "") +
      (bookingData.hotelName ? `${isDeparture ? "Pickup Hotel" : "Drop-off Hotel"}: ${bookingData.hotelName}\n` : "") +
      `Payment: ${paymentMethod === "cash" ? "Cash on Arrival" : "Online Link"}\n` +
      (specialNotes ? `Notes: ${specialNotes}\n` : "") +
      (bookingData.babySeatNeeded ? `Baby Seat: Yes, needed (IDR 50k/seat)\n` : "") +
      `\nPlease confirm availability. Thank you!`;

    return `https://wa.me/6285190920033?text=${encodeURIComponent(text)}`;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = "DPS-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);
    setIsConfirmed(true);

    // Open WhatsApp immediately with the complete message
    const waUrl = generateWhatsAppConfirmation(refCode);
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#059669", "#047857", "#10b981"],
      });
    } catch (err) {
      // non-fatal
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-900">
        {/* Modal Header - Compact */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${bookingData.transferType === "daytour" ? "bg-amber-600" : "bg-emerald-600"}`}></span>
            <span className="font-bold text-xs sm:text-sm tracking-wide text-slate-900">
              {isConfirmed
                ? "Connecting to WhatsApp..."
                : bookingData.transferType === "departure"
                ? "Book Hotel to Airport Transfer"
                : bookingData.transferType === "daytour"
                ? "Request 10-Hour Charter Quote"
                : "Book Bali Airport Transfer"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        {!isConfirmed ? (
          <form onSubmit={handleConfirmBooking} className="p-4 sm:p-5 space-y-3">
            {/* Itinerary Preview Card - Compact */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-start gap-2 pb-2 border-b border-slate-200/70">
                <div className="min-w-0">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${bookingData.transferType === "daytour" ? "text-amber-700" : "text-emerald-700"}`}>
                    {bookingData.transferType === "departure"
                      ? "Hotel to Airport Drop-off"
                      : bookingData.transferType === "daytour"
                      ? "10-Hour Island Charter"
                      : "Airport Arrival Pickup"}
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {bookingData.transferType === "departure"
                      ? `${bookingData.hotelName || "Hotel"} ➔ DPS Airport`
                      : bookingData.transferType === "daytour"
                      ? `Private Charter (${bookingData.destination?.name?.split("(")[0]})`
                      : `DPS Airport ➔ ${bookingData.destination?.name?.split("(")[0]}`}
                  </h4>
                  {bookingData.hotelName && (
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {bookingData.transferType === "arrival" ? "Drop-off: " : "Pickup: "}
                      <strong className="text-slate-700 font-medium">{bookingData.hotelName}</strong>
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    {bookingData.transferType === "daytour" ? "Rate" : "Fixed Fare"}
                  </span>
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-none">
                    {bookingData.transferType === "daytour" ? "Quote by Admin" : bookingData.formattedPrice}
                  </span>
                  {bookingData.transferType === "daytour" && (
                    <span className="text-[10px] text-amber-700 block font-semibold mt-0.5">
                      Free Custom Quote
                    </span>
                  )}
                </div>
              </div>

              {/* Trip details grid - 1 Compact Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600">
                <div className="flex items-center gap-1 font-medium">
                  <Car className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{bookingData.vehicle?.name}</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{bookingData.pickupDate || "Today"}</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{bookingData.pickupTime}</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <Plane className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate max-w-[140px]">
                    {bookingData.flightNumber ||
                      (bookingData.transferType === "departure"
                        ? "DPS Departures"
                        : bookingData.transferType === "daytour"
                        ? "Custom Itinerary"
                        : "Flight Tracked")}
                  </span>
                </div>
              </div>
            </div>

            {/* Passenger Contact Form - 2x2 Clean Grid */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    {bookingData.transferType === "arrival"
                      ? "Name for Driver Board *"
                      : "Guest Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+61 412 345 678 or +62..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Email Address (optional)
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Special Notes / Stops (optional)
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="Villa landmark, surf bags, ATM..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Charter Quote Banner vs Payment Method */}
              {bookingData.transferType === "daytour" ? (
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/90 text-xs flex items-center gap-2.5 text-amber-950">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <strong className="font-semibold text-amber-900">Zero Upfront Payment • Quote via WhatsApp:</strong>{" "}
                    <span className="text-amber-800/90">Admin will calculate the best all-inclusive rate for your route and send it to your WhatsApp within minutes.</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 block">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`px-2.5 py-1.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                        paymentMethod === "cash"
                          ? "bg-emerald-50 border-emerald-600 text-slate-900 font-semibold"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${paymentMethod === "cash" ? "text-emerald-600" : "text-slate-400"}`} />
                        <span>Pay Cash to Driver</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">On Arrival</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("online")}
                      className={`px-2.5 py-1.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                        paymentMethod === "online"
                          ? "bg-emerald-50 border-emerald-600 text-slate-900 font-semibold"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${paymentMethod === "online" ? "text-emerald-600" : "text-slate-400"}`} />
                        <span>Online Card / Wise</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">Via Link</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free cancellation up to 12h before pickup. No prepayment for cash bookings.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit & Cancel Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg text-slate-500 hover:text-slate-800 font-medium text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-white font-bold text-xs tracking-wide shadow-xs transition-colors cursor-pointer ${
                  bookingData.transferType === "daytour"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{bookingData.transferType === "daytour" ? "Send Quote to WhatsApp" : "Book via WhatsApp"}</span>
              </button>
            </div>
          </form>
        ) : (
          /* WhatsApp Redirect Guidance State - Honest & Clear */
          <div className="p-5 sm:p-6 text-center space-y-3.5">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center mx-auto ${
              bookingData.transferType === "daytour" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
            }`}>
              <Send className={`w-5 h-5 ${bookingData.transferType === "daytour" ? "text-amber-700" : "text-emerald-700"}`} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Opening WhatsApp...
              </h3>
              <p className="text-slate-600 text-xs mt-0.5">
                {bookingData.transferType === "daytour"
                  ? "Please tap Send in your WhatsApp chat so our admin receives your charter request and replies with your quote."
                  : "Please tap Send in your WhatsApp chat so our admin receives your booking and confirms your chauffeur."}
              </p>
            </div>



            {/* Next Steps Card - Compact & Honest */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-left text-xs text-slate-600 space-y-1.5">
              <div className="font-bold text-slate-900 text-xs mb-1">
                Final Step in WhatsApp:
              </div>
              <div className="flex items-start gap-1.5">
                <span className={`w-3.5 h-3.5 rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5 ${bookingData.transferType === "daytour" ? "bg-amber-600" : "bg-emerald-600"}`}>1</span>
                <span>Your WhatsApp chat has opened with all your booking details pre-filled.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className={`w-3.5 h-3.5 rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5 ${bookingData.transferType === "daytour" ? "bg-amber-600" : "bg-emerald-600"}`}>2</span>
                <span>Press <strong>Send</strong> in WhatsApp to connect directly with our 24/7 Bali dispatch admin.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
              <a
                href={generateWhatsAppConfirmation()}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold text-xs transition-colors ${
                  bookingData.transferType === "daytour" ? "bg-amber-600 hover:bg-amber-700" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Didn't open? Open WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
