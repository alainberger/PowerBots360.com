// balance.js
// ---------------------------
// Front-end Stripe + solde en temps réel
// ---------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js";

// ----- Configuration Firebase -----
const firebaseConfig = {
  apiKey: "TON_FIREBASE_API_KEY",
  authDomain: "TON_FIREBASE_AUTH_DOMAIN",
  projectId: "TON_FIREBASE_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ----- Utilisateur connecté -----
const uid = "ID_UTILISATEUR"; // remplace par l’ID réel

// ----- Stripe public key -----
const stripe = Stripe("pk_live_51Ry2SYQ95gBUeG1ny4UiJ5z2HfQHqVnwwzuGjsM5SDFubDIHlnVBd1blXjR2dJH2BTTa28PnfDgQFSlDLcbDMDMa00AMd5Aufn");

// ----- Solde en temps réel -----
onSnapshot(doc(db, "users", uid), (docSnap) => {
  const balance = docSnap.data()?.balance || 0;
  document.getElementById("userBalance").innerText = `Solde: ${balance.toFixed(2)} €`;
});

// ----- Paiement avec Stripe (clic sur +) -----
document.querySelector(".add-icon").addEventListener("click", async () => {
  const response = await fetch("/.netlify/functions/CreateCheckoutSession", {
    method: "POST",
    body: JSON.stringify({ uid, amount: 10 }), // exemple 10 €
  });
  const session = await response.json();
  stripe.redirectToCheckout({ sessionId: session.id });
});
