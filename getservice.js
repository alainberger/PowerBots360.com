// fichier: /api/services.js
export default async function handler(req, res) {
  const API_URL = "https://peakerr.com/api/v2/services";
  const API_KEY = process.env.PEAKERR_API_KEY; // clé cachée dans Vercel

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        key: API_KEY,
        action: "services"
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Impossible de récupérer les services" });
    }

    const data = await response.json();
    return res.status(200).json(data.result || data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
