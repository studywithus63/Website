import { defineMiddleware } from 'astro/middleware';
import { getAuth } from 'firebase-admin/auth';
import { getAdminApp } from './firebase/server';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  if (!url.pathname.startsWith('/admin')) {
    return next();
  }

  const app = getAdminApp();
  const auth = getAuth(app);
  
  const sessionCookie = cookies.get('session');

  if (!sessionCookie) {
    if (url.pathname !== '/admin/login') {
      return redirect('/admin/login');
    }
    return next();
  }

  try {
    await auth.verifySessionCookie(sessionCookie.value, false);
    
    if (url.pathname === '/admin/login') {
      return redirect('/admin');
    }
    
    return next();

  } catch (error) {
    // CRITICAL: Log the actual error to diagnose the issue
    console.error("[Middleware Error] Failed to verify session cookie:", error);

    cookies.delete('session', { path: '/' });
    if (url.pathname !== '/admin/login') {
      return redirect('/admin/login', 302);
    }
    return next();
  }
});