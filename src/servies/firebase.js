// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuFzb4xN9rXXhW0hIJ6k94UZYlTFGq9rI",
  authDomain: "todolist-c6c27.firebaseapp.com",
  projectId: "todolist-c6c27",
  storageBucket: "todolist-c6c27.appspot.com",
  messagingSenderId: "511587190648",
  appId: "1:511587190648:web:a4fb5f07e4a6739a666a8d",
  measurementId: "G-SD46JCR38N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const auth = getAuth();