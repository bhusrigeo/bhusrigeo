"use client";

import { useState, useEffect } from "react";
import { OnboardingDialog } from "@/components/onboarding/OnboardingDialog";
import { MOCK_OPERATIONAL_HUBS } from "@/lib/mockData";
import { OperationalHub } from "@/types/domain";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default function ContactPage() {
  const [bases, setBases] = useState<OperationalHub[]>(MOCK_OPERATIONAL_HUBS);

  useEffect(() => {
    const cachedHubs = localStorage.getItem("bhusri_operational_hubs");
    if (cachedHubs) {
      try {
        setBases(JSON.parse(cachedHubs));
      } catch (err) {
        console.error("Failed to parse cached operational hubs", err);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-[#0B1B3D] py-12 px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="border-b border-slate-200 pb-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00A3E0] font-extrabold mb-2">
            <Globe className="h-4 w-4 text-[#F59E0B]" />
            Global BHUSRI Operating Domains: bhusrigeo.com | bhusrimarine.com
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0B1B3D]">
            Offshore Logistics &amp; Remote QC Processing Hubs
          </h1>
          <p className="mt-3 text-sm text-slate-600 max-w-2xl font-sans">
            24/7 technical dispatch, hydrographic survey vessel mobilization, Starlink satellite telemetry feeds, and onshore processing centers.
          </p>
        </div>

        {/* Operational Bases Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {bases.map((base, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/50 flex flex-col justify-between hover:border-[#F59E0B] transition-all"
            >
              <div>
                <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                  <img
                    src={base.image || "/logo-mark.png"}
                    alt={base.city}
                    className="h-full w-full object-cover object-center opacity-90 transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/30 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-[#F59E0B] px-3 py-1 font-mono text-[10px] font-extrabold text-[#0B1B3D]">
                    {base.domain}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-[#00A3E0] shrink-0">
                      <MapPin className="h-5 w-5 text-[#00A3E0]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B1B3D] text-base">{base.city}</h3>
                      <span className="font-mono text-[11px] text-[#00A3E0] font-extrabold">{base.country}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-sans">{base.address}</p>

                  <div className="border-t border-slate-100 pt-3 space-y-1 font-mono text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span>{base.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#00A3E0] font-bold">
                      <Mail className="h-3.5 w-3.5 text-[#00A3E0]" />
                      <span>{base.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="rounded-xl bg-slate-50 p-3 text-[11px] font-mono text-slate-700 border border-slate-200 font-semibold">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">Sector Focus:</span>
                  {base.focus}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Onboarding Dialog Container */}
        <div id="request" className="pt-6">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-[#0B1B3D]">Submit an BHUSRI Survey Request</h2>
            <p className="text-xs text-slate-600 mt-1 font-sans">Our commercial engineering team will respond within 2 hours.</p>
          </div>
          <div className="mx-auto max-w-3xl">
            <OnboardingDialog />
          </div>
        </div>
      </div>
    </main>
  );
}
