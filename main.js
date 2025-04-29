import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZZzmOl8wJa2420wAoSMfDVTEKxj6tEqk",
  authDomain: "aldi-eb45b.firebaseapp.com",
  projectId: "aldi-eb45b",
  storageBucket: "aldi-eb45b.firebasestorage.app",
  messagingSenderId: "74072339126",
  appId: "1:74072339126:web:37a27a2f60108fbe9f6c17",
  measurementId: "G-SXG0MRRXS6"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);