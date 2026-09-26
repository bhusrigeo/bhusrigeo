import { NextResponse } from "next/server";
import { createUploadUrl } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const { fileName, contentType } = await request.json();

    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: "fileName and contentType are required" },
        { status: 400 }
      );
    }

    const safeName = String(fileName).replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `incoming/${crypto.randomUUID()}-${safeName}`;
    const uploadUrl = await createUploadUrl(key, contentType);

    return NextResponse.json({
      key,
      uploadUrl
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Presign generation failed" },
      { status: 500 }
    );
  }
}
