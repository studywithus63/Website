# Project Blueprint

## Overview

This project is a static-first web application built with Astro.js, designed for deployment on Firebase. It focuses on performance and scalability, leveraging Astro's Islands Architecture to minimize JavaScript and optimize user experience.

## Implemented Features

### Core Setup
- Astro.js project structure.
- Firebase integration for hosting and authentication.
- Tailwind CSS for styling.
- Server-side rendering (SSR) enabled.

### Authentication
- Admin login functionality with email and password.
- Secure session management using Firebase Authentication and session cookies.
- Middleware to protect admin routes.

### Content
- Placeholder pages for Home, About, and Contact.
- Basic layout structure with a header and footer.

## Current Objective

Fix a persistent login issue where users are stuck in a redirect loop, preventing access to the admin dashboard. The error is suspected to be in the authentication middleware logic.

### Action Plan

1.  **Analyze Middleware:** Examine `src/middleware.ts` to identify the cause of the redirect loop.
2.  **Correct Logic:** Modify the middleware to correctly handle invalid session cookies by deleting them and then redirecting to the login page.
3.  **Verify Fix:** Confirm that the login process works as expected and the redirect loop is resolved.
