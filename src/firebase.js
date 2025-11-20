// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTaVuK8V16jXIJ_Nde7cuZ0RTHNfWcBnU",
  authDomain: "nathy-98970.firebaseapp.com",
  projectId: "nathy-98970",
  storageBucket: "nathy-98970.firebasestorage.app",
  messagingSenderId: "722916567011",
  appId: "1:722916567011:web:5874714d2f718164fc62d6",
  measurementId: "G-RRRPP1QL27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);   // ← ⚠️ ESTA ES LA INSTANCIA DE AUTH QUE NECESITAS

export { db, auth };
export default app;
