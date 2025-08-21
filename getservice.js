const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const API_URL = "https://peakerr.com/api/v2/services";
  const API_KEY = "b6fae1f3000b560878309083ccb55881"; // ta clé principale

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
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Impossible de récupérer les services" })
      };
    }

    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data.result || data) };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
