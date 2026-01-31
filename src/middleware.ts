
import { defineMiddleware } from "astro:middleware";
import { getAuth } from "firebase-admin/auth";
import { app } from "./firebase/server";

const auth = getAuth(app);

export const onRequest = defineMiddleware(async ({ cookies, redirect, url }, next) => {
  if (url.pathname.startsWith("/admin")) {
    const sessionCookie = cookies.get("session");

    if (!sessionCookie) {
      // If no cookie, and not on the login page, redirect to login.
      if (url.pathname !== "/admin/login") {
        return redirect("/admin/login");
      }
      // Allow access to the login page.
      return next();
    }

    // We have a cookie, let's verify it.
    try {
      await auth.verifySessionCookie(sessionCookie.value, true);
      // User is authenticated.
      // If they are trying to access the login page, redirect to the dashboard.
      if (url.pathname === "/admin/login") {
        return redirect("/admin");
      }
      // Otherwise, they can access the protected page.
      return next();
    } catch (error) {
      // Session cookie is invalid. Delete it.
      cookies.delete("session", { path: "/" });
      // Redirect to login page if not already there.
      if (url.pathname !== "/admin/login") {
        return redirect("/admin/login");
      }
      // Allow the request to proceed to display the login page.
      return next();
    }
  }

  // Not an admin route, so just continue.
  return next();
});
