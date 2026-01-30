
# Blueprint

## Overview

This document outlines the plan to add a site-wide newsletter signup box to the Astro project.

## Current Implementation Plan

### 1. Create the Newsletter Component

- A new Astro component will be created at `src/components/Newsletter.astro`.
- This component will contain the HTML and CSS for the newsletter signup form, including fields for name, email, a consent checkbox, and a submit button.
- The styling will be self-contained within the component.

### 2. Create the API Endpoint

- A new API endpoint will be created at `src/pages/api/subscribe.js` to handle form submissions.
- This endpoint will perform server-side validation and process the form data.
- Initially, it will log submissions to the console.

### 3. Integrate the Component

- The `Newsletter` component will be added to the `src/layouts/BaseLayout.astro` file.
- It will be placed immediately before the `Footer` component.
- Conditional logic will be used to prevent the newsletter box from appearing on admin pages.
