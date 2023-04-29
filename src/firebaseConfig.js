import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, RecaptchaVerifier } from 'firebase/auth';
// import { signOut } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDpMGW-rlLwIuOXzc_e5JN-seXAVbzExio",
    authDomain: "jarvis-bd73d.firebaseapp.com",
    projectId: "jarvis-bd73d",
    storageBucket: "jarvis-bd73d.appspot.com",
    messagingSenderId: "765127146996",
    appId: "1:765127146996:web:9d6b8d940c55f0decc8da1",
    measurementId: "G-YW50D3LDPG"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const analytics = getAnalytics(app);

  export {auth, onAuthStateChanged, signOut, signInWithEmailAndPassword, RecaptchaVerifier};