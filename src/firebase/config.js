import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FB_DATABASE_URL,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "your_firebase_api_key_here" &&
  firebaseConfig.databaseURL &&
  typeof firebaseConfig.databaseURL === "string" &&
  firebaseConfig.databaseURL.startsWith("http")
);

let dbInstance = null;

if (isFirebaseConfigured) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    dbInstance = getDatabase(app);
  } catch (err) {
    console.warn("[Crisis.exe] Firebase initialization failed. Falling back to offline telemetry:", err);
  }
}

export const db = dbInstance;
