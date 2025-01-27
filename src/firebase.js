import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCVze9NPzlf9a6J_4xs3HYy336sxebhRE0",
    authDomain: "shopicart-eeb31.firebaseapp.com",
    projectId: "shopicart-eeb31",
    storageBucket: "shopicart-eeb31.firebasestorage.app",
    messagingSenderId: "68267826619",
    appId: "1:68267826619:web:89eace14ed441ded22389e",
    measurementId: "G-42SJDFMNLG",
    databaseURL: "https://console.firebase.google.com"
  };


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const getAuthh = getAuth(app);