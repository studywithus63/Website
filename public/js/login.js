
// Import Firebase modules from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// The firebaseConfig object is now expected to be in the global scope
// It will be provided by a script in the main login.astro file

const app = initializeApp(window.firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            errorMessage.textContent = "Logging in...";

            const email = form.email.value;
            const password = form.password.value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredential.user.getIdToken();

                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken }),
                });

                if (response.ok) {
                    window.location.href = "/admin";
                } else {
                    const errorData = await response.text();
                    console.error('Server-side login failure:', errorData);
                    errorMessage.textContent = "Login failed after verification. Please try again.";
                }
            } catch (error) {
                console.error("Login Error:", error.code, error.message);
                 if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                    errorMessage.textContent = "Invalid email or password.";
                } else {
                    errorMessage.textContent = "An unexpected error occurred. Please try again.";
                }
            }
        });
    }
});
