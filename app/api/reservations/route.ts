import { NextResponse } from "next/server";
import { ID } from "appwrite";
import { databases } from "@/lib/appwrite";
import { reservationSchema } from "@/lib/validations";
import { sendReservationEmail } from "@/lib/resend";

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId =
  process.env.NEXT_PUBLIC_APPWRITE_RESERVATIONS_COLLECTION_ID;

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

    // Check if Appwrite database config is present
    if (
      !databaseId ||
      !collectionId ||
      databaseId.includes("placeholder") ||
      collectionId.includes("placeholder")
    ) {
      console.warn(
        "Appwrite database details are placeholders. Returning mock successful response.",
      );
      return NextResponse.json(
        {
          message: "Reservation recorded (Mock mode)",
          data: {
            id: "mock-reservation-" + Math.random().toString(36).substr(2, 9),
            ...reservationData,
            status: "pending",
            createdAt: new Date().toISOString(),
          },
        },
        { status: 201 },
      );
    }

    // Save to Appwrite
    const document = await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        name: reservationData.name,
        email: reservationData.email,
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
      { message: "Reservation recorded successfully", data: document },
      { status: 201 },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
