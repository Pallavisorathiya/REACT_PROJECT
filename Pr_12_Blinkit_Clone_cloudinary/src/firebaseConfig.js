// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCF9VsXmTXyU-GbrYnBGS5NOkCSws1snK4",
//   authDomain: "blinkit-c9881.firebaseapp.com",
//   projectId: "blinkit-c9881",
//   storageBucket: "blinkit-c9881.firebasestorage.app",
//   messagingSenderId: "222463970027",
//   appId: "1:222463970027:web:0d3e44f54df5d90ae20cae",
//   measurementId: "G-7WEYCCRQ5X"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Analytics (optional, only works in browser)
// const analytics = getAnalytics(app);

// // Initialize Firestore
// export const db = getFirestore(app);



import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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

