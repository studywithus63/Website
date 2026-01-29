
import { defineMiddleware } from "astro:middleware";
import { getAuth } from "firebase-admin/auth";
import { app } from "./firebase/server";

const auth = getAuth(app);

export const onRequest = defineMiddleware(async ({ cookies, redirect, url }, next) => {
  if (url.pathname.startsWith("/admin")) {
    const sessionCookie = cookies.get("session");

    if (!sessionCookie) {
      if (url.pathname !== "/admin/login") {
        return redirect("/admin/login");
      }
      return next();
    }

    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie.value, true);
      // User is authenticated, proceed to the requested page.
      if (url.pathname === "/admin/login") {
        return redirect("/admin"); // Already logged in, redirect from login page
      }
    } catch (error) {
      // Session cookie is invalid. Redirect to login.
      if (url.pathname !== "/admin/login") {
        return redirect("/admin/login");
      }
    }
  }

  return next();
});
