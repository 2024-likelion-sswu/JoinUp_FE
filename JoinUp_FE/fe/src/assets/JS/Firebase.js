import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOdQ1ckdDfQjzu4DRdB5RCNXB1kwkMgPc",
  authDomain: "joinup-3d757.firebaseapp.com",
  projectId: "joinup-3d757",
  storageBucket: "joinup-3d757.firebasestorage.app",
  messagingSenderId: "653813238234",
  appId: "1:653813238234:web:e5a1ca6ada59e0fb6a58e3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);