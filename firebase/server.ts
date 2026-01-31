import { initializeApp, getApps, getApp, type App, credential } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();

const app: App = apps.length
  ? getApp()
  : initializeApp({
      credential: credential.applicationDefault(),
    });

export { app };
export const auth = getAuth(app);
export const db = getFirestore(app);
