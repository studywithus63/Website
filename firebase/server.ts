import { initializeApp, getApps, getApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();

const app: App = apps.length
  ? getApp()
  : initializeApp();

export { app };
export const auth = getAuth(app);
export const db = getFirestore(app);
