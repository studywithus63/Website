import { defineMiddleware } from 'astro/middleware';
import { getAuth } from 'firebase-admin/auth';
import { getAdminApp } from './firebase/server';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  // Rule #1: If it's not an admin page, do nothing.
  if (!url.pathname.startsWith('/admin')) {
    return next();
  }

  // Rule #2: If it's the login page or the login API, do nothing.
  // This PREVENTS the infinite redirect loop.
  if (url.pathname === '/admin/login' || url.pathname === '/api/auth/login') {
    return next();
  }

  // For all other /admin pages, we must verify the user.
  const sessionCookie = cookies.get('session');

  // If no session cookie is found, redirect to the login page.
  if (!sessionCookie) {
    return redirect('/admin/login');
  }

  // If a cookie is found, try to verify it.
  try {
    const app = getAdminApp();
    const auth = getAuth(app);
    await auth.verifySessionCookie(sessionCookie.value, true);

    // The user is authenticated, proceed to the requested page.
    return next();

  } catch (error) {
    // The cookie is invalid. Log the error, delete the bad cookie, and redirect to login.
    console.error('[Middleware Error] Invalid session cookie:', error);
    cookies.delete('session', { path: '/' });
    return redirect('/admin/login');
  }
});
