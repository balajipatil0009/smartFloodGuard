// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// PRO TIP: For a production app, these should be in .env.local
const firebaseConfig = {
    apiKey: "",
    authDomain: "ddddd-b2aff.firebaseapp.com",
    projectId: "ddddd-b2aff",
    storageBucket: "ddddd-b2aff.firebasestorage.app",
    messagingSenderId: "125377692474",
    appId: "1:125377692474:web:placeholder", // Using placeholder, Firestore generally works with just Project ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
