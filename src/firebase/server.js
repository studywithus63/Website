
import { initializeApp, cert, getApps } from 'firebase-admin/app';

// Construct the service account object from environment variables
const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.FIREBASE_PROJECT_ID,
  private_key_id: "", // This can be left empty
  private_key: import.meta.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, '\n'),
  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
  client_id: "", // This can be left empty
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${import.meta.env.FIREBASE_CLIENT_EMAIL}`
};

// Get existing apps
const apps = getApps();

// Initialize the Firebase Admin app if it doesn't already exist
// This prevents re-initialization errors during hot-reloads
const app = apps.length 
  ? apps[0] 
  : initializeApp({
      credential: cert(serviceAccount),
    });

// Export the initialized app
export { app };
