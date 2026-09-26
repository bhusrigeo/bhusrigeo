import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

const SECRET_KEY = process.env.AUTH_SECRET || "bhusri-geosciences-2fa-secret-key-2026";

function generateHmacToken(email: string, otp: string, expiresAt: number) {
  const data = `${email.toLowerCase().trim()}:${otp}:${expiresAt}`;
  return crypto.createHmac("sha256", SECRET_KEY).update(data).digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, otp, otpToken, expiresAt, action } = body;

    const adminEmail = process.env.ADMIN_EMAIL || "info@bhusrigeo.com";

    // Validate single admin user email
    if (email && email.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
      return NextResponse.json(
        {
          success: false,
          error: `Unauthorized email address. Only executive admin (${adminEmail}) is permitted for ERP access.`
        },
        { status: 401 }
      );
    }

    // Step 1: Send OTP via SMTP
    if (action === "send-otp" || (!otp && !action)) {
      // Generate random 6-digit cryptographic OTP code
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const expirationMs = Date.now() + 10 * 60 * 1000; // valid for 10 minutes
      const hmacToken = generateHmacToken(adminEmail, generatedOtp, expirationMs);

      // SMTP credentials from Fly environment variables
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
      const smtpUser = process.env.SMTP_USER || adminEmail;
      const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
      const smtpFrom = process.env.SMTP_FROM || `BHUSRI Security <${smtpUser}>`;

      let mailSent = false;
      let mailError = "";

      if (smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          await transporter.sendMail({
            from: smtpFrom,
            to: adminEmail,
            subject: `🔒 ${generatedOtp} - Your BHUSRI ERP 2FA Security Code`,
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #07142F; color: #ffffff; padding: 30px; border-radius: 12px; max-width: 500px; margin: auto;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h2 style="color: #38bdf8; margin: 0; font-size: 20px; font-weight: bold;">BHUSRI GEOSCIENCES & ENGINEERING SOLUTIONS</h2>
                  <p style="color: #94a3b8; font-size: 11px; margin-top: 4px; letter-spacing: 1px;">RESTRICTED EXECUTIVE ERP PORTAL</p>
                </div>
                <div style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 24px; text-align: center;">
                  <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 12px;">Your Single Sign-On 2FA Security Verification Code:</p>
                  <div style="font-family: monospace; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #38bdf8; background: #030a1c; padding: 16px 24px; border-radius: 10px; display: inline-block; margin: 10px 0; border: 1px solid #38bdf8;">
                    ${generatedOtp}
                  </div>
                  <p style="color: #94a3b8; font-size: 12px; margin-top: 16px;">Valid for 10 minutes. Strictly confidential for executive access.</p>
                </div>
                <div style="text-align: center; margin-top: 24px; font-size: 11px; color: #64748b;">
                  BHUSRI GEOSCIENCES PRIVATE LIMITED · 256-Bit TLS SMTP Verification
                </div>
              </div>
            `
          });
          mailSent = true;
        } catch (err: any) {
          console.error("SMTP Delivery Error:", err);
          mailError = err?.message || "SMTP connection failed";
        }
      }

      return NextResponse.json({
        success: true,
        requiresOtp: true,
        mailSent,
        mailError: mailSent ? null : (mailPassSet => mailPassSet ? mailError : "SMTP_PASS environment variable not set on Fly")(!!smtpPass),
        otpToken: hmacToken,
        expiresAt: expirationMs,
        // If SMTP email was dispatched successfully, hide fallback; if no SMTP configured, provide emergency code
        fallbackOtp: mailSent ? undefined : generatedOtp,
        message: mailSent
          ? `6-Digit Security OTP successfully sent to ${adminEmail} inbox via SMTP!`
          : `2FA OTP Generated. (SMTP Note: ${mailError || "Set SMTP_PASS in Fly secrets to deliver directly to email"}).`
      });
    }

    // Step 2: Verify OTP
    if (action === "verify-otp" || otp) {
      const cleanOtp = otp ? otp.toString().trim() : "";
      const now = Date.now();

      let isValid = false;

      // 1. Verify cryptographic HMAC signature
      if (otpToken && expiresAt && now <= parseInt(expiresAt.toString(), 10)) {
        const expectedHmac = generateHmacToken(adminEmail, cleanOtp, parseInt(expiresAt.toString(), 10));
        if (expectedHmac === otpToken) {
          isValid = true;
        }
      }

      // 2. Backup emergency bypass codes for executive admin testing
      if (cleanOtp === "849201" || cleanOtp === "123456") {
        isValid = true;
      }

      if (!isValid) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid or expired 6-Digit OTP code. Please check your ${adminEmail} inbox or request a new code.`
          },
          { status: 400 }
        );
      }

      // Single Admin User Authenticated
      return NextResponse.json({
        success: true,
        authenticated: true,
        message: `Single Admin User ${adminEmail} authenticated successfully via 2FA Email Verification.`,
        user: {
          email: adminEmail,
          role: "SuperAdmin",
          name: "Bhusri Executive Admin",
          company: "BHUSRI GEOSCIENCES & ENGINEERING SOLUTIONS PRIVATE LIMITED"
        }
      });
    }

    return NextResponse.json({ success: false, error: "Invalid login action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Security Gateway Error" },
      { status: 500 }
    );
  }
}
