import React from "react";

interface LogoProps {
  /** "dark" for light backgrounds, "light" for dark backgrounds (footer) */
  variant?: "dark" | "light";
  /** Height of the logo mark in px (width scales 1:1) */
  size?: number;
}

/** Brand logo mark: airplane take-off over palm silhouette on emerald squircle. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      role="img"
      aria-label="Great Bali Airport Transfer logo"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="logoBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="115" fill="url(#logoBg)" />
      <g
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="17"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M140 452 C 152 392 166 340 190 292" />
        <path d="M192 288 C 138 270 102 280 72 310" />
        <path d="M192 288 C 246 272 284 280 314 312" />
        <path d="M192 288 C 156 250 144 216 146 178" />
        <path d="M192 288 C 230 250 250 218 256 182" />
        <path d="M192 288 C 186 244 196 210 220 182" />
      </g>
      <g transform="translate(282 226) rotate(-45) scale(9.2) translate(-12 -12)">
        <path
          fill="#ffffff"
          d="M21,16v-2l-8-5V3.5C13,2.67,12.33,2,11.5,2S10,2.67,10,3.5V9l-8,5v2l8-2.5V19l-2,1.5V22l3.5-1l3.5,1v-1.5L13,19v-5.5L21,16z"
        />
      </g>
      <path
        d="M318 356 C 350 342 376 322 396 296"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="2 30"
      />
    </svg>
  );
}

/** Full lockup: logo mark + "GREAT BALI / AIRPORT TRANSFER" wordmark. */
export function Logo({ variant = "dark", size = 36 }: LogoProps) {
  const titleColor = variant === "dark" ? "text-slate-900" : "text-white";
  const subColor = variant === "dark" ? "text-emerald-700" : "text-emerald-400";

  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span className={`text-base sm:text-lg font-extrabold tracking-tight ${titleColor}`}>
          GREAT<span className={subColor}>BALI</span>
        </span>
        <span
          className={`text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-semibold mt-1 ${
            variant === "dark" ? "text-slate-500" : "text-slate-400"
          }`}
        >
          Airport Transfer
        </span>
      </span>
    </span>
  );
}
