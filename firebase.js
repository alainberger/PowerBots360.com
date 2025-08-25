// Importation Firebase (Web Modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChJoeaMJlj2F-7okhrPJYw868Z1RhgMFY",
  authDomain: "powerbots360-2a163.firebaseapp.com",
  projectId: "powerbots360-2a163",
  storageBucket: "powerbots360-2a163.appspot.com",
  messagingSenderId: "968053928320",
  appId: "1:968053928320:web:c51f7be039c02f2fb69165",
  measurementId: "G-TXSM0JYF1G"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const providerGoogle = new GoogleAuthProvider();

// ------------------ Fonctions ------------------

// Inscription par email/mot de passe
export function registerWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Connexion par email/mot de passe
export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Connexion avec Google + Firestore
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, providerGoogle);
    const user = result.user;

    // Créer ou mettre à jour l'utilisateur dans Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if(!userSnap.exists()){
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        balance: 0
      });
    }
    return user;
  } catch(error) {
    throw error;
  }
}

// Déconnexion
export function logout() {
  return signOut(auth);
}

// Détecter si un utilisateur est connecté
export function onUserStateChanged(callback) {
  return onAuthStateChanged(auth, callback);
}

// Récupérer les infos utilisateur depuis Firestore
export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if(userSnap.exists()) {
    return userSnap.data();
  }
  return null;
}
