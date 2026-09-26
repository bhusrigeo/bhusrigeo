"use client";

export function StratifiedMonogramLogo({ className = "h-10 w-10 text-white" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SEDES Geosciences Monogram Logo"
    >
      {/* Top Vessel Hull */}
      <path d="M20 22 L80 22 L70 34 L30 34 Z" fill="currentColor" />

      {/* Acoustic Swath Beam */}
      <path d="M32 36 L68 36 L76 50 L24 50 Z" fill="currentColor" opacity="0.85" />

      {/* Curved Strata Layer */}
      <path d="M22 52 C35 48 65 56 78 52 L82 66 C65 70 35 62 18 66 Z" fill="currentColor" opacity="0.7" />

      {/* Benthic Bedrock Horizon */}
      <path d="M16 68 C35 64 65 72 84 68 L86 78 L14 78 Z" fill="currentColor" opacity="0.55" />

      {/* Foundation Base Layer */}
      <rect x="10" y="81" width="80" height="7" rx="1.5" fill="currentColor" />
    </svg>
  );
}
