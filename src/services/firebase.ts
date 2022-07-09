import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBgH3YmojuveFxvam8M_vgiyhTCsgF1D04",
  authDomain: "prueba-de-uso-73fa1.firebaseapp.com",
  projectId: "prueba-de-uso-73fa1",
  storageBucket: "prueba-de-uso-73fa1.appspot.com",
  messagingSenderId: "1094786358640",
  appId: "1:1094786358640:web:24f2f3457c1d28ae9883b5",
  measurementId: "G-LMJRGXZEPG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const realTimeDB = getDatabase(app);
