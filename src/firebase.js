// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyC5cuo521qRzE1lf86xYbpeCsjFf2uHWCQ",
  authDomain: "moneyvue-6f9a8.firebaseapp.com",
  projectId: "moneyvue-6f9a8",
  storageBucket: "moneyvue-6f9a8.firebasestorage.app",
  messagingSenderId: "507402543370",
  appId: "1:507402543370:web:13c65b4cc38295e1d71af3",
  measurementId: "G-X1HC0DX89R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };