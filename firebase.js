// /assets/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// --- Config Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyChJoeaMJlj2F-7okhrPJYw868Z1RhgMFY",
  authDomain: "powerbots360-2a163.firebaseapp.com",
  projectId: "powerbots360-2a163",
  storageBucket: "powerbots360-2a163.appspot.com",
  messagingSenderId: "968053928320",
  appId: "1:968053928320:web:c51f7be039c02f2fb69165"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged, signOut, doc, onSnapshot };
