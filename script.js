import { db, collection, addDoc } from "./firebase.js";

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  try {
    await addDoc(collection(db, "contacts"), {
      name,
      email,
      message,
      timestamp: new Date()
    });
    document.getElementById("response").textContent = "Message sent successfully!";
  } catch (error) {
    console.error("Error adding document: ", error);
    document.getElementById("response").textContent = "Error sending message.";
  }

  document.getElementById("contactForm").reset();
});
