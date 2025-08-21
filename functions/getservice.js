// getservice.js
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const API_URL = "https://peakerr.com/api/v2";
  const API_KEY = "57d8b82f0da7f3a6d673e37569fd0603";

  try {
    const response = await fetch(`${API_URL}/services`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Impossible de récupérer les services" })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};