<div class="user-card">
  <span id="userID">ID: 12345</span>
  <span id="userStatus">En ligne</span>
  <span id="userBalance">Solde: 0 €</span>
  <img src="plus-icon.png" alt="Ajouter" class="add-icon">
</div>

<script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js"></script>
<script src="https://js.stripe.com/v3/"></script>

<script>
// Firebase config
const firebaseConfig = {
  apiKey: "TON_FIREBASE_API_KEY",
  authDomain: "TON_FIREBASE_AUTH_DOMAIN",
  projectId: "TON_FIREBASE_PROJECT_ID",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ID utilisateur connecté
const uid = "ID_UTILISATEUR";

// Clé publique Stripe
const stripe = Stripe("pk_live_51Ry2SYQ95gBUeG1ny4UiJ5z2HfQHqVnwwzuGjsM5SDFubDIHlnVBd1blXjR2dJH2BTTa28PnfDgQFSlDLcbDMDMa00AMd5Aufn");

// Solde en temps réel
db.collection("users").doc(uid)
  .onSnapshot(doc => {
    const balance = doc.data()?.balance || 0;
    document.getElementById("userBalance").innerText = `Solde: ${balance.toFixed(2)} €`;
  });

// Clic sur + pour ajouter solde via Stripe
document.querySelector(".add-icon").addEventListener("click", async () => {
  const response = await fetch("/.netlify/functions/CreateCheckoutSession", {
    method: "POST",
    body: JSON.stringify({ uid, amount: 10 })
  });
  const session = await response.json();
  stripe.redirectToCheckout({ sessionId: session.id });
});
</script>
