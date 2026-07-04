import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passkey } = body;

    const actualPasskey = process.env.ADMIN_PASSKEY || "myway2026";

    if (passkey && passkey.trim() === actualPasskey.trim()) {
      return NextResponse.json({ success: true, token: actualPasskey });
    }

    return NextResponse.json({ success: false, error: "Invalid Passcode" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
