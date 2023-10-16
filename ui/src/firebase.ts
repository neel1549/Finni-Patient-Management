import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyBKctpUpIRthbHmy_UK4W3ONxhPyVMTFZw",
  authDomain: "finni-79a54.firebaseapp.com",
  projectId: "finni-79a54",
  storageBucket: "finni-79a54.appspot.com",
  messagingSenderId: "540864400841",
  appId: "1:540864400841:web:41372cc630b671f2f02c18",
  measurementId: "G-9TCQBKJM3C",
});

export const auth = getAuth(app);
export default app;
