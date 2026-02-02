import { initializeApp, getApps, getApp } from "firebase-admin/app";

const getAdminApp = () => {
  console.log("[Firebase Admin] Attempting to get Firebase Admin App...");

  if (getApps().length) {
    console.log("[Firebase Admin] App already exists. Returning existing app.");
    return getApp();
  }

  try {
    console.log("[Firebase Admin] No app found. Initializing a new app...");
    const app = initializeApp();
    console.log("[Firebase Admin] New app initialized successfully.");
    return app;
  } catch (error) {
    console.error("[Firebase Admin] CRITICAL: Failed to initialize Firebase Admin App:", error);
    throw error; // Re-throw the error to ensure it's not silently ignored
  }
};

export { getAdminApp };
