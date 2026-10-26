// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "preppilot-ai-62514.firebaseapp.com",
  projectId: "preppilot-ai-62514",
  storageBucket: "preppilot-ai-62514.firebasestorage.app",
  messagingSenderId: "264811944367",
  appId: "1:264811944367:web:87a321de571f682d5fb75a"
};

// Initialize Firebase
// connect your application iwth firebase project 
// app is a refernce of that initialized firebase app
const app = initializeApp(firebaseConfig);

 // enale authentication in app
 // getAuth() - it allow to access authenthicatoion system of firebase
 const auth = getAuth(app);

 //configure google as a login provider, bcz firebase  support other login provider also
 const provider = new GoogleAuthProvider()

 export {auth, provider} 
