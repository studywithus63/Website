import { defineMiddleware } from 'astro/middleware';
import { getAuth } from 'firebase-admin/auth';
import { getAdminApp } from './firebase/server'; // Corrected import

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  // Skip middleware for non-admin routes
  if (!url.pathname.startsWith('/admin')) {
    return next();
  }

  // Initialize Firebase Admin on-demand
  const app = getAdminApp();
  const auth = getAuth(app);
  
  const sessionCookie = cookies.get('session');

  // If no session cookie, and not on the login page, redirect to login
  if (!sessionCookie) {
    if (url.pathname !== '/admin/login') {
      return redirect('/admin/login');
    }
    return next(); // Allow access to login page
  }

  // Verify the session cookie
  try {
    await auth.verifySessionCookie(sessionCookie.value, true);
    
    // If verified and on the login page, redirect to the admin dashboard
    if (url.pathname === '/admin/login') {
      return redirect('/admin');
    }
    
    return next(); // Proceed to the requested admin page

  } catch (error) {
    // If the cookie is invalid, delete it and redirect to login
    cookies.delete('session', { path: '/' });
    if (url.pathname !== '/admin/login') {
      return redirect('/admin/login');
    }
    return next(); // Allow retrying login
  }
});