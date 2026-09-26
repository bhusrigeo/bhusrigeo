"use client";

import { useEffect, useState } from "react";
import type { TelemetryLog } from "@/types/domain";
import { MOCK_TELEMETRY } from "@/lib/mockData";
import { Radio, AlertTriangle, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TelemetryFeed({ projectId }: { projectId?: string }) {
  const [logs, setLogs] = useState<TelemetryLog[]>(MOCK_TELEMETRY);
  const [isLive, setIsLive] = useState(true);

  // Filter logs if a specific projectId is passed
  const displayLogs = projectId
    ? logs.filter((l) => l.projectId === projectId)
    : logs;

  // Simulate incoming live telemetry stream
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newLog: TelemetryLog = {
        id: `telem-live-${Date.now()}`,
        projectId: projectId || "proj-001",
        timestamp: new Date().toISOString(),
        source: Math.random() > 0.5 ? "VESSEL" : "REMOTE_QC",
        severity: Math.random() > 0.85 ? "WARNING" : "INFO",
        message: Math.random() > 0.5
          ? `Sound velocity calibration profile ping verified. Acoustic ping # ${Math.floor(Math.random() * 9000 + 1000)}.`
          : `Multibeam swath-width: 140° covered. Real-time despiking clean.`,
        acquisitionLine: `L-${Math.floor(Math.random() * 20 + 100)}-NORTH`,
        dataQualityScore: Number((95 + Math.random() * 4.9).toFixed(1)),
        waterDepthMeters: Number((1420 + Math.random() * 5).toFixed(1))
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 15)]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isLive, projectId]);

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-md text-slate-900">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-sky-600 shadow-xs">
            <Radio className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-sky-600 font-bold">
              Vessel Telemetry &amp; Remote QC Log
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              Live acoustic ping log, heave sensor data, and geohazard alerts.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsLive(!isLive)}
          className={`flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-[11px] font-bold transition-all cursor-pointer shadow-xs ${isLive
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-300 bg-slate-100 text-slate-600"
            }`}
        >
          <span className={`h-2 w-2 rounded-full ${isLive ? "bg-emerald-500 animate-ping" : "bg-slate-400"}`} />
          {isLive ? "STREAMING LIVE" : "PAUSED"}
        </button>
      </div>

      {/* Log Feed List */}
      <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
        {displayLogs.map((log) => (
          <div
            key={log.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3 text-xs font-mono transition-all hover:border-sky-300 hover:bg-slate-50 shadow-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-normal">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-sky-700 font-bold">[{log.source}]</span>
                {log.severity === "CRITICAL" && (
                  <Badge variant="critical" className="gap-1">
                    <ShieldAlert className="h-3 w-3" /> CRITICAL
                  </Badge>
                )}
                {log.severity === "WARNING" && (
                  <Badge variant="warning" className="gap-1">
                    <AlertTriangle className="h-3 w-3" /> WARNING
                  </Badge>
                )}
                {log.severity === "INFO" && (
                  <Badge variant="cyan">INFO</Badge>
                )}
              </div>
              <p className="text-slate-800 font-sans font-medium">{log.message}</p>
            </div>

            <div className="flex items-center gap-3 text-slate-500 shrink-0 border-t sm:border-t-0 border-slate-200 pt-2 sm:pt-0">
              {log.acquisitionLine && (
                <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] text-slate-700 font-semibold shadow-xs">
                  {log.acquisitionLine}
                </span>
              )}
              {log.dataQualityScore && (
                <span className="text-emerald-700 font-bold">
                  QC: {log.dataQualityScore}%
                </span>
              )}
              {log.waterDepthMeters && (
                <span className="text-sky-700 font-bold">
                  {log.waterDepthMeters}m
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
