import { NextResponse } from "next/server";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isFirebaseConfigured || !db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    // Verify Passkey
    const authHeader = req.headers.get("Authorization");
    const passkey = authHeader?.replace("Bearer ", "").trim();
    if (passkey !== process.env.ADMIN_PASSKEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    if (!body.status) {
      return NextResponse.json({ error: "Status field is required" }, { status: 400 });
    }

    const docRef = doc(db, "reservations", id);
    await updateDoc(docRef, { status: body.status });

    return NextResponse.json({ success: true, message: `Reservation ${id} status updated to ${body.status}` });
  } catch (error: any) {
    console.error("Failed to update reservation status:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isFirebaseConfigured || !db) {
      return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
    }

    // Verify Passkey
    const authHeader = req.headers.get("Authorization");
    const passkey = authHeader?.replace("Bearer ", "").trim();
    if (passkey !== process.env.ADMIN_PASSKEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const docRef = doc(db, "reservations", id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true, message: `Reservation ${id} deleted successfully` });
  } catch (error: any) {
    console.error("Failed to delete reservation:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
