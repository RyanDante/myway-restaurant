import { NextResponse } from "next/server";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { FALLBACK_MENU } from "@/lib/constants";

export async function GET() {
  try {
    if (!isFirebaseConfigured || !db) {
      console.warn("Firebase configuration is not set up. Serving fallback constants.");
      return NextResponse.json({ source: "fallback", data: FALLBACK_MENU });
    }

    const querySnapshot = await getDocs(collection(db, "menu"));
    
    if (querySnapshot.empty) {
      console.warn("Firebase Firestore 'menu' collection is empty. Serving fallback constants.");
      return NextResponse.json({ source: "fallback", data: FALLBACK_MENU });
    }

    const menuItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ source: "firebase", data: menuItems });
  } catch (error: any) {
    console.error("Failed to query menu from Firebase Firestore:", error);
    return NextResponse.json({ source: "fallback-on-error", data: FALLBACK_MENU });
  }
}

export async function POST(req: Request) {
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

    const body = await req.json();
    const { nameEn, nameFr, descriptionEn, descriptionFr, price, category, image, dietary, featured } = body;

    if (!nameEn || !price || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate a URL-safe ID if not provided
    const docId = body.id || nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newItem = {
      id: docId,
      nameEn,
      nameFr: nameFr || nameEn,
      descriptionEn: descriptionEn || "",
      descriptionFr: descriptionFr || "",
      price: Number(price),
      category,
      image: image || "",
      dietary: dietary || [],
      featured: !!featured,
    };

    await setDoc(doc(db, "menu", docId), newItem);

    return NextResponse.json({ success: true, data: newItem });
  } catch (error: any) {
    console.error("Failed to add menu item:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
