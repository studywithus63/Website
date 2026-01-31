import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";

export const POST: APIRoute = async ({ request, cookies }) => {
  const auth = getAuth(app);

  /* Get token from request body */
  const { idToken } = await request.json();

  if (!idToken) {
    return new Response("Missing ID token", { status: 400 });
  }

  try {
    /* Verify the ID token */
    await auth.verifyIdToken(idToken);

    /* Create a session cookie */
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: 60 * 60 * 24 * 5 * 1000, });

    cookies.set("session", sessionCookie, {
      path: "/",
      httpOnly: true,
      secure: import.meta.env.PROD,
      maxAge: 60 * 60 * 24 * 5,
    });

    return new Response("Login successful", { status: 200 });

  } catch (error) {
    console.error("Error creating session cookie:", error);
    return new Response("Authentication failed", { status: 401 });
  }
};
