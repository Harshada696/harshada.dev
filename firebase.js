// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCqUidpL8DtefXDRYb344veUHCutuuZ1z8",
  authDomain: "harshada-portfolio.firebaseapp.com",
  projectId: "harshada-portfolio",
  storageBucket: "harshada-portfolio.appspot.com",
  messagingSenderId: "356830081783",
  appId: "1:356830081783:web:bdcf9e07e12637cb1e19f2",
  measurementId: "G-7MZHBXNV77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firestore
export { db, collection, addDoc };
