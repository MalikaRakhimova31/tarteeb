import { NextResponse } from "next/server";

// If you prefer Nodemailer/SMTP, you can swap the implementation here.
// This implementation uses Resend's HTTP API to avoid extra dependencies.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body?.name ?? "").toString().trim();
    const phone = (body?.phone ?? "").toString().trim();
    const notes = (body?.notes ?? "").toString().trim();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required." },
        { status: 400 }
      );
    }

    // Simple phone sanity check (non-strict). Adjust as needed.
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 7) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL; // recipient
    const CONTACT_FROM_EMAIL =
      process.env.CONTACT_FROM_EMAIL || "no-reply@tarteeb.uz"; // verified sender

    const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL; // optional; Apps Script or Sheet.best URL

    // Build a common payload for forwarding
    const submission = {
      name,
      phone,
      notes,
      submittedAt: new Date().toISOString(),
      source: "tarteeb-website",
    } as const;

    // Option 1: Forward to Google Sheets webhook if configured
    let sheetsOk: boolean | null = null;
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      const sheetsRes = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
        cache: "no-store",
      });
      sheetsOk = sheetsRes.ok;
      if (!sheetsOk) {
        // Try to read some details, but do not fail the whole request solely on Sheets failure
        await safeReadText(sheetsRes);
      }
    }

    // Option 2: Send email via Resend if configured
    let emailOk: boolean | null = null;
    if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
      const subject = `New Lead from Website: ${name}`;
      const html = `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif; line-height:1.6;">
          <h2 style="margin:0 0 12px;">New Website Lead</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          ${
            notes
              ? `<p><strong>Notes:</strong><br/>${escapeHtml(notes).replace(
                  /\n/g,
                  "<br/>"
                )}</p>`
              : ""
          }
          <hr/>
          <p style="font-size:12px;color:#6b7280;">Submitted at ${new Date().toISOString()}</p>
        </div>
      `;

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL,
          to: [CONTACT_TO_EMAIL],
          subject,
          html,
        }),
        cache: "no-store",
      });

      emailOk = resendResponse.ok;
      if (!resendResponse.ok) {
        await safeReadText(resendResponse);
      }
    }

    // If neither integration is configured, return a helpful error
    if (!GOOGLE_SHEETS_WEBHOOK_URL && !(RESEND_API_KEY && CONTACT_TO_EMAIL)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No delivery method configured. Set GOOGLE_SHEETS_WEBHOOK_URL or RESEND_*.",
        },
        { status: 500 }
      );
    }

    // Consider success if any configured channel succeeds
    const anySuccess = [sheetsOk, emailOk].some((v) => v === true);

    if (anySuccess) {
      return NextResponse.json(
        { success: true, message: "Submitted" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to deliver submission." },
      { status: 502 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unexpected server error." },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function safeReadText(res: Response): Promise<string | null> {
  try {
    return await res.text();
  } catch {
    return null;
  }
}
