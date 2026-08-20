import dotenv from "dotenv";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

export interface PersistentSnapshot {
  appSettings: {
    loginRequired: boolean;
    customLogo: string;
    contactAdmin: {
      email: string;
      phone: string;
      description: string;
      displayStyle: "card_green" | "card_dual";
    };
  };
  adminPassword: string;
  users: unknown[];
  registrationRequests: unknown[];
  analyses: unknown[];
  medicines: unknown[];
  diseases: unknown[];
  supportedCrops?: unknown[];
}

let firestore: ReturnType<typeof getFirestore> | null = null;
try {
  const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64?.trim();
  const serviceAccount = serviceAccountBase64
    ? JSON.parse(Buffer.from(serviceAccountBase64, "base64").toString("utf8"))
    : null;
  const firebaseApp = serviceAccount
    ? (getApps()[0] || initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID?.trim() || serviceAccount.project_id,
      }))
    : null;
  firestore = firebaseApp ? getFirestore(firebaseApp) : null;
} catch (error) {
  console.error("Firebase persistence initialization failed", error instanceof Error ? error.message : "Unknown error");
}
const stateDocument = firestore?.collection("easydiseay").doc("state") || null;

export const persistenceConfigured = Boolean(stateDocument);

export const loadPersistentSnapshot = async (): Promise<PersistentSnapshot | null> => {
  if (!stateDocument) return null;
  const snapshot = await stateDocument.get();
  return snapshot.exists ? snapshot.data() as PersistentSnapshot : null;
};

export const savePersistentSnapshot = async (snapshot: PersistentSnapshot): Promise<void> => {
  if (!stateDocument) return;
  await stateDocument.set(snapshot);
};
