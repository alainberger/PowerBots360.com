// api.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("catalogueContainer");
  container.innerHTML = "<p>Chargement des services...</p>";

  const API_URL = "https://peakerr.com/api/v2";
  const API_KEY = "291b260968a60817fc67dc13210dc5a9";

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      key: API_KEY,
      action: "services"   // ⚠️ chez Peakerr c’est "services" et pas "get_services"
    })
  })
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      if (!data || data.length === 0) {
        container.innerHTML = "<p>Aucun service disponible.</p>";
        return;
      }

      data.forEach(service => {
        const item = document.createElement("div");
        item.className = "catalogue-item";
        item.innerHTML = `
          <h3>${service.name}</h3>
          <p><strong>ID :</strong> ${service.service}</p>
          <p><strong>Min:</strong> ${service.min} • <strong>Max:</strong> ${service.max}</p>
          <p><strong>Tarif :</strong> ${service.rate} USD</p>
        `;
        container.appendChild(item);
      });
    })
    .catch(err => {
      console.error("Erreur API :", err);
      container.innerHTML = "<p>Impossible de charger les services (erreur API).</p>";
    });
});
