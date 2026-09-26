import Link from "next/link";
import { Plane, Home, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center mb-6">
        <Plane className="w-8 h-8 text-white -rotate-45" />
      </div>
      <p className="text-emerald-700 font-bold uppercase tracking-widest text-xs mb-2">
        404 - Route Not Found
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        This route seems to have taken a detour
      </h1>
      <p className="text-slate-500 max-w-md mb-8 text-sm leading-relaxed">
        The page you are looking for does not exist. Head back to our Bali
        Airport (DPS) transfer homepage for fixed fares to 19+ destinations,
        or chat with us on WhatsApp.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </Link>
        <a
          href="https://wa.me/6285190920033"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-sm transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          WhatsApp Us
        </a>
      </div>
    </div>
  );
}
