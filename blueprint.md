# Blueprint: Astro.js Firebase Website

## 1. Project Overview

This project is a modern, content-focused website built with Astro.js and deployed on Firebase App Hosting. It features a blog, user authentication (login/logout), and a dynamic, visually appealing user interface. The primary goal is to create a high-performance, server-rendered application that delivers an exceptional user experience with minimal client-side JavaScript.

## 2. Implemented Features & Design

### Core Technology
- **Framework:** Astro.js (Server-first, Islands Architecture)
- **Deployment:** Firebase App Hosting (CI/CD with GitHub)
- **Authentication:** Firebase Authentication (Email/Password & Social)
- **Styling:** Inline CSS with a modern, clean aesthetic.

### Pages & Functionality
- **Home Page (`/`):**
    - A welcoming hero section with a headline and description.
    - A dynamic image carousel.
    - Login and Logout buttons that appear conditionally based on user auth state.
    - A section displaying the latest blog posts fetched from the project's content.
- **Login Page (`/login`):**
    - A simple, centered form for user login.
    - Handles authentication via Firebase.
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

## 3. Current Task: Finalizing and Documenting the Deployment

**Objective:** The application was successfully built and deployed after fixing several critical issues related to server startup, Firebase SDK initialization, and environment variable configuration for production. The final step is to create this blueprint for future reference.

**Plan:**
1.  **[COMPLETED]** **Create `blueprint.md`:** Generate this markdown file to serve as a comprehensive project guide.
2.  **[COMPLETED]** **Document Project Overview:** Add a high-level summary of the project's purpose.
3.  **[COMPLETED]** **Document Implemented Features:** Detail all existing styles, features, and design choices.
4.  **[COMPLETED]** **Summarize Final Steps:** Conclude the interaction by confirming the successful deployment and explaining the purpose of this blueprint.
