
import pkg from "firebase-admin";

try {
  // Check if the variables are set in the App Hosting environment
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
    console.log("[Firebase Admin] Initializing with environment variables.");
    pkg.initializeApp({
      credential: pkg.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // The private key must be properly formatted with newlines
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\n/g, '\n'),
      }),
    });
  } else {
    // Fallback for local development using service account file
    console.log("[Firebase Admin] Initializing with service account file.");
    // Make sure you have the serviceAccountKey.json file in your project root
    const serviceAccount = await import("../../serviceAccountKey.json", {
      assert: { type: "json" },
    });
    pkg.initializeApp({
      credential: pkg.credential.cert(serviceAccount.default),
    });
  }
} catch (error) {
  if (!pkg.apps.length) {
    console.error("[Firebase Admin] Initialization failed:", error);
  } else {
    console.log("[Firebase Admin] App already initialized.");
  }
}

export const app = pkg.app();
