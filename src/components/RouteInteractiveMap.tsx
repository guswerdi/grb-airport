"use client";

import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  Navigation,
  Plane,
  MapPin,
  Clock,
  ShieldCheck,
  ExternalLink,
  Play,
  Pause,
  ArrowRightLeft,
  Maximize2,
} from "lucide-react";
import type { Destination } from "@/data/destinations";
import {
  DPS_AIRPORT_COORDS,
  ROUTE_GEOMETRY,
  type RouteGeometry,
} from "@/data/routeCoordinates";

interface RouteInteractiveMapProps {
  destination: Destination;
}

/**
 * Generates a smooth Catmull-Rom spline through the road waypoints so both the
 * route polyline and the animated car follow realistic curved roads.
 */
function buildSmoothPath(
  points: [number, number][],
  segmentsPerSpan: number = 18
): [number, number][] {
  if (points.length < 2) return points;
  const smooth: [number, number][] = [];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    for (let step = 0; step < segmentsPerSpan; step++) {
      const t = step / segmentsPerSpan;
      const t2 = t * t;
      const t3 = t2 * t;

      const lat =
        0.5 *
        (2 * p1[0] +
          (-p0[0] + p2[0]) * t +
          (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
          (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);

      const lng =
        0.5 *
        (2 * p1[1] +
          (-p0[1] + p2[1]) * t +
          (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
          (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);

      smooth.push([lat, lng]);
    }
  }

  smooth.push(points[points.length - 1]);
  return smooth;
}

/** Bearing in degrees (0 = North, 90 = East) from point A to point B. */
function computeBearingDeg(a: [number, number], b: [number, number]): number {
  const dLat = b[0] - a[0];
  const dLng = b[1] - a[1];
  const angleRad = Math.atan2(dLng, dLat);
  return (angleRad * 180) / Math.PI;
}

export const RouteInteractiveMap: React.FC<RouteInteractiveMapProps> = ({
  destination,
}) => {
  const geometry: RouteGeometry = ROUTE_GEOMETRY[destination.id] || {
    coordinates: [-8.5069, 115.2625],
    corridorLabel: "Via Jl. Bypass Ngurah Rai",
    viaMandaraToll: false,
    waypoints: [DPS_AIRPORT_COORDS, [-8.5069, 115.2625]],
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const directionRef = useRef<"arrival" | "departure">("arrival");
  const isPlayingRef = useRef<boolean>(true);
  const isVisibleRef = useRef<boolean>(false);

  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [direction, setDirection] = useState<"arrival" | "departure">("arrival");
  const [isPlaying, setIsPlaying] = useState(true);

  const shortDestName =
    destination.metaName || destination.name.split("(")[0].trim();

  const googleMapsUrl =
    direction === "arrival"
      ? `https://www.google.com/maps/dir/?api=1&origin=${DPS_AIRPORT_COORDS[0]},${DPS_AIRPORT_COORDS[1]}&destination=${geometry.coordinates[0]},${geometry.coordinates[1]}&travelmode=driving`
      : `https://www.google.com/maps/dir/?api=1&origin=${geometry.coordinates[0]},${geometry.coordinates[1]}&destination=${DPS_AIRPORT_COORDS[0]},${DPS_AIRPORT_COORDS[1]}&travelmode=driving`;

  // Sync state to refs consumed by the requestAnimationFrame loop
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Lazy-mount when scrolled near viewport and pause animation when offscreen
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      isVisibleRef.current = true;
      const t = window.setTimeout(() => setShouldLoadMap(true), 0);
      return () => window.clearTimeout(t);
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      isPlayingRef.current = false;
    }
    const handleMotionChange = (e: MediaQueryListEvent) => {
      const play = !e.matches;
      setIsPlaying(play);
      isPlayingRef.current = play;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Initialize Leaflet map + route polyline + animated car marker
  useEffect(() => {
    if (!shouldLoadMap || !mapContainerRef.current) return;

    let cancelled = false;
    let rafId: number | null = null;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      mapInstanceRef.current = map;

      // Official OpenStreetMap standard raster tiles (zero API key required)
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const smoothCurve = buildSmoothPath(geometry.waypoints, 18);

      // Outer subtle glow + crisp emerald route line
      L.polyline(smoothCurve, {
        color: "#064e3b",
        weight: 8,
        opacity: 0.18,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      const routeLine = L.polyline(smoothCurve, {
        color: "#059669",
        weight: 4.5,
        opacity: 0.92,
        dashArray: "10, 6",
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // 1. DPS Airport Origin Pin
      const dpsIcon = L.divIcon({
        className: "dps-airport-pin",
        iconSize: [148, 36],
        iconAnchor: [74, 34],
        popupAnchor: [0, -32],
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;pointer-events:auto;">
            <div style="background:#064e3b;color:#ffffff;font-size:11px;font-weight:800;padding:4px 9px;border-radius:9999px;border:2px solid #34d399;box-shadow:0 6px 16px rgba(6,78,59,0.35);white-space:nowrap;display:flex;align-items:center;gap:5px;">
              <span style="display:inline-block;width:7px;height:7px;border-radius:9999px;background:#34d399;"></span>
              <span>DPS Airport</span>
            </div>
            <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid #064e3b;margin-top:-1px;"></div>
          </div>
        `,
      });

      const dpsMarker = L.marker(DPS_AIRPORT_COORDS, { icon: dpsIcon }).addTo(
        map
      );
      dpsMarker.bindPopup(
        `<div style="font-family:sans-serif;font-size:12px;line-height:1.45;color:#0f172a;max-width:220px;">
          <strong style="color:#065f46;display:block;margin-bottom:2px;">Ngurah Rai Airport (DPS)</strong>
          <span>Meet your driver outside the <strong>Circle K minimart</strong> at the arrivals exit gate, where they wait with your name sign (60-min free wait).</span>
        </div>`
      );

      // 2. Destination Zone Pin
      const destIcon = L.divIcon({
        className: "dest-zone-pin",
        iconSize: [168, 36],
        iconAnchor: [84, 34],
        popupAnchor: [0, -32],
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;pointer-events:auto;">
            <div style="background:#0f172a;color:#ffffff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:9999px;border:2px solid #ffffff;box-shadow:0 6px 16px rgba(15,23,42,0.35);white-space:nowrap;display:flex;align-items:center;gap:5px;">
              <span style="display:inline-block;width:7px;height:7px;border-radius:9999px;background:#10b981;"></span>
              <span>${shortDestName}</span>
            </div>
            <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid #0f172a;margin-top:-1px;"></div>
          </div>
        `,
      });

      const destMarker = L.marker(geometry.coordinates, {
        icon: destIcon,
      }).addTo(map);
      destMarker.bindPopup(
        `<div style="font-family:sans-serif;font-size:12px;line-height:1.45;color:#0f172a;max-width:220px;">
          <strong style="color:#0f172a;display:block;margin-bottom:2px;">${shortDestName} Drop-Off Zone</strong>
          <span>~${destination.distanceKm} km from DPS (${destination.durationMinutes}). Door-to-door hotel &amp; villa transfer.</span>
        </div>`
      );

      // 3. Animated Private Car Marker (updated via requestAnimationFrame, zero React state updates)
      const carIcon = L.divIcon({
        className: "animated-transfer-car",
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        html: `
          <div data-car-rotator style="width:38px;height:38px;display:flex;align-items:center;justify-content:center;transition:transform 80ms linear;will-change:transform;">
            <div style="width:32px;height:32px;border-radius:9999px;background:#059669;border:2.5px solid #ffffff;box-shadow:0 4px 14px rgba(5,150,105,0.55);display:flex;align-items:center;justify-content:center;">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(0deg);">
                <path d="M12 2L19 21L12 17L5 21L12 2Z" fill="#ffffff"/>
              </svg>
            </div>
          </div>
        `,
      });

      const carMarker = L.marker(smoothCurve[0], {
        icon: carIcon,
        interactive: false,
        zIndexOffset: 900,
      }).addTo(map);

      // Fit route bounds with comfortable padding
      map.fitBounds(routeLine.getBounds(), {
        padding: [56, 56],
        maxZoom: 14,
      });

      setMapReady(true);

      // Smooth animation loop along smoothCurve
      const tripDurationMs = 8500;
      const pauseDurationMs = 950;
      const cycleMs = tripDurationMs + pauseDurationMs;
      let startTimestamp: number | null = null;
      let accumulatedMs = 0;

      const animateCar = (now: number) => {
        if (cancelled) return;

        if (startTimestamp === null) {
          startTimestamp = now;
        }
        const delta = now - startTimestamp;
        startTimestamp = now;

        if (isPlayingRef.current && isVisibleRef.current) {
          accumulatedMs = (accumulatedMs + delta) % cycleMs;
        }

        const rawT = Math.min(1, accumulatedMs / tripDurationMs);
        // Smooth cosine ease-in-out so departure and arrival feel natural
        const easedT = 0.5 - 0.5 * Math.cos(rawT * Math.PI);

        const activePath =
          directionRef.current === "arrival"
            ? smoothCurve
            : [...smoothCurve].reverse();

        const maxIdx = activePath.length - 1;
        const exactIdx = easedT * maxIdx;
        const idxA = Math.min(maxIdx, Math.floor(exactIdx));
        const idxB = Math.min(maxIdx, idxA + 1);
        const frac = exactIdx - idxA;

        const ptA = activePath[idxA];
        const ptB = activePath[idxB];
        const lat = ptA[0] + (ptB[0] - ptA[0]) * frac;
        const lng = ptA[1] + (ptB[1] - ptA[1]) * frac;

        carMarker.setLatLng([lat, lng]);

        // Rotate arrow toward next point on the road
        const lookAheadIdx = Math.min(maxIdx, idxA + 2);
        const bearing = computeBearingDeg(ptA, activePath[lookAheadIdx]);
        const el = carMarker.getElement();
        const rotator = el?.querySelector(
          "[data-car-rotator]"
        ) as HTMLElement | null;
        if (rotator && idxA < maxIdx) {
          rotator.style.transform = `rotate(${bearing.toFixed(1)}deg)`;
        }

        rafId = window.requestAnimationFrame(animateCar);
      };

      rafId = window.requestAnimationFrame(animateCar);
    };

    initMap();

    return () => {
      cancelled = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [shouldLoadMap, destination.id, destination.distanceKm, destination.durationMinutes, geometry.coordinates, geometry.waypoints, shortDestName]);

  const handleFitRoute = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.fitBounds([DPS_AIRPORT_COORDS, geometry.coordinates], {
      padding: [56, 56],
      maxZoom: 14,
    });
  };

  const handleFocusDps = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo(DPS_AIRPORT_COORDS, 14, { duration: 0.8 });
  };

  const handleFocusDestination = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo(geometry.coordinates, 13, { duration: 0.8 });
  };

  return (
    <section
      ref={wrapperRef}
      aria-label={`Interactive route map from Bali Airport (DPS) to ${shortDestName}`}
      className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
    >
      {/* Top Bar */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <Navigation className="w-3.5 h-3.5" /> Live Route Corridor Map
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            {direction === "arrival"
              ? `DPS Airport ➔ ${shortDestName}`
              : `${shortDestName} ➔ DPS Airport`}{" "}
            ({destination.distanceKm} km)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {geometry.corridorLabel} • Typical drive:{" "}
            <strong className="text-slate-700">{destination.durationMinutes}</strong>
          </p>
        </div>

        {/* Interactive Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setDirection((prev) =>
                prev === "arrival" ? "departure" : "arrival"
              )
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold transition-colors cursor-pointer"
            title="Switch between Airport Pickup and Hotel-to-Airport Departure direction"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {direction === "arrival" ? "Arrival Route" : "Departure Route"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause car animation" : "Play car animation"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Animate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Map Viewport */}
      <div className="relative h-72 sm:h-88 w-full bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {!mapReady && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-100 text-slate-500 text-xs gap-2">
            <div className="w-7 h-7 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
            <span>Loading {shortDestName} route map...</span>
          </div>
        )}

        {/* Quick Camera Pills */}
        {mapReady && (
          <div className="absolute bottom-3 left-3 z-20 flex flex-wrap items-center gap-1.5 pointer-events-auto">
            <button
              type="button"
              onClick={handleFitRoute}
              className="px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white text-slate-800 border border-slate-200 shadow-xs text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Maximize2 className="w-3 h-3 text-emerald-600" />
              <span>Full Route</span>
            </button>
            <button
              type="button"
              onClick={handleFocusDps}
              className="px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white text-slate-800 border border-slate-200 shadow-xs text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plane className="w-3 h-3 text-emerald-600" />
              <span>DPS Airport</span>
            </button>
            <button
              type="button"
              onClick={handleFocusDestination}
              className="px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white text-slate-800 border border-slate-200 shadow-xs text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>{shortDestName}</span>
            </button>
          </div>
        )}
      </div>

      {/* SSR-Readable Geographic Facts & Google Maps Deep Link */}
      <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
            <Plane className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Origin: DPS Airport (-8.7482, 115.1672)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              ~{destination.distanceKm} km ({destination.durationMinutes})
            </span>
          </span>
          {geometry.viaMandaraToll && (
            <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold text-[11px]">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Mandara Ocean Toll Included
            </span>
          )}
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline shrink-0"
        >
          <span>Open Route in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
