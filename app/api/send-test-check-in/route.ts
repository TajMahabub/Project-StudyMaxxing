import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { ok: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_MAXX_CHECKIN_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Missing N8N_MAXX_CHECKIN_WEBHOOK_URL");
      return NextResponse.json(
        { ok: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        lockInTime: new Date().toISOString(),
        durationMinutes: 60,
      }),
    });

    if (!res.ok) {
      console.error("n8n error status:", res.status);
      return NextResponse.json(
        { ok: false, error: "Failed to trigger workflow" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
