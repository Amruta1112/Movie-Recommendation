// firebase.js

// Import core Firebase modules needed for initialization and features
import { initializeApp } from "firebase/app"; // Initializes Firebase app
import { getAuth } from "firebase/auth";       // For Firebase Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore database

// Your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZEuROwnzh5iJc08wPQAtCZ8mpyUyABX0", // API Key to authorize Firebase requests
    authDomain: "movie-recommendation-9451b.firebaseapp.com", // Domain for auth redirects
    projectId: "movie-recommendation-9451b", // Unique project ID
    storageBucket: "movie-recommendation-9451b.firebasestorage.app", // For file storage (not used yet)
    messagingSenderId: "643041126023", // For Firebase Cloud Messaging (optional)
    appId: "1:643041126023:web:810cb0b816b11313f5ba22", // Unique identifier for this web app
    measurementId: "G-57217BEXKZ" // Used for analytics (optional)
};

// Initialize the Firebase app with the above config
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore for use in your app
const auth = getAuth(app);  // Handles login, register, logout
const db = getFirestore(app); // Handles all database reads/writes

// Export everything you might need in other parts of your app
export { auth, db };        // Named exports: import what you need
export default app;         // Default export: the initialized app itself
