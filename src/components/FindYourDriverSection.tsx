import React from "react";
import {
  Smartphone,
  UserCheck,
  CarFront,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Footprints,
  IdCard,
} from "lucide-react";

export const DRIVER_WHATSAPP = "6285190920033";

const beforeLanding = [
  {
    icon: Smartphone,
    title: "Driver details on WhatsApp",
    text: "2 hours before landing you receive your chauffeur's name, photo, WhatsApp number, car model, and plate number.",
  },
  {
    icon: IdCard,
    title: "Save the plate number",
    text: "Screenshot the message so you can match the plate even with slow airport Wi-Fi or no data roaming.",
  },
];

const meetingSteps = [
  {
    num: "01",
    icon: Footprints,
    title: "Walk out to Circle K at the exit gate",
    text: "After immigration, baggage claim, and customs, follow the green exit signs out of the terminal. Head straight to the Circle K minimart right at the exit gate — that is our meeting point. Do not stop for freelance taxi touts along the way.",
  },
  {
    num: "02",
    icon: UserCheck,
    title: "Look for your name sign",
    text: "Your chauffeur waits in front of Circle K holding a clear name board with YOUR name and the Great Bali Airport Transfer logo. He will also be watching for you.",
  },
  {
    num: "03",
    icon: CarFront,
    title: "Confirm car & plate",
    text: "Match the car model and plate number from your WhatsApp message. Your driver helps with luggage and escorts you to the pick-up bay — usually a 2-3 minute walk.",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Find Your Driver at Bali Ngurah Rai Airport (DPS)",
  description:
    "Step-by-step instructions for meeting your Great Bali Airport Transfer chauffeur at DPS arrivals: receive driver details on WhatsApp, walk to Circle K at the exit gate, spot your name sign, and confirm the car plate.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Receive your driver details on WhatsApp",
      text: "2 hours before landing, receive your chauffeur's name, photo, WhatsApp number, car model, and plate number.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Walk out to Circle K at the exit gate",
      text: "After immigration, baggage claim, and customs, follow the green exit signs out of the terminal to the Circle K minimart right at the exit gate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Look for your name sign",
      text: "Your chauffeur waits in front of Circle K holding a name board with your name and the company logo.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Confirm the car and plate number",
      text: "Match the car model and plate number from your WhatsApp message before leaving with your driver.",
    },
  ],
};

export const FindYourDriverSection: React.FC = () => {
  return (
    <section
      id="find-your-driver"
      className="py-16 sm:py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-200"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Meet Your Chauffeur
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Find Your Driver at DPS Airport
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            No wandering, no guessing, no taxi touts. Head to Circle K at the
            exit gate and you&apos;ll be in your car within minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Left: before landing + steps */}
          <div className="lg:col-span-3 space-y-4">
            {/* Before you land */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700 mb-4">
                Before you land
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {beforeLanding.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meeting steps */}
            <div className="space-y-3">
              {meetingSteps.map((step) => (
                <div
                  key={step.num}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 flex items-start gap-4"
                >
                  <span className="text-2xl font-extrabold text-emerald-600 font-mono shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <step.icon className="w-4 h-4 text-emerald-600" />
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Right: driver card mockup + emergency contact */}
          <div className="lg:col-span-2">
            <div className="bg-slate-50 text-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xl lg:sticky lg:top-24">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Example driver assignment
              </div>

              {/* Driver identity */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-extrabold shrink-0">
                  M
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-tight">
                    Made Wirawan
                  </p>
                  <p className="text-xs text-slate-500">
                    Licensed chauffeur • English speaking
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified driver
                  </div>
                </div>
              </div>

              {/* Car details */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
                  <CarFront className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Toyota Innova Zenix
                  </p>
                  <p className="text-xs text-slate-500 font-mono tracking-wide">
                    DK 1845 UY • White
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
                Your real assignment looks exactly like this — sent to your
                WhatsApp 2 hours before landing.
              </p>

              {/* Contact buttons */}
              <div className="space-y-2.5">
                <a
                  href={`https://wa.me/${DRIVER_WHATSAPP}?text=${encodeURIComponent(
                    "Hi Great Bali Airport Transfer, I just landed at DPS and I am looking for my driver."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat driver on WhatsApp
                </a>
                <a
                  href={`tel:+${DRIVER_WHATSAPP}`}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  24/7 Airport Hotline
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Can't find us strip */}
        <div className="bg-emerald-50 rounded-2xl p-5 sm:p-6 border border-emerald-200 flex flex-col md:flex-row items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-slate-900 font-bold text-sm sm:text-base mb-1">
              Can&apos;t spot your driver? Stay inside — we come to you.
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Stay in the arrivals hall (never follow touts to the parking
              building). Message us on WhatsApp with your location and what
              you&apos;re wearing — your chauffeur will walk over to you
              within minutes.
            </p>
          </div>
          <a
            href={`https://wa.me/${DRIVER_WHATSAPP}?text=${encodeURIComponent(
              "Hi, I am at DPS arrivals and I cannot find my driver. Please help."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto text-center whitespace-nowrap px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            I Need Help Finding My Driver
          </a>
        </div>
      </div>
    </section>
  );
};