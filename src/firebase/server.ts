// Forcing redeployment to apply secrets
import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";

const getAdminApp = () => {
  // Check if the app is already initialized
  if (getApps().length) {
    return getApp();
  }

  const serviceAccount = {
    projectId: import.meta.env.FIREBASE_PROJECT_ID,
    clientEmail: import.meta.env.FIREBASE_CLIENT_EMAIL,
    privateKey: import.meta.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, '\n'), // Ensure newlines are correctly formatted
  };

  // Initialize the Firebase Admin SDK
  return initializeApp({
    credential: cert(serviceAccount),
  });
};

export { getAdminApp };
