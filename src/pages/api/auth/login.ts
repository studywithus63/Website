
import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "../../../firebase/server";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return new Response("Missing ID token", { status: 400 });
    }

    const app = getAdminApp();
    const auth = getAuth(app);

    // Set session expiration to 14 days.
    const expiresIn = 60 * 60 * 24 * 14 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: expiresIn,
      sameSite: "lax",
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error creating session cookie:", error);
    return new Response("Authentication failed", { status: 500 });
  }
};
