// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC57f46jjHlI2mDBC9Wo5OYE6wDs9ApG-E",
  authDomain: "studywithus-95d52.firebaseapp.com",
  projectId: "studywithus-95d52",
  storageBucket: "studywithus-95d52.firebasestorage.app",
  messagingSenderId: "607789581199",
  appId: "1:607789581199:web:beff47e17447642e9101fa",
  measurementId: "G-D2YS8ZZJSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
