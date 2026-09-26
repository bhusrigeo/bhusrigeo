import { NextResponse } from "next/server";
import { MOCK_TELEMETRY } from "@/lib/mockData";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;

  const projectLogs = MOCK_TELEMETRY.filter((l) => l.projectId === projectId);

  return NextResponse.json({
    projectId,
    logs: projectLogs.length > 0 ? projectLogs : MOCK_TELEMETRY,
    timestamp: new Date().toISOString()
  });
}
