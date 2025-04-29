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
  apiKey: "AIzaSyAZZzmOl8wJa2420wAoSMfDVTEKxj6tEqk",
  authDomain: "aldi-eb45b.firebaseapp.com",
  projectId: "aldi-eb45b",
  storageBucket: "aldi-eb45b.firebasestorage.app",
  messagingSenderId: "74072339126",
  appId: "1:74072339126:web:37a27a2f60108fbe9f6c17",
  measurementId: "G-SXG0MRRXS6"
};


// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaftartugas() {
  const refDokumen = collection(db, "toDOList");
  const kueri = query(refDokumen, orderBy("tugas"));
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

export async function tambahtugas(tugas, prioritas, status, tanggal) {
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



 export async function ubahtugas(docId, tugas, prioritas, status, tanggal) {
  await updateDoc(doc(db, "toDOList", docId),{
    tugas: tugas,
    prioritas: prioritas,
    status: status,
    tanggal: tanggal
  });
}

export async function ambiltugas(docId) {
  const docRef = await doc(db, "toDOList", docId)
}
export async function hapustugas(docId) {
  await deleteDoc(doc(db, "toDOList", docId));
}
// Event listener untuk ubah tugas
$(".ubah").click(async function() {
  window.location.replace("ubahNama.html?docId=" + $(this).attr("data-id"));
});
// Event listener untuk ubah tugas
$(".ubah").click(async function () {
  window.location.replace("ubahtugas.html?docId=" + $(this).attr("data-id"));
});

// Gunakan event delegation agar berfungsi pada elemen dinamis
$(document).on("click", ".btn-status", function () {
  let tugasId = $(this).attr("data-id");
  let statusSekarang = $(this).attr("data-status");
  let statusBaru;

  if (statusSekarang === "Belum Selesai") {
    statusBaru = "Sedang Dikerjakan";
  } else if (statusSekarang === "Sedang Dikerjakan") {
    statusBaru = "Selesai";
  } else {
    statusBaru = "Belum Selesai";
  }

  // Update tampilan tombol
  $(this).attr("data-status", statusBaru);
  $(this).text(statusBaru);
  updateWarnaStatus($(this), statusBaru);

  // Tambahkan kode AJAX jika ingin menyimpan perubahan status ke database
  console.log(`Status tugas ID ${tugasId} diubah menjadi ${statusBaru}`);
});

// Fungsi untuk memperbarui warna tombol berdasarkan status
function updateWarnaStatus(button, status) {
  if (status === "Belum Selesai") {
    button.css("background-color", "#dc3545").css("color", "white");
  } else if (status === "Sedang Dikerjakan") {
    button.css("background-color", "#ffc107").css("color", "black");
  } else {
    button.css("background-color", "#28a745").css("color", "white");
  }
}

// Atur warna status setelah halaman dimuat
$(document).ready(function () {
  $(".btn-status").each(function () {
    updateWarnaStatus($(this), $(this).attr("data-status"));
  });
});