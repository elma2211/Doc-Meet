// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_-b6cmpGAlIvUi0c15V7yFBwgMcLZimk",
  authDomain: "doc-meet-5d895.firebaseapp.com",
  projectId: "doc-meet-5d895",
  storageBucket: "doc-meet-5d895.appspot.com",
  messagingSenderId: "81837609145",
  appId: "1:81837609145:web:9ed4de2329c75092200b68",
  measurementId: "G-378MN0SLEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Export Firestore
export const db = getFirestore(app);
export const storage = getStorage(app); 
