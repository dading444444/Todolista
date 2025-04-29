import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js ";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBbJDnmlNa2wObKWmQ6MLuXQ5KWbp0FDEA",
  authDomain: "insan-cemerlang-8011b.firebaseapp.com",
  projectId: "insan-cemerlang-8011b",
  storageBucket: "insan-cemerlang-8011b.firebasestorage.app",
  messagingSenderId: "642542638808",
  appId: "1:642542638808:web:8dae3c0d85e3be8c5c29ad"
};


// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaptar() {
  const refDokumen = collection(db, "toDOList");
  const kueri = query(refDokumen, orderBy("toDOList"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id, 
      tugas: dok.data().tugas,
      prioritas: dok.data().prioritas,
      status: dok.data().status,
      tanggal: dok.data().tanggal
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahtoDOList(tugas, prioritas, status, tanggal) {
  try {
    const dokRef = await addDoc(collection(db, 'toDOList'), {
      tugas:  tugas,
      prioritas: prioritas,
      status: status,
      tanggal: tanggal
    });
    console.log('Berhasil menambah toDOList' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah toDOList' + e);
  }
}

export async function hapustoDOList(docId) {
  await deleteDoc(doc(db, "toDOList", docId));
}

export async function ubahtoDOList(docId, tugas, prioritas, status, tanggal) {
  await updateDoc(doc(db, "toDOList", docId),{
    tugas: tugas,
    prioritas: prioritas,
    status: status,
    tanggal: tanggal
  });
}

export async function ambiltoDOList(docId) {
  const docRef = await doc(db, "toDOList", docId)
}