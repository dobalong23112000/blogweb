import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBtIsH3Vb4avUpCA6vsXJp1WjyhJiwEcUg",
  authDomain: "blogwebsite-7cf8a.firebaseapp.com",
  projectId: "blogwebsite-7cf8a",
  storageBucket: "blogwebsite-7cf8a.appspot.com",
  messagingSenderId: "863351908248",
  appId: "1:863351908248:web:702d872334bd8d65412ded",
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
