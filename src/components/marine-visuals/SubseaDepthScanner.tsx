"use client";

import { useState } from "react";
import { Layers, AlertTriangle, Compass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function SubseaDepthScanner() {
  const [depth, setDepth] = useState<number>(1420);

  const strataInfo = [
    {
      range: [0, 200],
      name: "Euphotic Pelagic Water Column",
      type: "Acoustic Medium",
      description: "Thermocline and sound velocity profile calibration (1520 m/s average seawater acoustic velocity).",
      hazards: "None - Clear water column",
      density: "1.025 g/cm³"
    },
    {
      range: [201, 1400],
      name: "Abyssal Water Column",
      type: "Deep Marine Zone",
      description: "Deepwater pressure realm, bathyal currents, high acoustic clarity for multibeam swath mapping.",
      hazards: "Strong bottom currents (1.2 knots max)",
      density: "1.028 g/cm³"
    },
    {
      range: [1401, 1440],
      name: "Seabed Soft Clays & Recent Silt",
      type: "Holocene Sediment",
      description: "Very soft, high water content silty clay. Ideal for pipeline trenching; low bearing capacity for jacket piles.",
      hazards: "Free gas pockets & shallow slope instability",
      density: "1.45 g/cm³"
    },
    {
      range: [1441, 1500],
      name: "Consolidated Stiff Sandy Silt",
      type: "Pleistocene Stratum",
      description: "Stiff overconsolidated clay and fine sand. Good pile friction layer for tension leg platform suction anchors.",
      hazards: "Local boulder anomalies",
      density: "1.85 g/cm³"
    },
    {
      range: [1501, 2000],
      name: "Basaltic Bedrock Refusal Horizon",
      type: "Volcanic / Crystalline Basement",
      description: "High seismic velocity acoustic refusal bed (> 3500 m/s). Pre-drilling required for deep foundation anchoring.",
      hazards: "Acoustic refusal - Hard substrate",
      density: "2.65 g/cm³"
    }
  ];

  const currentStrata = strataInfo.find(
    (s) => depth >= s.range[0] && depth <= s.range[1]
  ) || strataInfo[2];

  return (
    <Card className="border-slate-200/90 bg-white shadow-md shadow-slate-200/40 text-slate-900">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-xs text-sky-600 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Compass className="h-4 w-4" />
              Interactive Bathymetry &amp; Stratigraphy Scanner
            </div>
            <CardTitle className="text-xl text-slate-900">Subsea Layer Explorer</CardTitle>
          </div>
          <div className="font-mono text-2xl font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3.5 py-1.5 rounded-xl shadow-xs">
            {depth.toLocaleString()}m <span className="text-xs text-slate-500 font-normal">DEPTH</span>
          </div>
        </div>
        <CardDescription className="text-slate-500">
          Drag the depth probe below to inspect acoustic velocity, geological stratigraphy, and subsea hazards.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Interactive Depth Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono font-medium text-slate-500">
            <span>0m (Surface)</span>
            <span>500m</span>
            <span>1,000m</span>
            <span>1,420m (Seabed)</span>
            <span>2,000m (Basement)</span>
          </div>
          <input
            type="range"
            min={0}
            max={2000}
            step={5}
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className="w-full accent-[#00a3e0] h-2.5 rounded-lg bg-slate-200 cursor-pointer"
          />
        </div>

        {/* Dynamic Strata Detail Box */}
        <div className="grid gap-4 md:grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-sky-600" />
              <span className="font-mono text-xs uppercase font-bold text-slate-500">Stratigraphic Horizon</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900">{currentStrata.name}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{currentStrata.description}</p>
          </div>

          <div className="space-y-3 border-t border-slate-200 pt-3 md:border-t-0 md:border-l md:pl-5 md:pt-0">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-mono">Geological Classification</span>
              <span className="font-bold text-slate-900">{currentStrata.type}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-mono">Bulk Density</span>
              <span className="font-bold text-sky-700 font-mono">{currentStrata.density}</span>
            </div>
            <div className="rounded-xl bg-amber-50/80 border border-amber-200 p-3 text-xs flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-amber-800 uppercase font-bold block">Geohazard Assessment</span>
                <span className="text-amber-900 font-medium">{currentStrata.hazards}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
