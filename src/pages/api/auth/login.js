import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";

export const POST = async ({ request, cookies }) => {
  const auth = getAuth(app);
  console.log("[Login API] Received login request.");

  /* Get token from request body */
  const { idToken } = await request.json();

  if (!idToken) {
    console.error("[Login API] Missing ID token in request.");
    return new Response("Missing ID token", { status: 400 });
  }
  console.log(`[Login API] Received ID token: ${idToken.substring(0, 30)}...`);

  try {
    console.log("[Login API] Verifying ID token...");
    await auth.verifyIdToken(idToken);
    console.log("[Login API] ID token is valid.");

    /* Create a session cookie */
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    console.log(`[Login API] Creating session cookie with expiration: ${expiresIn}ms.`);
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    console.log(`[Login API] Session cookie created successfully: ${sessionCookie.substring(0, 30)}...`);

    const cookieOptions = {
      path: "/",
      httpOnly: true,
      secure: import.meta.env.PROD,
      maxAge: expiresIn / 1000, // maxAge is in seconds
    };
    console.log("[Login API] Setting cookie with options:", cookieOptions);
    cookies.set("session", sessionCookie, cookieOptions);
    console.log("[Login API] Cookie set. Sending success response.");

    return new Response("Login successful", { status: 200 });

  } catch (error) {
    console.error("[Login API] Error during authentication process:", error.code, error.message);
    return new Response("Authentication failed", { status: 401 });
  }
};
