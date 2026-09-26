"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Cpu, Radio, ShieldCheck, Waves } from "lucide-react";

export function SurfaceToSeabed() {
  const pulses = [0, 1, 2];
  const [activeLayer, setActiveLayer] = useState<string | null>("clay");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/60">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/90 px-5 py-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3E0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00A3E0]"></span>
          </span>
          <span className="font-mono text-[#0B1B3D] font-extrabold tracking-wider uppercase text-[11px]">
            BHUSRI ACOUSTIC LOOP: (A) VSL PING → (R) COLUMN → (N) BEDROCK → (A) ECHO → (V) TELEMETRY QC
          </span>
        </div>
        <div className="font-mono text-[11px] text-slate-600 hidden lg:flex gap-5 font-bold">
          <span>LAT: 16°25&apos;15.6&quot;N</span>
          <span>LON: 82°21&apos;18.0&quot;E</span>
          <span className="text-[#00A3E0]">DATUM: WGS84</span>
        </div>
      </div>

      <svg
        viewBox="0 0 1000 520"
        className="h-auto min-h-[420px] w-full"
        role="img"
        aria-label="Animated marine acoustic survey cross-section"
      >
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="80%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0B1B3D" />
          </linearGradient>

          <linearGradient id="clay" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="silt" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="bedrock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1B3D" />
            <stop offset="100%" stopColor="#051329" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Water Column Layer */}
        <rect width="1000" height="520" fill="url(#water)" />

        {/* Bathymetric Seabed Strata */}
        <path
          d="M0 310 C160 280 240 330 390 300 S700 285 1000 315 V520 H0Z"
          fill="url(#clay)"
          className="cursor-pointer transition-opacity hover:opacity-95"
          onClick={() => setActiveLayer("clay")}
        />

        <path
          d="M0 380 C170 350 300 400 460 370 S760 350 1000 385 V520 H0Z"
          fill="url(#silt)"
          opacity="0.95"
          className="cursor-pointer transition-opacity hover:opacity-95"
          onClick={() => setActiveLayer("silt")}
        />

        <path
          d="M0 455 C180 420 330 465 520 430 S810 420 1000 450 V520 H0Z"
          fill="url(#bedrock)"
          className="cursor-pointer transition-opacity hover:opacity-95"
          onClick={() => setActiveLayer("bedrock")}
        />

        {/* Basalt Bedrock Refusal Line (Highlight Amber #F59E0B) */}
        <path
          d="M0 490 C230 455 380 500 560 470 S820 470 1000 485"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="4"
          strokeDasharray="10 4"
          opacity="0.95"
          filter="url(#glow)"
        />

        {/* Water Level Reference Datum Line */}
        <line
          x1="0"
          y1="140"
          x2="1000"
          y2="140"
          stroke="#00A3E0"
          strokeDasharray="8 12"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Surface Vessel Hull SVG (RV Pacific Explorer - SEDES Fleet) */}
        <g transform="translate(425 65)">
          {/* Hull */}
          <path
            d="M0 38 L150 38 L125 70 L25 70 Z"
            fill="#FFFFFF"
            stroke="#0B1B3D"
            strokeWidth="2.5"
          />
          {/* Superstructure */}
          <rect x="62" y="10" width="28" height="28" fill="#e0f2fe" stroke="#00A3E0" strokeWidth="1.5" rx="2" />
          <rect x="68" y="0" width="16" height="10" fill="#00A3E0" rx="1" />
          {/* Starlink Satellite Dome */}
          <circle cx="76" cy="-8" r="7" fill="#FFFFFF" stroke="#00A3E0" strokeWidth="2.5" />
          {/* Transducer Pole */}
          <path d="M76 70 L76 100" stroke="#00A3E0" strokeWidth="3.5" />
        </g>

        {/* Acoustic Sonar Cone Pulses */}
        {pulses.map((pulse) => (
          <motion.path
            key={pulse}
            d="M500 165 L320 480 M500 165 L680 480 M500 165 L500 480"
            stroke="#FFFFFF"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: [0, 0.95, 0],
              pathLength: [0, 1, 1]
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: pulse * 1.05,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Transducer Acoustic Emitter Ping Node */}
        <motion.circle
          cx="500"
          cy="165"
          r="7"
          fill="#FFFFFF"
          stroke="#00A3E0"
          strokeWidth="2"
          filter="url(#glow)"
          animate={{ r: [6, 16, 6], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />

        {/* Geohazard Shallow Gas DHI Anomaly Circle (Amber #F59E0B) */}
        <g transform="translate(620 340)">
          <circle cx="0" cy="0" r="18" fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 2" />
          <text x="24" y="4" fill="#fef08a" fontSize="12" fontFamily="monospace" fontWeight="bold">
            DHI Shallow Gas Anomaly
          </text>
        </g>

        {/* Labels & Callouts */}
        <text x="35" y="40" fill="#0B1B3D" fontSize="16" fontWeight="800">
          RV Pacific Explorer · 0.0m Surface Water Datum (LAT)
        </text>

        <text x="35" y="210" fill="#FFFFFF" fontSize="14" fontFamily="monospace" fontWeight="bold">
          Water Column · 1,420.5m Depth
        </text>

        <text x="35" y="340" fill="#f8fafc" fontSize="14" fontWeight="600">
          Soft Marine Clays &amp; Holocene Silt
        </text>

        <text x="35" y="485" fill="#fef08a" fontSize="14" fontWeight="700" fontFamily="monospace">
          Permanent Bedrock Refusal Horizon (sedes)
        </text>
      </svg>

      {/* Interactive Bottom Control Panel */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-xs text-slate-700 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-3">
          <Cpu className="h-4 w-4 text-[#00A3E0]" />
          <span className="font-mono font-bold text-[#0B1B3D]">SPREAD: Kongsberg EM2040 MBES + EdgeTech Chirp SBP</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-700">
            STARLINK LINK: ACTIVE (42ms)
          </span>
          <span className="rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-[11px] font-bold text-sky-800">
            RE-SHOOTS: 0%
          </span>
        </div>
      </div>
    </div>
  );
}
