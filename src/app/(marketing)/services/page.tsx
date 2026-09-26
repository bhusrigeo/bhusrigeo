import { Compass, ArrowRight, Anchor, ShieldCheck, Navigation, Cpu, Waves, Crosshair } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";

export default function ServicesPage() {
  const taxonomyList = [
    {
      num: "01",
      title: "High-Resolution Geophysical & Hydrographic Surveys",
      badge: "IHO S-44 ORDER 1A",
      description: "Full vessel spread operations equipped with dual-head Kongsberg EM2040 MBES, EdgeTech 4200 multi-frequency SSS, Chirp Sub-Bottom Profilers, and towed gradiometer magnetometers.",
      specs: [
        "Multibeam Bathymetry (Kongsberg EM2040 Dual Head)",
        "Side Scan Sonar (EdgeTech 4200 Multi-Frequency)",
        "Sub-Bottom Profiler (Chirp 2-16kHz Transducer)",
        "Seafloor Backscatter Mosaics & Obstacle Registers"
      ],
      icon: Anchor,
      image: IMAGES.surveyShip
    },
    {
      num: "02",
      title: "Geohazard & Jack-Up Rig-Site Clearance Surveys",
      badge: "SPUDCAN PUNCH-THROUGH RISK",
      description: "Comprehensive 2D/3D shallow seismic (Chirp/Sparker/Airgun) and Cone Penetration Testing (CPT) to map shallow gas DHI anomalies, faulting scarps, and seabed slope stability.",
      specs: [
        "Shallow Gas Anomaly (DHI) Detection & Mapping",
        "Jack-Up Rig Spudcan Penetration Risk Analysis",
        "Subsea Fault Delineation & Soil Friction Horizons",
        "Core Barrel Sampling & Borehole Node Positioning"
      ],
      icon: ShieldCheck,
      image: IMAGES.offshoreRig
    },
    {
      num: "03",
      title: "Pipeline & Subsea Power Cable Route Surveys",
      badge: "ALIGNMENT SHEETS & DTMs",
      description: "ROV & AUV subsea survey spreads equipped with TSS 440/350 cable & pipe tracking systems, high-density point cloud DTMs, and continuous trenchability profiles.",
      specs: [
        "TSS 440/350 Cable & Pipe Tracking Spreads",
        "AutoCAD 3D Alignment Sheets & Route Profiles",
        "Trenchability Index & Micro-Routing Optimization",
        "Free-Span Hazard Audits & Crossing Clearance"
      ],
      icon: Navigation,
      image: IMAGES.subseaCable
    },
    {
      num: "04",
      title: "Inspection, Repair & Maintenance (IMR) / Post-Lay Surveys",
      badge: "CONTINUOUS DoB & OOS LOGS",
      description: "Post-lay survey-class ROVs equipped with subsea laser profilers, dual-head MBES, and continuous Depth of Burial (DoB) logs to detect Out-of-Straightness (OOS) buckling.",
      specs: [
        "Depth of Burial (DoB) Continuous Cable Logs",
        "Out-of-Straightness (OOS) Buckling & Scour Surveys",
        "Subsea Structural Inspection & Anomaly Verification",
        "Jacket Footprint & Spudcan Re-entry Audits"
      ],
      icon: Cpu,
      image: IMAGES.starlinkSat
    },
    {
      num: "05",
      title: "Benthic Environmental Baseline Surveys (EBS)",
      badge: "PSA & CTD BASELINE",
      description: "Drop camera sleds, Van Veen grab corers, ADCP current profilers, and CTD probes delivering benthic habitat sensitivity maps and sediment particle size analysis (PSA).",
      specs: [
        "Sediment Particle Size Analysis (PSA) & Heavy Metals",
        "ADCP Water Column Current Profiling & CTD Probes",
        "Drop Camera Benthic Video Mapping & Habitats",
        "Physicochemical Baseline Compliance Reports"
      ],
      icon: Waves,
      image: IMAGES.benthicSampling
    },
    {
      num: "06",
      title: "UXO Target Anomaly Clearance Surveys",
      badge: "TRANSTAG MAGNETOMETER ARRAYS",
      description: "Transverse gradiometer magnetometer arrays, high-frequency SSS, and 3D sub-bottom imagers creating target anomaly registers and estimated burial depth modeling.",
      specs: [
        "Transverse Gradiometer Magnetometer Arrays",
        "3D Sub-Bottom High-Resolution Target Imaging",
        "UXO Anomaly Target Classification Registers",
        "Route Clearance Sign-offs & Certification"
      ],
      icon: Crosshair,
      image: IMAGES.uxoClearance
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-[#0B1B3D] py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00A3E0] font-extrabold mb-2">
            <Compass className="h-4 w-4" />
            BHUSRI Survey Taxonomy &amp; Technical Capabilities
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl text-[#0B1B3D]">
            Comprehensive Subsea Geophysics &amp; Foundation Engineering
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600 text-base leading-relaxed font-sans">
            Delivering offshore hydrographic acquisition, vessel-to-shore remote QC, geohazard clearance, and geotechnical site assessment for deepwater oil &amp; gas, offshore wind, and subsea interconnector cables.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {taxonomyList.map((service, i) => {
            const Icon = service.icon;
            return (
              <article
                key={i}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/50 flex flex-col justify-between hover:border-[#F59E0B] transition-all"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover object-center opacity-90 transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/20 to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-[#F59E0B] px-3 py-1 font-mono text-[10px] font-extrabold text-[#0B1B3D]">
                      {service.badge}
                    </span>
                    <span className="absolute top-3 right-3 font-mono text-xs font-extrabold text-white bg-[#0B1B3D]/70 px-2 py-0.5 rounded">
                      TAXONOMY {service.num}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-[#00A3E0] shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0B1B3D] leading-tight">{service.title}</h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{service.description}</p>

                    <div className="border-t border-slate-100 pt-4 space-y-2">
                      <span className="font-mono text-[11px] text-[#00A3E0] uppercase font-extrabold block mb-2">
                        Key Technical Specifications
                      </span>
                      {service.specs.map((spec, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-slate-700 font-sans font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href="/#request"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#07142F] px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    <span>Request Technical RFP Proposal</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#00A3E0]" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
