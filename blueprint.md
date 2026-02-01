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

### Task: Fix Deployment Errors

1.  **Problem:** Initial deployment failed with `404 Not Found` errors.
2.  **Cause:** The Astro Node.js adapter requires a `Procfile` to instruct App Hosting on how to start the server. This file was missing.
3.  **Solution:** Created a `Procfile` in the project root.

4.  **Problem:** Second deployment failed because the server couldn't initialize Firebase Admin SDK.
5.  **Cause:** The deployment was triggered before the necessary secrets (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`) were configured in the environment.
6.  **Solution:** Guided the user to create these secrets in Google Secret Manager.

7.  **Action:** Triggering a new deployment now that the secrets are in place.
