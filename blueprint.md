# Project Blueprint

## Overview

This project is a static-first web application built with Astro.js. It is designed to be developed within the Firebase Studio (formerly Project IDX) environment. The focus is on creating a fast, highly-performant, and scalable site that delivers minimal JavaScript by default, ensuring an exceptional user experience and top-tier Core Web Vitals.

## Implemented Features

### Styling and Design

*   **CSS Framework:** Tailwind CSS
*   **Fonts:** Atkinson Hyperlegible
*   **Color Palette:**
    *   Primary: `#1E40AF` (blue)
    *   Secondary: `#DB2777` (pink)
    *   Accent: `#FBBF24` (amber)
    *   Neutral: `#111827` (gray)
*   **Layout:** Responsive design with a consistent header, footer, and navigation.
*   **Iconography:** Heroicons for UI elements.
*   **Effects:** Subtle hover effects on links and buttons.

### Core Functionality

*   **File-based Routing:** Pages are located in the `src/pages` directory.
*   **Static Site Generation:** All pages are pre-rendered to HTML at build time.
*   **Component-based Architecture:** Reusable UI components are in `src/components`.
*   **Layouts:** A base layout in `src/layouts` provides a consistent page structure.
*   **Blog:** A blog with posts written in Markdown, located in `src/content/blog`.
*   **Firebase Integration:** Firebase is used for authentication and database services.

### Implemented Pages

*   **Home:** `/` - Landing page with an introduction and featured blog posts.
*   **About:** `/about` - A page describing the project and its mission.
*   **Contact:** `/contact` - A page with contact information.
*   **Disclaimer:** `/disclaimer` - A page with a disclaimer.
*   **Our Mission:** `/our-mission` - A page describing the mission of the project.
*   **Privacy:** `/privacy` - A page with a privacy policy.
*   **Blog:** `/blog` - A page listing all blog posts.
*   **Blog Post:** `/blog/[slug]` - A dynamic route to display individual blog posts.

## Current Task: Update Firebase Configuration

### Plan

1.  **Update Firebase Client Configuration:** Replace the existing Firebase configuration in `src/scripts/firebase.js` with the new configuration provided by the user.
2.  **Update Firebase Service Account:** Replace the existing Firebase service account configuration in `firebase-service-account.json` with the new configuration provided by the user.

### Steps

1.  Update the `firebaseConfig` object in `src/scripts/firebase.js` with the new values.
2.  Update the `firebase-service-account.json` file with the new service account details.
3.  Update the `blueprint.md` to reflect the changes.
