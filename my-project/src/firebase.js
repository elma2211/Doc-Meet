// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD--b6cmpGAIlVUioC15v7pFBwgMcLZimk",
  authDomain: "doc-meet-5d895.firebaseapp.com",
  projectId: "doc-meet-5d895",
  storageBucket: "doc-meet-5d895.appspot.com",
  messagingSenderId: "81837609145",
  appId: "1:81837609145:web:9ed4de2329c75092200b68",
  measurementId: "G-378MN8SLEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);
