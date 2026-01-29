
import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const auth = getAuth(app);

  /* Get form data */
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email and password are required.", { status: 400 });
  }

  /* Authenticate user */
  try {
    const { user } = await auth.getUserByEmail(email);
    // This is a simplified check. In a real app, you'd verify the password.
    // For this example, we'll just check if the user exists.
  } catch (error) {
    return new Response("Invalid credentials.", { status: 401 });
  }

  /* Create and set session cookie */
  const sessionCookie = await auth.createSessionCookie(email, { expiresIn: 60 * 60 * 24 * 5 * 1000 });
  cookies.set("session", sessionCookie, {
    path: "/",
  });

  /* Redirect to admin dashboard */
  return redirect("/admin");
};
