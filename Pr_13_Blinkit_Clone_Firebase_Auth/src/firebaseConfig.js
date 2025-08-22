// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE5SFlRaRXuIgMeCWmAjVTlpsgnbTjbsY",
  authDomain: "blinkitcloudinary.firebaseapp.com",
  projectId: "blinkitcloudinary",
  storageBucket: "blinkitcloudinary.firebasestorage.app",
  messagingSenderId: "110604603607",
  appId: "1:110604603607:web:1ba3b9db2743d30cf02092",
  measurementId: "G-MZQTHNV1V6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
