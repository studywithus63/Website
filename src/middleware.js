import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async (context, next) => {

  // --- DIAGNOSTIC STEP ---
  // The authentication check is temporarily disabled to diagnose the login loop.
  // This allows us to see if the /admin pages can be accessed directly.
  console.log(`[Middleware] DIAGNOSTIC MODE: Bypassing auth for URL: ${context.request.url}`)

  /*
  const { cookies, redirect, request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Protect all routes under /admin, except the login page itself
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  // Protect the API routes for modifying content
  const isApiRoute = pathname.startsWith('/api/');

  if (isAdminRoute || isApiRoute) {
    const sessionCookie = cookies.get('session')?.value;

    // In a real app, you would verify the session cookie with Firebase Admin SDK
    // For this example, we'll use a simple secret comparison
    if (sessionCookie !== import.meta.env.SESSION_SECRET) {
      console.log(`[Middleware] Auth failed. Redirecting to login.`);
      // For admin UI routes, redirect to login with a redirect parameter
      if (isAdminRoute) {
          const loginUrl = new URL('/admin/login', url.origin);
          loginUrl.searchParams.set('redirect', pathname);
          return redirect(loginUrl.toString());
      } 
      // For API routes, return an unauthorized error
      else {
        return new Response('Unauthorized', { status: 401 });
      }
    }
    console.log(`[Middleware] Auth successful for ${pathname}`);
  }
  */

  return next();
});