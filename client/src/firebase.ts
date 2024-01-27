// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-4daa4.firebaseapp.com",
  projectId: "blog-4daa4",
  storageBucket: "blog-4daa4.appspot.com",
  messagingSenderId: "261004905096",
  appId: "1:261004905096:web:c5bf50c2913c87bf756d3d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
