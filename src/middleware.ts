import { defineMiddleware } from 'astro/middleware';
import { getAuth } from 'firebase-admin/auth';
import { getAdminApp } from './firebase/server';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  if (!url.pathname.startsWith('/admin')) {
    return next();
  }

  if (url.pathname === '/admin/login' || url.pathname === '/api/auth/login') {
    return next();
  }

  const sessionCookie = cookies.get('session');

  if (!sessionCookie) {
    console.log('[Middleware] No session cookie found. Redirecting to login.');
    return redirect('/admin/login');
  }

  console.log('[Middleware] Session cookie found. Attempting to verify...');

  try {
    const app = getAdminApp();
    const auth = getAuth(app);
    const decodedToken = await auth.verifySessionCookie(sessionCookie.value, false);
    console.log('[Middleware] Session cookie verified successfully for UID:', decodedToken.uid);

    // Add user info to context for other pages to use
    context.locals.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    return next();

  } catch (error) {
    console.error('[Middleware] Error verifying session cookie:', error.code, error.message);
    // Delete the invalid cookie
    cookies.delete('session', { path: '/' });
    console.log('[Middleware] Deleted invalid cookie. Redirecting to login.');
    return redirect('/admin/login');
  }
});
