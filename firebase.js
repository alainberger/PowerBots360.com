// Importation Firebase (version Web Modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Ta configuration Firebase (copiée de la console)
const firebaseConfig = {
  apiKey: "AIzaSyChJoeaMJlj2F-7okhrPJYw868Z1RhgMFY",
  authDomain: "powerbots360-2a163.firebaseapp.com",
  projectId: "powerbots360-2a163",
  storageBucket: "powerbots360-2a163.appspot.com",
  messagingSenderId: "968053928320",
  appId: "1:968053928320:web:c51f7be039c02f2fb69165",
  measurementId: "G-TXSM0JYF1G"
};

// Initialisation
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Provider Google
export const providerGoogle = new GoogleAuthProvider();

// Fonctions utiles ---------------------------

// Inscription par email/mot de passe
export function registerWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Connexion par email/mot de passe
export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Connexion avec Google
export function loginWithGoogle() {
  return signInWithPopup(auth, providerGoogle);
}

// Déconnexion
export function logout() {
  return signOut(auth);
}

// Détecter si un utilisateur est connecté
export function onUserStateChanged(callback) {
  return onAuthStateChanged(auth, callback);
}
