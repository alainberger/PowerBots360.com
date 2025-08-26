// balance.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js";

// ----- Firebase config -----
const firebaseConfig = {
  apiKey: "TON_FIREBASE_API_KEY",
  authDomain: "TON_FIREBASE_AUTH_DOMAIN",
  projectId: "TON_FIREBASE_PROJECT_ID",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ----- Stripe clé publique -----
const stripe = Stripe("pk_live_51Ry2SYQ95gBUeG1ny4UiJ5z2HfQHqVnwwzuGjsM5SDFubDIHlnVBd1blXjR2dJH2BTTa28PnfDgQFSlDLcbDMDMa00AMd5Aufn");

// ----- Récupérer l'utilisateur connecté -----
const uid = window.currentUserId; // ou récupérer dynamiquement depuis ton auth JS

// ----- Solde en temps réel -----
if(uid){
  onSnapshot(doc(db, "users", uid), (docSnap) => {
    const balance = docSnap.data()?.balance || 0;
    const balanceEl = document.getElementById("userBalance");
    if(balanceEl) balanceEl.textContent = balance.toFixed(2) + " €";
  });
}

// ----- Paiement Stripe -----
const addIcon = document.querySelector(".add-icon");
if(addIcon){
  addIcon.addEventListener("click", async ()=>{
    const response = await fetch("/.netlify/functions/CreateCheckoutSession", {
      method: "POST",
      body: JSON.stringify({ uid, amount: 10 }) // exemple montant 10€
    });
    const session = await response.json();
    stripe.redirectToCheckout({ sessionId: session.id });
  });
}
