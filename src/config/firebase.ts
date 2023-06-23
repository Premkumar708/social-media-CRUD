// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHlAguag56OX1t4Tt2FOwWV9HVFoJayQk",
  authDomain: "kvm-pro.firebaseapp.com",
  projectId: "kvm-pro",
  storageBucket: "kvm-pro.appspot.com",
  messagingSenderId: "863877803424",
  appId: "1:863877803424:web:270019dbd73e5bfb6688c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)