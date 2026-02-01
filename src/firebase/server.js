"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var app_1 = require("firebase-admin/app");
var serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: "",
    private_key: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        : undefined,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: "",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/".concat(process.env.FIREBASE_CLIENT_EMAIL),
};
var apps = (0, app_1.getApps)();
var initializeAdminApp = function () {
    return (0, app_1.initializeApp)({
        credential: (0, app_1.cert)(serviceAccount),
    });
};
exports.app = apps.length ? apps[0] : initializeAdminApp();
