// Forcing final redeployment after setting IAM permissions.
import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";

const getAdminApp = () => {
  // Check if the app is already initialized
  if (getApps().length) {
    return getApp();
  }

  // Use process.env for server-side environment variables
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, '\n'), // Ensure newlines are correctly formatted
  };

  // Initialize the Firebase Admin SDK
  return initializeApp({
    credential: cert(serviceAccount),
  });
};

export { getAdminApp };
