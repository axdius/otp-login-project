// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyVRb8UbP_sCxZ4jCVniG2iUL0V1Hku_8",
  authDomain: "my-first-pro-8c792.firebaseapp.com",
  projectId: "my-first-pro-8c792",
  storageBucket: "my-first-pro-8c792.appspot.com",
  messagingSenderId: "504610802310",
  appId: "1:504610802310:web:ee3317b4bf048bf7e51f07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

