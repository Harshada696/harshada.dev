// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqUidpL8DtefXDRYb344veUHCutuuZ1z8",
  authDomain: "harshada-portfolio.firebaseapp.com",
  projectId: "harshada-portfolio",
  storageBucket: "harshada-portfolio.appspot.com",
  messagingSenderId: "356830081783",
  appId: "1:356830081783:web:bdcf9e07e12637cb1e19f2",
  measurementId: "G-7MZHBXNV77"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Restrict access if not logged in
if (localStorage.getItem("isAdmin") !== "true") {
  alert("Unauthorized. Please login.");
  window.location.href = "login.html";
}

async function fetchMessages() {
  const querySnapshot = await getDocs(collection(db, "contacts"));
  const container = document.getElementById("messages");

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `
      <strong>Name:</strong> ${data.name}<br>
      <strong>Email:</strong> ${data.email}<br>
      <strong>Message:</strong> ${data.message}<br>
      <small><em>${new Date(data.timestamp?.toDate?.() || data.timestamp).toLocaleString()}</em></small>
    `;
    container.appendChild(div);
  });
}

fetchMessages();

window.logout = () => {
  localStorage.removeItem("isAdmin");
  window.location.href = "login.html";
};
