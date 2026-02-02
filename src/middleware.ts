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
    // Changed the second argument to `false` to disable the revocation check
    await auth.verifySessionCookie(sessionCookie.value, false);
    
    if (url.pathname === '/admin/login') {
      return redirect('/admin');
    }
    
    return next();

  } catch (error) {
    cookies.delete('session', { path: '/' });
    if (url.pathname !== '/admin/login') {
      return redirect('/admin/login');
    }
    return next();
  }
});