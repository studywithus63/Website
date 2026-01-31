# Project Blueprint

## Overview

This project is a static-first web application built with Astro.js and hosted on Firebase App Hosting. The focus is on creating a fast, performant, and scalable website with a great user experience.

## Style and Design

*   **Framework:** Astro.js
*   **Styling:** Tailwind CSS (utility-first)
*   **Fonts:** Atkinson Hyperlegible
*   **Colors:** A vibrant and energetic palette.
*   **Texture:** Subtle noise texture on the main background.
*   **Visual Effects:** Multi-layered drop shadows for depth.
*   **Iconography:** Modern and intuitive icons.
*   **Interactivity:** "Glow" effect on interactive elements.

## Features

*   **File-based routing:** Pages are created in the `src/pages/` directory.
*   **Component-based architecture:** UI is built with a mix of `.astro` components (for static content) and UI framework components (for interactive "islands").
*   **Server-side data fetching:** Data is fetched in the component's frontmatter.
*   **Partial hydration:** `client:` directives are used to control when components become interactive.
*   **Firebase Integration:**
    *   **Hosting:** The application is deployed to Firebase App Hosting.
    *   **Authentication:** Firebase Admin SDK is used for backend authentication.
    *   **Firestore:** The application uses Firestore as its database.

## Current Change: Fix Firebase Admin SDK Initialization

*   **Problem:** The Firebase Admin SDK was not being initialized correctly in the App Hosting environment, leading to authentication errors because of restrictions on service account key creation.
*   **Solution:** The `firebase/server.ts` file was updated to use `credential.applicationDefault()`. This allows the SDK to automatically use the credentials provided by the App Hosting environment, resolving the authentication issue without requiring a manually created service account key.
