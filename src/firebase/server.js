
import pkg from "firebase-admin";

// This simplified version is optimized for App Hosting.
// It will ONLY use environment variables.
// For local development, you should use a .env file or the Firebase Emulator.

let app;

if (!pkg.apps.length) {
  try {
    // This will succeed on App Hosting if secrets are set
    // and in local dev if a .env file is used.
    console.log("[Firebase Admin] Initializing with environment variables...");
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\n/g, '\n');

    const credential = pkg.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    });

    app = pkg.initializeApp({ credential });
    console.log("[Firebase Admin] Initialization successful.");

  } catch (error) {
    console.error("[Firebase Admin] Initialization failed!", error);
    console.error("Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.");
    // We don't throw an error here, but the app will likely fail on auth-related tasks.
    // The server needs to start, even if Firebase Admin fails to initialize.
  }
} else {
  console.log("[Firebase Admin] App already initialized.");
  app = pkg.app();
}

// Export the initialized app
export { app };
