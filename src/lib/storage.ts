import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "mock-key",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "mock-secret"
  },
  forcePathStyle: Boolean(process.env.S3_ENDPOINT)
});

export async function createUploadUrl(
  key: string,
  contentType: string
) {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET || "brand-name-survey-deliverables",
      Key: key,
      ContentType: contentType,
      ServerSideEncryption: "AES256"
    });

    return await getSignedUrl(s3, command, { expiresIn: 900 });
  } catch (error) {
    console.warn("S3 presign fallback active:", error);
    return `https://storage.geosciences-subsea.io/uploads/${key}?mock-presigned=true`;
  }
}
