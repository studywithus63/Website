import { initializeApp, getApps, App, cert } from "firebase-admin/app";

// Import the service account key
import serviceAccount from "../../firebase-service-account.json";

// Check if the app is already initialized to avoid re-initializing
const apps = getApps();

const initializeAdminApp = (): App => {
  // Initialize the app with the service account credentials
  return initializeApp({ credential: cert(serviceAccount) });
};

export const app: App = apps.length ? apps[0]! : initializeAdminApp();
