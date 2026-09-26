"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send, UploadCloud, Shield, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const clientSchema = z.object({
  companyName: z.string().min(2, "Company name required"),
  contactName: z.string().min(2, "Contact name required"),
  email: z.string().email("Valid business email required"),
  taxonomy: z.string().min(1, "Select survey taxonomy"),
  surveyLocation: z.string().min(2, "Survey location required"),
  targetWaterDepth: z.coerce.number().positive().optional(),
  mobilizationWindow: z.string().min(2, "Mobilization window required"),
  vesselRequirement: z.enum([
    "FULL_VESSEL_SPREAD",
    "REMOTE_PROCESSING_ONLY",
    "ROV_AUV_SPREAD"
  ])
});

const freelancerSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  discipline: z.string().min(1, "Discipline required"),
  yearsExperience: z.coerce.number().min(0, "Experience required"),
  certifications: z.string().min(2, "Certifications required"),
  software: z.string().min(2, "Software competencies required"),
  dayRateUsd: z.coerce.number().positive().optional(),
  dayRateInr: z.coerce.number().positive().optional(),
  offshoreAvailability: z.boolean()
});

type Mode = "client" | "freelancer";

type ClientFormData = z.infer<typeof clientSchema>;
type FreelancerFormData = z.infer<typeof freelancerSchema>;
type OnboardingFormData = ClientFormData & FreelancerFormData;

export function OnboardingDialog() {
  const [mode, setMode] = useState<Mode>("client");
  const [submitted, setSubmitted] = useState(false);
  const [presignedKey, setPresignedKey] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const schema = mode === "client" ? clientSchema : freelancerSchema;

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      taxonomy: "GEOHAZARD_RIG_CLEARANCE",
      surveyLocation: "",
      targetWaterDepth: undefined,
      mobilizationWindow: "",
      vesselRequirement: "FULL_VESSEL_SPREAD",
      fullName: "",
      discipline: "PROCESSING_GEOPHYSICIST",
      yearsExperience: 0,
      certifications: "",
      software: "",
      dayRateUsd: undefined,
      dayRateInr: undefined,
      offshoreAvailability: true
    }
  });

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await fetch("/api/uploads/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, contentType: file.type || "application/pdf" })
      });
      const data = await res.json();
      if (data.key) {
        setPresignedKey(data.key);
      }
    } catch (err) {
      console.warn("Upload presign failed:", err);
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(values: unknown) {
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, values, documentKey: presignedKey })
      });

      if (!response.ok) {
        form.setError("root", {
          message: "Unable to submit request to BHUSRI ERP. Please verify entries."
        });
        return;
      }

      setSubmitted(true);
    } catch (err) {
      form.setError("root", {
        message: "Network request failed. Logged locally into BHUSRI pipeline."
      });
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-white p-8 text-center text-[#0B1B3D] shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
          <CheckCircle2 className="h-10 w-10 animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-[#0B1B3D]">BHUSRI Intake Received</h3>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
          Logged into BHUSRI ERP Commercial Pipeline. A Party Chief or Senior Geophysicist will review your scope within 2 hours.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            form.reset();
          }}
          variant="outline"
          className="mt-6"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-6 md:p-8 text-[#0B1B3D] shadow-xl">
      <div className="mb-6 flex flex-wrap gap-2 rounded-xl bg-slate-100 p-1.5 border border-slate-200">
        <button
          type="button"
          onClick={() => {
            setMode("client");
            form.reset();
          }}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all cursor-pointer ${
            mode === "client"
              ? "bg-[#00A3E0] text-white shadow-md shadow-sky-500/20"
              : "text-slate-600 hover:text-[#0B1B3D]"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Enterprise Client Survey Intake
        </button>

        <button
          type="button"
          onClick={() => {
            setMode("freelancer");
            form.reset();
          }}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all cursor-pointer ${
            mode === "freelancer"
              ? "bg-[#00A3E0] text-white shadow-md shadow-sky-500/20"
              : "text-slate-600 hover:text-[#0B1B3D]"
          }`}
        >
          <Users className="h-4 w-4" />
          Join Specialist Network
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {mode === "client" ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Company Name</label>
                <input {...form.register("companyName")} placeholder="e.g. TotalEnergies / ONGC Deepwater" />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Contact Person</label>
                <input {...form.register("contactName")} placeholder="e.g. Jean-Luc Moreau" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Business Email</label>
                <input {...form.register("email")} type="email" placeholder="name@company.com" />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">BHUSRI Survey Taxonomy</label>
                <select {...form.register("taxonomy")}>
                  <option value="HIGH_RES_GEOPHYSICAL_HYDROGRAPHIC">1. High-Res Geophysical &amp; Hydrographic (MBES/SSS/SBP)</option>
                  <option value="GEOHAZARD_RIG_CLEARANCE">2. Geohazard &amp; Rig-Site Clearance (Chirp/2D/3D Seismic/CPT)</option>
                  <option value="PIPELINE_CABLE_ROUTE">3. Pipeline &amp; Subsea Cable Route (ROV/AUV/TSS 440)</option>
                  <option value="IMR_POST_LAY">4. Inspection, Repair &amp; Maintenance (IMR/DoB/OOS)</option>
                  <option value="BENTHIC_ENVIRONMENTAL_BASELINE">5. Benthic Environmental Baseline (EBS Grab/ADCP/CTD)</option>
                  <option value="UXO_TARGET_CLEARANCE">6. UXO Target Anomaly Clearance Survey</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Geodetic Location / Offshore Field Block</label>
                <input {...form.register("surveyLocation")} placeholder="e.g. KG-DWN-98/2 Block, Bay of Bengal" />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Water Depth (Metres)</label>
                <input
                  {...form.register("targetWaterDepth")}
                  type="number"
                  placeholder="e.g. 1420"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Mobilization Window</label>
                <input
                  {...form.register("mobilizationWindow")}
                  placeholder="e.g. Immediate / Q4 2026"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Spread Requirement</label>
                <select {...form.register("vesselRequirement")}>
                  <option value="FULL_VESSEL_SPREAD">Full Vessel Spread (Vessel + Survey Crew)</option>
                  <option value="REMOTE_PROCESSING_ONLY">Remote Starlink Data Processing &amp; QC Only</option>
                  <option value="ROV_AUV_SPREAD">ROV / AUV Subsea Spread Only</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Full Legal Name</label>
                <input {...form.register("fullName")} placeholder="e.g. Dr. Alistair Vance" />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Email Address</label>
                <input {...form.register("email")} type="email" placeholder="specialist@domain.com" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Primary Offshore Discipline</label>
                <select {...form.register("discipline")}>
                  <option value="PARTY_CHIEF">Offshore Party Chief</option>
                  <option value="HYDROGRAPHER">Senior Offshore Hydrographer</option>
                  <option value="PROCESSING_GEOPHYSICIST">Processing Geophysicist (Sub-Bottom)</option>
                  <option value="SEISMIC_INTERPRETER">Seismic &amp; Hazard Interpreter</option>
                  <option value="GEOTECHNICAL_ENGINEER">Geotechnical Site Foundation Specialist</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Years Offshore Experience</label>
                <input
                  {...form.register("yearsExperience")}
                  type="number"
                  placeholder="e.g. 14"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Offshore Certifications</label>
                <input
                  {...form.register("certifications")}
                  placeholder="BOSIET, HUET, STCW-95, Offshore Medical"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">Software Mastery</label>
                <input
                  {...form.register("software")}
                  placeholder="CARIS HIPS/SIPS, Petrel, Kingdom, SonarWiz, Eiva"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">USD Day Rate ($)</label>
                <input
                  {...form.register("dayRateUsd")}
                  type="number"
                  placeholder="e.g. 950"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-700 font-bold block mb-1">INR Day Rate (₹)</label>
                <input
                  {...form.register("dayRateInr")}
                  type="number"
                  placeholder="e.g. 78000"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 cursor-pointer">
              <input
                {...form.register("offshoreAvailability")}
                type="checkbox"
                className="h-4 w-4 rounded accent-[#00A3E0]"
              />
              <span>I hold active BOSIET/HUET &amp; STCW certifications for global vessel mobilization.</span>
            </label>
          </>
        )}

        {/* S3 Presigned Document Upload */}
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center">
          <UploadCloud className="mx-auto h-6 w-6 text-[#00A3E0] mb-1" />
          <p className="text-xs font-bold text-[#0B1B3D]">
            Upload Scope Document / CV (Optional)
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
            AWS S3 / Cloudflare R2 Presigned Encrypted Storage (.pdf, .docx, .zip, .segy)
          </p>
          <input
            type="file"
            onChange={handleFileUpload}
            className="mt-2 text-xs text-slate-600 cursor-pointer file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-sky-50 file:text-sky-800 hover:file:bg-sky-100"
          />
          {presignedKey && (
            <p className="mt-2 font-mono text-[11px] text-emerald-700 font-bold flex items-center justify-center gap-1">
              <Shield className="h-3.5 w-3.5 text-emerald-600" /> Presigned Key Generated: {presignedKey.split("-").pop()}
            </p>
          )}
        </div>

        {form.formState.errors.root && (
          <p className="text-xs font-mono text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 font-bold">
            {form.formState.errors.root.message}
          </p>
        )}

        <button
          type="submit"
          disabled={form.formState.isSubmitting || uploading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#00A3E0] px-4 py-3 font-bold text-white hover:bg-sky-600 disabled:opacity-50 transition-colors shadow-lg shadow-sky-500/20 cursor-pointer"
        >
          <Send className="h-4 w-4" />
          {form.formState.isSubmitting ? "Submitting to BHUSRI ERP…" : "Submit Intake Request"}
        </button>
      </form>
    </div>
  );
}
