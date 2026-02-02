import 'dotenv/config'; // Load environment variables from .env file
import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

function initializeFirebaseAdmin() {
  // Check if the app is already initialized to prevent duplicates
  if (getApps().length > 0) {
    return admin.app();
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  // Check for essential environment variables
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
    console.error("[Firebase Admin] CRITICAL: Missing Firebase environment variables.");
    throw new Error("Server configuration error: Firebase Admin SDK environment variables are not set. Deployment cannot proceed.");
  }

  // Initialize the app with credentials
  try {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    return app;
  } catch (error) {
    console.error("[Firebase Admin] Initialization failed!", error);
    throw new Error(`Firebase Admin SDK initialization failed: ${error.message}`);
  }
}

// Export a function that returns the initialized app singleton.
export function getAdminApp() {
  return initializeFirebaseAdmin();
}
