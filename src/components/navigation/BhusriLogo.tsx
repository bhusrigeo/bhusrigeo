import React from "react";
import Image from "next/image";

interface BhusriLogoProps {
  className?: string;
  variant?: "light" | "dark";
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export function BhusriLogo({
  className = "",
  variant = "dark",
  showSubtitle = true,
  size = "md"
}: BhusriLogoProps) {
  const heightMap = {
    sm: "h-8",
    md: "h-11",
    lg: "h-14",
    xl: "h-20"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${heightMap[size]} w-auto aspect-[2.1/1] flex items-center`}>
        <img
          src="/bhusri-logo.png"
          alt="BHUSRI Geosciences & Engineering Solutions"
          className="h-full w-auto object-contain filter drop-shadow-xs"
        />
      </div>
    </div>
  );
}
