
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";

export const POST = async ({ request, cookies }) => {
  const auth = getAuth(app);
  console.log("[Login API] Received login request.");

  const { idToken } = await request.json();

  if (!idToken) {
    console.error("[Login API] Missing ID token in request.");
    return new Response("Missing ID token", { status: 400 });
  }
  console.log(`[Login API] Received ID token (first 30 chars): ${idToken.substring(0, 30)}...`);

  try {
    console.log("[Login API] Verifying ID token...");
    await auth.verifyIdToken(idToken);
    console.log("[Login API] ID token is valid.");

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds
    console.log(`[Login API] Creating session cookie with expiration: ${expiresIn}ms.`);
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    console.log(`[Login API] Session cookie created successfully (first 30 chars): ${sessionCookie.substring(0, 30)}...`);

    // ** THE FIX IS HERE **
    // Hardcode `secure: true` as the site is always on HTTPS.
    // Explicitly set `SameSite: 'Lax'` for modern browser compatibility.
    const cookieOptions = {
      path: "/",
      httpOnly: true,
      secure: true, // Always secure on App Hosting
      maxAge: expiresIn / 1000, // maxAge is in seconds
      SameSite: 'Lax', // Explicitly set SameSite
    };

    console.log("[Login API] Setting cookie with robust options:", cookieOptions);
    cookies.set("session", sessionCookie, cookieOptions);
    console.log("[Login API] Cookie set. Sending success response.");

    return new Response("Login successful", { status: 200 });

  } catch (error) {
    console.error("[Login API] CRITICAL: Error during authentication process:", error.code, error.message);
    // Log the full error for better debugging on the server
    console.error(error);
    return new Response("Authentication failed due to a server error.", { status: 500 });
  }
};
