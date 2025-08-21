// api.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("catalogueContainer");
  container.innerHTML = "<p>Chargement des services...</p>";

  const API_URL = "https://peakerr.com/api/v2";
  const API_KEY = "291b260968a60817fc67dc13210dc5a9";

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY
    },
    body: JSON.stringify({ action: "get_services" })
  })
    .then(response => response.json())
    .then(data => {
      container.innerHTML = ""; // Vide le conteneur

      if (!data || !data.data || data.data.length === 0) {
        container.innerHTML = "<p>Aucun service disponible pour le moment.</p>";
        return;
      }

      data.data.forEach(service => {
        const item = document.createElement("div");
        item.className = "catalogue-item";
        item.innerHTML = `
          <h3>${service.name || "Service"}</h3>
          <p><strong>ID :</strong> ${service.service || "-"}</p>
          <p><strong>Min:</strong> ${service.min || "-"} • <strong>Max:</strong> ${service.max || "-"}</p>
          <p><strong>Rate (USD):</strong> ${service.rate || "-"}</p>
        `;
        container.appendChild(item);
      });
    })
    .catch(err => {
      console.error("Erreur chargement services :", err);
      container.innerHTML = "<p>Erreur lors du chargement des services.</p>";
    });
});
