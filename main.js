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
export async function ambildaftartugas() {
  const refDokumen = collection(db, "toDolis");
  const kueri = query(refDokumen, orderBy("tugas"));
  const cuplikankueri = await getDocs(kueri);

  let hasil = [];
  cuplikankueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tugas: dok.data().tugas,
      status: dok.data().status,
      prioritas: dok.data().prioritas,
      tanggal: dok.data().tanggal,
    });
  });

  return hasil;
}

export async function tambahtugas(tugas, status, prioritas, tanggal) {
  try {
    const dokRef = await addDoc(collection(db, 'toDolis'), {
      tugas: tugas,
      status: status,
      prioritas: prioritas,
      tanggal: tanggal,
    });
    console.log('berhasil menembah tugas ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah tugas ' + e);
  }
}

export async function hapustugas(docId) {
  await deleteDoc(doc(db, "toDolis", docId));
}

export async function ubahtugas(docId, tugas, status, prioritas, tanggal) {
  await updateDoc(doc(db, "toDolis", docId), {
    tugas: tugas,
    status: status,
    prioritas: prioritas,
    tanggal: tanggal,
  });
}

export async function ambiltugas(docId) {
  const docRef = await doc(db, "toDolis", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}