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

### Task: Fix Deployment & Initialization Errors

1.  **Deployment `404 Not Found`:** Resolved by adding a `Procfile` for the Node.js server.
2.  **Server-Side Firebase Admin SDK Initialization Failure:** Resolved by guiding the user to set up the necessary Firebase secrets in Google Secret Manager.
3.  **Client-Side Firebase Initialization Error:** The `is:inline` directive in an Astro component script was preventing the Firebase client module from bundling. Resolved by removing the directive and deleting a redundant, unconfigured `firebase.js` script.
4.  **Server-Side "Default Firebase app does not exist" Error:** This was the most critical issue. The server was silently failing to initialize the Firebase Admin SDK at startup but would continue to run in a broken state, crashing only when a Firebase service was accessed. 
    *   **Solution:** Implemented a new, robust on-demand initialization strategy in `src/firebase/server.ts`. This "fail-fast" method ensures the server only starts if Firebase credentials are correct, preventing it from running in an unstable state. The middleware (`src/middleware.ts`) was updated to use this new initialization function, and the old, faulty `src/firebase/server.js` file was deleted.

## Next Steps

*   **Action:** Deploy the application to **Firebase App Hosting**. The previous attempt with `classic_firebase_hosting_deploy` failed because this is a server-rendered application, not a static site. The user will need to manually set up the deployment through the Firebase Console, connecting their GitHub repository to App Hosting.
