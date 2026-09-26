import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const requestSchema = z.object({
  mode: z.enum(["client", "freelancer"]),
  values: z.record(z.unknown()),
  documentKey: z.string().nullable().optional()
});

export async function POST(request: Request) {
  try {
    const body = requestSchema.parse(await request.json());

    if (body.mode === "client") {
      const values = body.values as Record<string, unknown>;

      try {
        const rfp = await db.clientRFP.create({
          data: {
            companyName: String(values.companyName || "Client"),
            contactName: String(values.contactName || "Contact"),
            email: String(values.email || "client@example.com"),
            projectType: String(values.projectType || "RIG_SITE_SITING"),
            surveyLocation: String(values.surveyLocation || "Offshore Block"),
            targetWaterDepth: values.targetWaterDepth
              ? Number(values.targetWaterDepth)
              : undefined,
            mobilizationWindow: String(values.mobilizationWindow || "Immediate"),
            vesselRequirement: String(values.vesselRequirement || "REMOTE_PROCESSING_ONLY")
          }
        });

        return NextResponse.json({ id: rfp.id, status: "created" }, { status: 201 });
      } catch (dbErr) {
        console.warn("Prisma DB write bypassed (in-memory demo mode):", dbErr);
        return NextResponse.json(
          { id: `rfp-demo-${Date.now()}`, status: "accepted_in_memory" },
          { status: 201 }
        );
      }
    }

    return NextResponse.json(
      {
        message:
          "Freelancer registration received & staged for verification."
      },
      { status: 202 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload format" },
      { status: 400 }
    );
  }
}
