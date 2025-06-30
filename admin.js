// admin.js
import { db } from './firebase.js';
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const messagesDiv = document.getElementById('messages');

async function fetchMessages() {
  try {
    const q = query(collection(db, "contacts"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      messagesDiv.innerHTML = "<p style='color:white;'>No messages found.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      const time = data.timestamp?.toDate?.() || new Date();

      const div = document.createElement('div');
      div.className = 'message';
      div.innerHTML = `
        <strong>Name:</strong> ${data.name || "N/A"}<br>
        <strong>Email:</strong> ${data.email || "N/A"}<br>
        <strong>Message:</strong><br>${data.message || "N/A"}
        <small><em>${time.toLocaleString()}</em></small>
      `;
      messagesDiv.appendChild(div);
    });
  } catch (error) {
    messagesDiv.innerHTML = `<p style='color:red;'>Error loading messages: ${error.message}</p>`;
  }
}

function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "login.html";
}

if (localStorage.getItem("isAdmin") === "true") {
  fetchMessages();
} else {
  window.location.href = "login.html";
}
