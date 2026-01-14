import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAaXG4MXqYy-p5k_WUeW67jiUeA28KWojM",
  authDomain: "bpdf-game.firebaseapp.com",
  projectId: "bpdf-game",
  storageBucket: "bpdf-game.firebasestorage.app",
  messagingSenderId: "190667731668",
  appId: "1:190667731668:web:7ee69bed674cd541688141"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore (base de données)
export const db = getFirestore(app);

// Initialiser Authentication
export const auth = getAuth(app);

export default app;
