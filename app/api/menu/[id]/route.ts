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

    const updatedData: any = {};
    if (body.nameEn !== undefined) updatedData.nameEn = body.nameEn;
    if (body.nameFr !== undefined) updatedData.nameFr = body.nameFr;
    if (body.descriptionEn !== undefined) updatedData.descriptionEn = body.descriptionEn;
    if (body.descriptionFr !== undefined) updatedData.descriptionFr = body.descriptionFr;
    if (body.price !== undefined) updatedData.price = Number(body.price);
    if (body.category !== undefined) updatedData.category = body.category;
    if (body.image !== undefined) updatedData.image = body.image;
    if (body.dietary !== undefined) updatedData.dietary = body.dietary;
    if (body.featured !== undefined) updatedData.featured = Boolean(body.featured);

    const docRef = doc(db, "menu", id);
    await updateDoc(docRef, updatedData);

    return NextResponse.json({ success: true, data: { id, ...updatedData } });
  } catch (error: any) {
    console.error("Failed to edit menu item:", error);
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
    await deleteDoc(doc(db, "menu", id));

    return NextResponse.json({ success: true, message: `Document ${id} deleted successfully` });
  } catch (error: any) {
    console.error("Failed to delete menu item:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
