
import { getAuth } from "firebase-admin/auth";
import { app } from "./src/firebase/server";

async function setAdmin(uid: string) {
  const auth = getAuth(app);
  try {
    await auth.setCustomUserClaims(uid, { admin: true });
    console.log(`Successfully set admin claim for user ${uid}`);
  } catch (error) {
    console.error(`Error setting admin claim: ${error}`);
  }
  process.exit(0);
}

const uid = process.argv[2];

if (!uid) {
  console.error("Please provide a UID as a command-line argument.");
  process.exit(1);
}

setAdmin(uid);
