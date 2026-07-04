import { NextResponse } from "next/server";
import { ID } from "appwrite";
import { databases } from "@/lib/appwrite";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { reservationSchema } from "@/lib/validations";
import { sendReservationEmail } from "@/lib/resend";

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID;

export async function GET() {
  try {
    if (!isFirebaseConfigured || !db) {
      console.warn("Firebase not configured. Returning empty bookings log.");
      return NextResponse.json({ source: "mock", data: [] });
    }

    const querySnapshot = await getDocs(collection(db, "reservations"));
    const reservationsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sort in-memory by createdAt descending
    reservationsList.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    return NextResponse.json({ source: "firebase", data: reservationsList });
  } catch (error: any) {
    console.error("Failed to query reservations from Firestore:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validation = reservationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 },
      );
    }

    const reservationData = validation.data;

    // Dispatch email confirmation using Resend API asynchronously
    sendReservationEmail(reservationData).catch((err) =>
      console.error('Failed to send reservation email confirmation:', err)
    );

    // Save to Firestore if configured
    if (isFirebaseConfigured && db) {
      const docId = "booking-" + Math.random().toString(36).substr(2, 9) + Date.now().toString().slice(-4);
      const documentData = {
        id: docId,
        name: reservationData.name,
        email: reservationData.email || "",
        phone: reservationData.phone,
        guests: Number(reservationData.guests),
        date: reservationData.date,
        time: reservationData.time,
        specialRequests: reservationData.specialRequests || "",
        preorderType: reservationData.preorderType || "none",
        preorderedFood: reservationData.preorderedFood || "",
        guestOrders: reservationData.guestOrders || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "reservations", docId), documentData);
      return NextResponse.json(
        { message: "Reservation recorded successfully in Firestore", data: documentData },
        { status: 201 }
      );
    }

    // Check if Appwrite database config is present (Appwrite backup fallback)
    if (
      databaseId &&
      collectionId &&
      !databaseId.includes("placeholder") &&
      !collectionId.includes("placeholder")
    ) {
      const document = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          name: reservationData.name,
          email: reservationData.email || "",
          phone: reservationData.phone,
          guests: reservationData.guests,
          date: reservationData.date,
          time: reservationData.time,
          specialRequests: reservationData.specialRequests || "",
          preorderType: reservationData.preorderType || "none",
          preorderedFood: reservationData.preorderedFood || "",
          guestOrders: reservationData.guestOrders || "",
          status: "pending",
          createdAt: new Date().toISOString(),
        },
      );

      return NextResponse.json(
        { message: "Reservation recorded successfully in Appwrite", data: document },
        { status: 201 },
      );
    }

    // Double fallback (Mock success)
    const mockId = "mock-reservation-" + Math.random().toString(36).substr(2, 9);
    const mockData = {
      id: mockId,
      ...reservationData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(
      {
        message: "Reservation recorded (Mock fallback mode)",
        data: mockData,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Reservation submission error:", error);
    return NextResponse.json(
      {
        error:
          error.message || "An error occurred while saving the reservation",
      },
      { status: 500 },
    );
  }
}
