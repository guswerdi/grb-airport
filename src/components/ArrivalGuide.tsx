import React from "react";
import { CheckCircle2, AlertTriangle, Compass } from "lucide-react";

export const ArrivalGuide: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Touchdown & Clear Customs",
      description:
        "After landing at Denpasar (DPS), follow signs to Immigration. Present your passport and Bali Electronic Visa on Arrival (e-VoA). Scan your online Indonesian Customs QR code.",
      tip: "Fill out your online ECD customs form 2 days before flying for fastest clearance.",
    },
    {
      num: "02",
      title: "Collect Luggage & Exit Duty Free",
      description:
        "Retrieve your luggage at the baggage carousel. Pass through the duty-free walkway and follow the green exit line towards the public arrivals hall.",
      tip: "Official Bank Mandiri & BCA ATMs and Telkomsel SIM booths are available right after customs.",
    },
    {
      num: "03",
      title: "Spot Your Name on Chauffeur's Sign",
      description:
        "As you enter the main arrival greeting hall, look directly at the driver greeting line. Your driver will hold a clear sign or tablet displaying your name.",
      tip: "We send you your driver's WhatsApp contact, photo, and vehicle plate 2 hours before landing.",
    },
    {
      num: "04",
      title: "Relax in Air-Conditioned Comfort",
      description:
        "Your driver assists with your luggage and escorts you directly to the vehicle in the pick-up bay. Enjoy complimentary cold bottled water as you head to your resort.",
      tip: "Bali Mandara Ocean Tollway is included so you bypass southern Denpasar traffic jams.",
    },
  ];

  return (
    <section id="arrival-guide" className="py-16 sm:py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-slate-600" /> First Time in Bali?
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Airport Meet & Greet Works at DPS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Arriving at Ngurah Rai International Airport can feel busy after a long flight.
            Here is your simple step-by-step guide to a hassle-free arrival.
          </p>
        </div>

        {/* Step-by-step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-extrabold text-emerald-600 block mb-2 font-mono">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-emerald-800 font-medium flex items-start gap-2 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Tip: {step.tip}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Airport Warning Notice */}
        <div className="bg-amber-50 rounded-2xl p-5 sm:p-6 border border-amber-200 flex flex-col md:flex-row items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-800" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-amber-950 font-bold text-sm sm:text-base mb-1">
              Helpful Tip: Ignore Freelance Taxi Touts at the Exit Gate
            </h4>
            <p className="text-amber-900 text-xs sm:text-sm leading-relaxed">
              When walking through the exit doors of DPS arrivals, multiple unofficial drivers will ask <em>"Transport? Taxi?"</em>. They often charge 2x to 3x higher fares or claim that pre-booked drivers aren't coming. Simply keep walking straight toward the driver meeting line where your chauffeur is holding your name sign.
            </p>
          </div>
          <a
            href="https://wa.me/6285190920033?text=Hello%20Great%20Bali%20Airport%20Transfer,%20I%20am%20at%20the%20airport%20arrivals"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto text-center justify-center flex items-center whitespace-nowrap px-5 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Driver Help on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
