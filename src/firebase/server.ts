import { initializeApp, getApps, getApp } from "firebase-admin/app";

const getAdminApp = () => {
  if (getApps().length) {
    return getApp();
  }
  return initializeApp();
};

export { getAdminApp };
