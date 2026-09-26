"use client";

import React from "react";
import Link from "next/link";

interface BhusriLogoProps {
  variant?: "full" | "mark" | "light" | "dark";
  className?: string;
  height?: number | string;
  showTagline?: boolean;
}

export function BhusriLogo({
  variant = "full",
  className = "",
  height = 40,
  showTagline = true,
}: BhusriLogoProps) {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/bhusri-logo.png"
        alt="BHUSRI Geosciences & Engineering Solutions Logo"
        style={{ height: typeof height === "number" ? `${height}px` : height }}
        className={`w-auto object-contain transition-all duration-300 ${
          variant === "light" ? "brightness-0 invert drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]" : ""
        }`}
      />
    </div>
  );
}

export function BhusriHeaderLogo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:border-amber-500/50 group-hover:bg-white/15 transition-all shadow-md">
        <img
          src="/bhusri-logo.png"
          alt="BHUSRI Logo"
          className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
