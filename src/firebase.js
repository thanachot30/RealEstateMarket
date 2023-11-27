// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mean-estate-ae93d.firebaseapp.com",
  projectId: "mean-estate-ae93d",
  storageBucket: "mean-estate-ae93d.appspot.com",
  messagingSenderId: "338561653522",
  appId: "1:338561653522:web:ef18fe1eb133e2826331cb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);