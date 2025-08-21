document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("catalogueContainer");
  container.innerHTML = "<p>Chargement des services...</p>";

  fetch("/.netlify/functions/getservice")
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
