# Blueprint: Astro.js Firebase Website

## 1. Project Overview

This project is a modern, content-focused website built with Astro.js and deployed on Firebase App Hosting. It features a blog, user authentication (login/logout), and a dynamic, visually appealing user interface. The primary goal is to create a high-performance, server-rendered application that delivers an exceptional user experience with minimal client-side JavaScript.

## 2. Implemented Features & Design

### Core Technology
- **Framework:** Astro.js (Server-first, Islands Architecture)
- **Deployment:** Firebase App Hosting (CI/CD with GitHub)
- **Authentication:** Firebase Authentication (Email/Password & Session Cookies)
- **Styling:** Inline CSS with a modern, clean aesthetic.

### Pages & Functionality
- **Home Page (`/`):**
    - A welcoming hero section with a headline and description.
    - A dynamic image carousel.
    - Login and Logout buttons that appear conditionally based on user auth state.
    - A section displaying the latest blog posts fetched from the project's content.
- **Login Page (`/admin/login`):**
    - A simple, centered form for user login.
    - Handles authentication via Firebase on the client and creates a session via a secure, server-side API endpoint.
- **Admin Page (`/admin`):**
    - A protected route accessible only to logged-in users.
    - Displays a welcome message to the authenticated user.
- **Blog Posts (`/posts/*`):**
    - Dynamically generated pages for each blog post.
    - Clean, readable layout for blog content.
- **API Endpoints:**
    - `api/auth/login`: Handles the server-side logic for creating a session cookie upon successful login.
    - `api/auth/logout`: Clears the session cookie to log the user out.

### Design & Styling
- **Layout:** Responsive and mobile-first design.
- **Color Palette:** A clean and modern palette with a white background, dark text (`#121212`), and an accent color for interactive elements.
- **Typography:** Clear and readable fonts with a strong hierarchy for headings and paragraphs.
- **Components:**
    - **Buttons:** Styled with a solid background color, rounded corners, and hover effects.
    - **Post Cards:** Blog posts on the homepage are displayed in a grid layout with cards that have a subtle shadow and transform effect on hover.
    - **Image Carousel:** A custom-built carousel with smooth fade transitions.
- **Visual Effects:**
    - Subtle box shadows on cards and images to create depth.
    - Smooth transitions for hover states and the image carousel.

## 3. Bug Fixes & Resolutions

### [RESOLVED] Critical Login Loop Issue

- **Symptom:** After a successful login, the user was continuously redirected back to the `/admin/login` page instead of accessing the `/admin` dashboard.
- **Root Cause:** The client-side `<script>` in `src/pages/admin/login.astro` contained TypeScript syntax (`as HTMLInputElement`). Browsers do not understand TypeScript, causing the script to fail silently. Because the script failed, `event.preventDefault()` was never called on form submission. This resulted in the browser defaulting to its native form submission behavior, sending the user's credentials (email and password) as an insecure `GET` request in the URL. The server middleware was not designed to handle this `GET` request and, seeing no valid session cookie, correctly redirected the user back to the login page, creating an infinite loop.
- **Resolution Steps:**
    1.  **Initial Debugging:** Ruled out server-side cookie verification issues by simplifying the logic in `middleware.ts` and adding extensive logging.
    2.  **Log Analysis:** The server logs revealed the insecure `GET` request containing login credentials in the URL, pointing to a client-side problem.
    3.  **Code Correction:** The TypeScript syntax in the `login.astro` script was replaced with standard, browser-compatible JavaScript for accessing form element values (`form.email.value`). This ensured the `fetch` call using the `POST` method was correctly executed.
    4.  **Authentication Fix:** Guided the user to create a GitHub Personal Access Token (PAT) and configure it in the remote URL to fix `git push` authentication failures.
    5.  **Deployment:** The corrected code was successfully pushed to the `main` branch, triggering a new deployment that permanently resolved the login loop.
