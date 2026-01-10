import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- PEGA AQUÍ TUS DATOS DE FIREBASE (SIN DUPLICAR) ---
const firebaseConfig = {
  apiKey: "AIzaSyB4wT_SGsY1CzvCm8L762Q-l-7urUoSzvk",
  authDomain: "aliiatech-store.firebaseapp.com",
  projectId: "aliiatech-store",
  storageBucket: "aliiatech-store.firebasestorage.app",
  messagingSenderId: "573069790318",
  appId: "1:573069790318:web:e09fa0636d4133128d6a7f"
};

// Inicializamos Firebase (SOLO UNA VEZ)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);