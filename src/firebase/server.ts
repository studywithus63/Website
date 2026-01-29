import { initializeApp, getApps, cert } from "firebase-admin/app";

const serviceAccount = import.meta.env.PROD
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
  : JSON.parse(import.meta.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

const apps = getApps();

export const app = apps.length
  ? apps[0]
  : initializeApp({
      credential: cert(serviceAccount),
    });
