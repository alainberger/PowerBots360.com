// /assets/ui.js
import { auth, db, onAuthStateChanged, signOut, doc, onSnapshot } from "./firebase.js";

// --- DOM ---
const toggleBtn = document.getElementById('toggleBtn');
const idCard = document.getElementById('idCard');
const userNameEl = document.getElementById('userName');
const userBalanceEl = document.getElementById('userBalance');
const statusDot = document.getElementById('statusDot');
const userStatusEl = document.getElementById('userStatus');
const loginBtn = document.getElementById('loginBtn');
const catalogBtn = document.getElementById('catalogBtn');
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

// --- Toggle ID Card ---
toggleBtn?.addEventListener('click', ()=>{
  idCard.classList.toggle('open');
  toggleBtn.textContent = idCard.classList.contains('open') ? '×' : '+';
});

// --- Toggle Hamburger Menu ---
hamburger?.addEventListener('click', ()=>{
  menu.classList.toggle('open');
});

// --- Catalogue ---
catalogBtn?.addEventListener('click', ()=> window.location.href='catalogue.html');

// --- Auth UI ---
let unsubscribeBalance = null;

function setOfflineUI() {
  userNameEl.textContent = "---";
  userStatusEl.textContent = "Hors ligne";
  statusDot.classList.remove('online');
  userBalanceEl.textContent = "0 €";
  loginBtn.textContent = "Se connecter";
  loginBtn.onclick = ()=> window.location.href="connexion.html";
  if(unsubscribeBalance) unsubscribeBalance();
  unsubscribeBalance = null;
}

function setOnlineUI(user, balance=0) {
  userNameEl.textContent = user.displayName || user.email;
  userStatusEl.textContent = "En ligne";
  statusDot.classList.add('online');
  userBalanceEl.textContent = balance + " €";
  loginBtn.textContent = "Se déconnecter";
  loginBtn.onclick = async ()=>{
    await signOut(auth);
    setOfflineUI();
  };
}

// --- Listener Auth (temps réel) ---
onAuthStateChanged(auth, async (user)=>{
  if(user){
    console.log("Utilisateur connecté :", user.email); // test debug
    const balanceDocRef = doc(db,"users",user.uid);
    unsubscribeBalance = onSnapshot(balanceDocRef,(docSnap)=>{
      let balance = 0;
      if(docSnap.exists()) balance = docSnap.data().balance || 0;
      setOnlineUI(user, balance);
    }, err => {
      console.error("Erreur Firestore :", err);
    });
  }else{
    console.log("Utilisateur hors ligne");
    setOfflineUI();
  }
});
