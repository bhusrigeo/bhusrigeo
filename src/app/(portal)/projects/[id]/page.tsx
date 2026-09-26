import { notFound } from "next/navigation";
import { MOCK_PROJECTS } from "@/lib/mockData";
import { TelemetryFeed } from "@/components/dashboard/TelemetryFeed";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Navigation,
  Compass,
  FileCheck,
  ArrowLeft,
  ExternalLink,
  Waves,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = MOCK_PROJECTS.find((p) => p.id === id) || MOCK_PROJECTS[0];

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="space-y-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-sky-600 hover:text-sky-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Kanban Board
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-sky-700">
                {project.projectNumber}
              </span>
              <Badge variant="cyan">{project.stage}</Badge>
              <Badge variant={project.currency === "USD" ? "default" : "warning"}>
                {project.currency}
              </Badge>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900">{project.name}</h1>

            <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-slate-600 pt-1 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>{project.surveyLocation}</span>
              </div>
              {project.vesselName && (
                <div className="flex items-center gap-1.5 text-sky-700 font-bold">
                  <Navigation className="h-4 w-4 text-sky-600" />
                  <span>Vessel: {project.vesselName}</span>
                </div>
              )}
              {project.waterDepthMeters && (
                <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                  <Waves className="h-4 w-4" />
                  <span>Water Depth: {project.waterDepthMeters}m</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href={project.remoteProcessingUrl || "#"} target="_blank" rel="noreferrer">
              <Button size="sm" className="gap-2 bg-[#00a3e0] text-white hover:bg-sky-600 shadow-md shadow-sky-500/15">
                <ExternalLink className="h-4 w-4" />
                Launch Remote QC Stream
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Geodetic & Technical Details Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="p-5 border-b border-slate-100">
            <CardTitle className="text-sm font-mono text-sky-700 font-bold uppercase flex items-center gap-2">
              <Compass className="h-4 w-4 text-sky-600" /> Geodetic Coordinates
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-4 text-xs font-mono space-y-2.5 text-slate-700">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Latitude</span>
              <span className="text-slate-900 font-bold">{project.latitude || 16.421}° N</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Longitude</span>
              <span className="text-slate-900 font-bold">{project.longitude || 82.355}° E</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">UTM Zone</span>
              <span className="text-sky-700 font-bold">{project.utmZone || "44N"}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-slate-500">Datum</span>
              <span className="text-sky-700 font-bold">{project.geodeticDatum || "WGS84"}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="p-5 border-b border-slate-100">
            <CardTitle className="text-sm font-mono text-amber-700 font-bold uppercase flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-600" /> Acquisition Window
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-4 text-xs font-mono space-y-2.5 text-slate-700">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Mob Window</span>
              <span className="text-slate-900 font-bold">{project.mobilizationWindow || "Q3 2026"}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Overall Progress</span>
              <span className="text-sky-700 font-bold">{project.progressPercent}%</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-slate-500">Client Account</span>
              <span className="text-slate-900 font-semibold">{project.clientName || "Enterprise Client"}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="p-5 border-b border-slate-100">
            <CardTitle className="text-sm font-mono text-emerald-700 font-bold uppercase flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-emerald-600" /> Deliverables Indexed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-4 text-xs space-y-2.5 text-slate-700 font-sans">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="font-mono text-slate-600 font-medium">MBES DTM Surface (.asc)</span>
              <span className="font-mono text-emerald-700 font-bold text-[11px] flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="h-3 w-3" /> READY
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="font-mono text-slate-600 font-medium">Sub-Bottom SEG-Y Files</span>
              <span className="font-mono text-amber-700 font-bold text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">PROCESSING</span>
            </div>
            <div className="flex justify-between items-center pt-0.5">
              <span className="font-mono text-slate-600 font-medium">Geohazard CAD Alignment</span>
              <span className="font-mono text-emerald-700 font-bold text-[11px] flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="h-3 w-3" /> READY
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Telemetry Feed for this project */}
      <TelemetryFeed projectId={project.id} />
    </div>
  );
}
