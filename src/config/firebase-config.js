import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "expense-tracker-f526d.firebaseapp.com",
  projectId: "expense-tracker-f526d",
  storageBucket: "expense-tracker-f526d.appspot.com",
  messagingSenderId: "131629069854",
  appId: "1:131629069854:web:f2da1c052fc6a1f23aa00f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);


