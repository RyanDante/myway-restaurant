import fs from "fs";
import path from "path";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FALLBACK_MENU } from "../lib/constants";

// Inline .env.local loader to supply configuration outside Next.js runtime
try {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, "utf8");
    envFile.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    });
    console.log("Loaded configurations from .env.local");
  }
} catch (err) {
  console.warn("Unable to load environment variables from .env.local", err);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Log loaded credentials to verify they are correct
console.log("Firebase Configuration loaded:");
console.log("- Project ID:", firebaseConfig.projectId);
console.log("- API Key present:", !!firebaseConfig.apiKey);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper function to force operations to timeout if Firestore connection hangs
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms. Check your network or Firebase Firestore database rules/indexes.`));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

async function seed() {
  if (!firebaseConfig.projectId || firebaseConfig.projectId.includes("placeholder")) {
    console.error("Firebase Project ID is missing or set to placeholder. Please set valid environment credentials in .env.local.");
    process.exit(1);
  }

  console.log(`Initializing upload of ${FALLBACK_MENU.length} menu items...`);
  
  for (const item of FALLBACK_MENU) {
    try {
      // Set document with ID matching menu item code ID, wrapped in a 6-second timeout
      await withTimeout(setDoc(doc(db, "menu", item.id), item), 6000);
      console.log(`[SEED] Success: ${item.nameEn} (${item.category})`);
    } catch (err: any) {
      console.error(`[SEED] Error seeding ${item.nameEn}:`, err.message || err);
      console.error("Ensure your Firestore rules allow read/write operations (e.g. set to test mode or public write enabled).");
      process.exit(1);
    }
  }
  
  console.log("Seeding catalog finished successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Fatal Seeding Process Failure:", err);
  process.exit(1);
});
