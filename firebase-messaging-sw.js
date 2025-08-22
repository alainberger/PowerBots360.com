import { getMessaging, getToken, onMessage } from "firebase/messaging";

const messaging = getMessaging();
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    getToken(messaging, { vapidKey: "BKYx7j-jNzvr3WKkdskSeh10wJRCyR5m8EoABZQ8amcqCIamABBI9XETgXw2rAhFZ_XCeXoekfa-CtBLGrKRnt4" })
      .then((currentToken) => {
        console.log("Token utilisateur FCM :", currentToken);
        // Ici tu peux sauvegarder ce token pour lui envoyer des notifications
      });
  }
});

// Pour afficher les notifications quand le site est ouvert
onMessage(messaging, (payload) => {
  console.log("Notification reçue :", payload);
});
