// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDP2cHii-Fem4CjInfVT5NtfssEJ4-sJkQ",
//   authDomain: "nuevoo-f2486.firebaseapp.com",
//   projectId: "nuevoo-f2486",
//   storageBucket: "nuevoo-f2486.firebasestorage.app",
//   messagingSenderId: "1083203394301",
//   appId: "1:1083203394301:web:40e93215d67b7f68693c94",
//   measurementId: "G-0QM3JSWWH0"
// };

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
const db = getFirestore(app)

export default app;
export {db, getAuth};