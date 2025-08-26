// ------------------ Importation Firebase (Web Modular) ------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ------------------ Configuration Firebase ------------------
const firebaseConfig = {
  apiKey: "AIzaSyChJoeaMJlj2F-7okhrPJYw868Z1RhgMFY",
  authDomain: "powerbots360-2a163.firebaseapp.com",
  projectId: "powerbots360-2a163",
  storageBucket: "powerbots360-2a163.appspot.com",
  messagingSenderId: "968053928320",
  appId: "1:968053928320:web:c51f7be039c02f2fb69165",
  measurementId: "G-TXSM0JYF1G"
};

// ------------------ Initialisation ------------------
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const providerGoogle = new GoogleAuthProvider();

// ------------------ Fonctions ------------------

/**
 * Inscription par email/mot de passe (+ Firestore + pseudo optionnel)
 */
export async function registerWithEmail(email, password, pseudo = "") {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCred.user;

  // Ajouter un pseudo au profil si fourni
  if (pseudo) {
    await updateProfile(user, { displayName: pseudo });
  }

  // Créer le doc utilisateur dans Firestore
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || pseudo || "",
    balance: 0
  });

  return user;
}

/**
 * Connexion par email/mot de passe
 */
export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Connexion avec Google (+ création Firestore si nouveau)
 */
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, providerGoogle);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        balance: 0
      });
    }

    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * Déconnexion
 */
export function logout() {
  return signOut(auth);
}

/**
 * Observer l'état de connexion (Firebase Auth)
 */
export function onUserStateChanged(callback) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Récupérer une seule fois les infos utilisateur (Firestore)
 */
export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  }
  return null;
}

/**
 * Écouter en temps réel les infos utilisateur (Firestore)
 */
export function listenUserData(uid, callback) {
  const userRef = doc(db, "users", uid);
  return onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  });
}
