// src/firebase/config.js

// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // ← Add this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAtqSHDkgP2acybdEkVHJIp3P72OrTeDY",
  authDomain: "reactjs-72d91.firebaseapp.com",
  projectId: "reactjs-72d91",
  storageBucket: "reactjs-72d91.firebasestorage.app",
  messagingSenderId: "382159835424",
  appId: "1:382159835424:web:d1f3aae816379e1317c745"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore
export const db = getFirestore(app);  // ← Export db