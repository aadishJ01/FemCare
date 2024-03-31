// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEExM4CPMXu7ha0rABD9TelbscRusEZvA",
  authDomain: "femcare-fb8f3.firebaseapp.com",
  projectId: "femcare-fb8f3",
  storageBucket: "femcare-fb8f3.appspot.com",
  messagingSenderId: "100224898523",
  appId: "1:100224898523:web:c22f7f2580668d0d1303fe",
  measurementId: "G-Q9KYC6N3E6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };