# Project Blueprint

## Overview

This project is a static-first web application built with Astro.js. It is designed to be developed within the Firebase Studio (formerly Project IDX) environment. The focus is on creating a fast, highly-performant, and scalable site that delivers minimal JavaScript by default, ensuring an exceptional user experience and top-tier Core Web Vitals.

## Implemented Features

### Initial Setup

*   Astro.js project initialized.
*   Firebase integrated for backend services.

### User Authentication

*   Firebase Authentication implemented for user login and registration.

### Admin Role

*   A user can be assigned an 'admin' role, granting them elevated privileges.

## Recent Tasks

### Task: Make User an Admin

*   **Action:** Created a temporary Astro page (`src/pages/temp-admin.astro`) with server-side code to set a custom 'admin' claim for a specific user UID.
*   **Outcome:** Successfully granted admin privileges by visiting the temporary page, which was then deleted.

### Task: Fix Deployment Build Failure

*   **Problem:** The deployment to Firebase App Hosting was failing during the build process.
*   **Cause:** A new Firebase service account key was generated but not updated in the App Hosting environment.
*   **Action:** Identified that environment variables (`FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`) in `src/firebase/server.ts` needed to be updated in the App Hosting settings, not locally.
*   **Solution:** Guided the user to update the secret keys in their Firebase App Hosting configuration.

### Task: Fix Runtime 404 Errors

*   **Problem:** After a successful build, the deployed application was returning `404 Not Found` for all pages.
*   **Cause:** The project was configured with `@astrojs/node` to output a server-rendered application, but it was missing a `Procfile`. This file is required by Firebase App Hosting to know the command to start the Node.js server.
*   **Solution:** Created a `Procfile` in the project root with the content: `web: node ./dist/server/entry.mjs`.
