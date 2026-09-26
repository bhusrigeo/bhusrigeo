import { SubseaDepthScanner } from "@/components/marine-visuals/SubseaDepthScanner";
import { OnboardingDialog } from "@/components/onboarding/OnboardingDialog";
import { IMAGES } from "@/lib/images";
import { Anchor, ShieldCheck, Cpu, Waves, ArrowRight, Crosshair, Navigation, ChevronRight } from "lucide-react";

export default function HomePage() {
  const manpowerServices = [
    {
      title: "Hydrographic & Geophysical Surveys",
      desc: "Deploying certified Senior Hydrographic Surveyors, Party Chiefs, Data Processors, and Geophysicists for MBES, SSS, and sub-bottom profiling campaigns.",
      image: IMAGES.seismicStreamer,
      tag: "HYDROGRAPHIC SURVEYS"
    },
    {
      title: "Geotechnical & CPT Operations",
      desc: "Geotechnical investigation leads and CPT rig operators for seabed sediment sampling, borehole logging, and soil mechanics data acquisition.",
      image: IMAGES.offshoreRig,
      tag: "GEOTECHNICAL INVESTIGATION"
    },
    {
      title: "Client Representation & QA/QC",
      desc: "Independent Client Representatives and HSE Advisors safeguarding operator interests and data integrity on offshore survey campaigns.",
      image: IMAGES.seismicBow,
      tag: "CLIENT REPRESENTATION"
    },
    {
      title: "Subsea Cable & Route Engineering",
      desc: "Expert survey leads and trenchability specialists for interconnector route alignment, TSS 440/350 tracking, and depth-of-burial audits.",
      image: IMAGES.subseaCable,
      tag: "ROUTE ENGINEERING"
    }
  ];

  const taxonomies = [
    {
      num: "01",
      title: "Hydrographic Survey & Bathymetry",
      desc: "IHO S-44 Special Order 1a Digital Terrain Models (DTMs) using MBES, SSS, and magnetometer acquisition spreads.",
      icon: Anchor,
      image: IMAGES.seismicStreamer,
      badge: "IHO S-44 SPECIAL ORDER"
    },
    {
      num: "02",
      title: "Geohazard & Rig-Site Clearance",
      desc: "Shallow seismic (Chirp/Sparker), shallow gas (DHI) detection, and jack-up spudcan punch-through risk assessment.",
      icon: ShieldCheck,
      image: IMAGES.offshoreRig,
      badge: "GEOHAZARD CLEARANCE"
    },
    {
      num: "03",
      title: "Subsea Cable & Pipeline Route Surveys",
      desc: "ROV survey spreads equipped with TSS 440/350 cable tracking, subsea laser scanners, and continuous trenchability profiles.",
      icon: Navigation,
      image: IMAGES.subseaCable,
      badge: "ROUTE ALIGNMENT"
    },
    {
      num: "04",
      title: "Remote Data QC & Starlink Telemetry",
      desc: "Near-real-time vessel-to-shore acoustic ping streaming, cloud denoising, and zero re-shoot quality control.",
      icon: Cpu,
      image: IMAGES.starlinkSat,
      badge: "STARLINK QC STREAM"
    },
    {
      num: "05",
      title: "Environmental Baseline & Benthic Studies",
      desc: "Drop camera sleds, Van Veen grab sampling, ADCP water column current profiling, and sediment particle size analysis.",
      icon: Waves,
      image: IMAGES.benthicSampling,
      badge: "ENVIRONMENTAL EBS"
    },
    {
      num: "06",
      title: "UXO Anomaly Identification & Clearance",
      desc: "Transverse gradiometer magnetometer arrays, high-frequency SSS, and 3D sub-bottom target anomaly classification.",
      icon: Crosshair,
      image: IMAGES.uxoClearance,
      badge: "UXO CLEARANCE"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-[#07142F]">
      {/* Aerial Seismic Survey Vessel Background Hero Section */}
      <section className="relative overflow-hidden bg-[#07142F] text-white min-h-[85vh] flex flex-col justify-between">
        {/* Real Aerial Seismic Survey Vessel Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.heroBg}
            alt="BHUSRI Offshore Survey Operations"
            className="h-full w-full object-cover object-center filter brightness-90 contrast-105"
          />
          {/* Subtle Gradient Overlay for Clean Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07142F]/95 via-[#07142F]/80 to-[#07142F]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07142F] via-transparent to-[#07142F]/60" />
        </div>

        {/* Main Hero Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-16 my-auto w-full">
          <div className="max-w-3xl">
            {/* White Corporate Badge */}
            <div className="mb-6 inline-flex items-center gap-2 border border-white/30 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-white">
                BHUSRI GEOSCIENCES &amp; ENGINEERING SOLUTIONS
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-white font-sans">
              Delivering world-class marine &amp; <br />
              subsea workforce solutions.
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-200 font-sans font-normal max-w-2xl">
              Deploying certified Party Chiefs, Hydrographers, Processing Geophysicists, and ROV leads alongside near-real-time Starlink satellite QC telemetry for global marine energy campaigns.
            </p>

            {/* Pure White CTAs */}
            <div className="mt-10 flex flex-wrap gap-5">
              <a href="#request">
                <button className="bg-white text-[#07142F] hover:bg-slate-200 font-extrabold text-sm uppercase tracking-wider px-8 py-4 shadow-xl flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                  <span>Request Project Proposal</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Technical Corporate Metrics Bar */}
        <div className="relative z-10 border-t border-white/15 bg-[#07142F]/90 backdrop-blur-md py-6 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-2 border-white pl-4">
              <span className="block font-sans text-2xl lg:text-3xl font-black text-white">IHO S-44</span>
              <span className="font-sans text-xs uppercase tracking-wider text-slate-300">Special Order 1a Accuracy</span>
            </div>
            <div className="border-l-2 border-white pl-4">
              <span className="block font-sans text-2xl lg:text-3xl font-black text-white">1,420 m</span>
              <span className="font-sans text-xs uppercase tracking-wider text-slate-300">Max Sounding Depth</span>
            </div>
            <div className="border-l-2 border-white pl-4">
              <span className="block font-sans text-2xl lg:text-3xl font-black text-white">&lt; 4 Hours</span>
              <span className="font-sans text-xs uppercase tracking-wider text-slate-300">Starlink Remote QC</span>
            </div>
            <div className="border-l-2 border-white pl-4">
              <span className="block font-sans text-2xl lg:text-3xl font-black text-white">100%</span>
              <span className="font-sans text-xs uppercase tracking-wider text-slate-300">IMCA &amp; ISO Compliance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities & Solutions */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[#07142F] font-extrabold block mb-2 bg-slate-200/80 px-3 py-1 rounded-full w-max">
            Core Technical Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07142F] tracking-tight">
            Offshore Geophysics &amp; Project Execution
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl text-base">
            Providing expert hydrographic personnel, geohazard evaluation, subsea route engineering, and turnkey survey management.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {manpowerServices.map((service, idx) => (
            <div
              key={idx}
              className="group relative h-96 overflow-hidden bg-[#07142F] shadow-lg transition-all duration-500 hover:shadow-2xl flex flex-col justify-end p-8 rounded-2xl border border-slate-800"
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07142F] via-[#07142F]/60 to-transparent" />

              <div className="relative z-10">
                <span className="inline-block bg-white text-[#07142F] font-sans text-[10px] font-black px-3 py-1 uppercase tracking-wider mb-3 rounded-full">
                  {service.tag}
                </span>
                <h3 className="text-2xl font-black text-white transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6-Taxonomy Technical Capabilities (Redesigned & Attractive) */}
      <section className="bg-slate-100/90 py-24 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-[#07142F] bg-white border border-slate-300 px-3.5 py-1.5 font-extrabold rounded-full inline-block mb-3 shadow-xs">
              SPECIALIZED SUBSEA CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07142F] tracking-tight">
              Technical Project Taxonomies &amp; Specialist Crewing
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Deploying certified hydrographic teams, geohazard experts, and remote QC data pipelines for global energy operators.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {taxonomies.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.num}
                  className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md transition-all duration-300 hover:shadow-2xl hover:border-[#07142F] flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07142F] via-[#07142F]/30 to-transparent" />
                      <span className="absolute top-4 left-4 bg-[#FACC15] px-3 py-1 font-sans text-[10px] font-black text-[#07142F] rounded-full shadow-md">
                        {item.badge}
                      </span>
                      <span className="absolute top-4 right-4 font-mono text-xs font-black text-white bg-[#07142F]/90 px-3 py-1 rounded-full backdrop-blur-xs border border-white/20">
                        {item.num}
                      </span>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#07142F] text-white shrink-0 shadow-md">
                          <Icon className="h-5 w-5 text-[#FACC15]" />
                        </div>
                        <h3 className="font-extrabold text-lg text-[#07142F] leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-xs leading-relaxed text-slate-600 font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href="#request"
                      className="inline-flex items-center gap-2 font-mono text-xs font-extrabold text-[#07142F] uppercase tracking-wider hover:underline"
                    >
                      <span>Request Scope Proposal</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#07142F]" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subsea Layer Explorer Component */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16 bg-slate-100 border-t border-b border-slate-200">
        <SubseaDepthScanner />
      </section>

      {/* Enterprise Proposal Intake Form */}
      <section id="request" className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#07142F] font-extrabold block mb-2">
            Enterprise Proposal Intake
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07142F] tracking-tight">
            Request Project Proposal or Survey Quotation
          </h2>
          <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto">
            Submit your survey project scope for immediate commercial review by our engineering team.
          </p>
        </div>

        <OnboardingDialog />
      </section>
    </main>
  );
}
