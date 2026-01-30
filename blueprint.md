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

## Current Task: Debugging Admin Login HTTP 500 Error

**Issue:** An `HTTP ERROR 500` is occurring when attempting to log in to the admin section via `/admin/login`. Firebase logs indicate a `SyntaxError: "undefined" is not valid JSON` originating from or related to the `/api/auth/login` POST request. This is unexpected as the `src/pages/api/auth/login.astro` endpoint uses `request.formData()` which typically handles form-encoded data, not JSON parsing directly. The login form (`src/pages/admin/login.astro`) correctly uses `method="POST"` and `action="/api/auth/login"`.

**Proposed Debugging Steps:**

1.  Add debug logs within `src/pages/api/auth/login.astro` to inspect the incoming `request` object and its body.
2.  Specifically, before calling `request.formData()`, attempt to log `request.headers.get('content-type')` and potentially `request.text()` (though `request.formData()` and `request.text()` can conflict if called on the same request body, this is for diagnostic purposes).
3.  Log the raw `formData` object and the extracted `email` and `password` values to ensure they are being received as expected.