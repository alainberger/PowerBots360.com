// firebase-messaging-sw.js

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Config Firebase (remplace par tes infos si nécessaire)
firebase.initializeApp({
  apiKey: "AIzaSyChJoeaMJlj2F-7okhrPJYw868Z1RhgMFY",
  authDomain: "powerbots360-2a163.firebaseapp.com",
  projectId: "powerbots360-2a163",
  storageBucket: "powerbots360-2a163.firebasestorage.app",
  messagingSenderId: "968053928320",
  appId: "1:968053928320:web:c51f7be039c02f2fb69165",
  measurementId: "G-TXSM0JYF1G"
});

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Événement lorsqu'une notification push est reçue
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Notification reçue en arrière-plan ', payload);

  const notificationTitle = payload.notification?.title || 'PowerBots360';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/favicon.ico' // tu peux mettre ton logo
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
