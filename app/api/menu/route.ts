import { NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite';
import { FALLBACK_MENU } from '@/lib/constants';

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_MENU_COLLECTION_ID;

export async function GET() {
  try {
    // If Appwrite configuration is placeholder, use static fallback menu
    if (
      !databaseId ||
      !collectionId ||
      databaseId.includes('placeholder') ||
      collectionId.includes('placeholder')
    ) {
      return NextResponse.json({ source: 'fallback', data: FALLBACK_MENU });
    }

    const response = await databases.listDocuments(databaseId, collectionId);
    
    // If database is empty, return static fallback menu
    if (response.documents.length === 0) {
      return NextResponse.json({ source: 'fallback', data: FALLBACK_MENU });
    }

    return NextResponse.json({ source: 'appwrite', data: response.documents });
  } catch (error: any) {
    console.error('Error fetching menu items:', error);
    // Graceful fallback to static menu in case of network/database failure
    return NextResponse.json({ source: 'fallback-on-error', data: FALLBACK_MENU });
  }
}
