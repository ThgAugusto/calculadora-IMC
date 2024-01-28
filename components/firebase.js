// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC2KJ_Y2GFktyFziqu3sztp0PciFCSmcw",
  authDomain: "appcalculadoraimc-a9c3e.firebaseapp.com",
  projectId: "appcalculadoraimc-a9c3e",
  storageBucket: "appcalculadoraimc-a9c3e.appspot.com",
  messagingSenderId: "38602839814",
  appId: "1:38602839814:web:5099aa2b7d7c5b74583087",
  measurementId: "G-HLBZR4DXG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);