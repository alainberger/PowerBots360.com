// netlify/functions/CreateCheckoutSession.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Méthode non autorisée");
  }

  try {
    const { uid, amount } = JSON.parse(req.body);

    if (!uid) return res.status(400).json({ error: "Utilisateur manquant" });
    if (!amount || amount < 5 || amount > 1000) {
      return res.status(400).json({ error: "Montant invalide" });
    }

    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: { name: "Solde PowerBots360" },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/payment.html`,
      metadata: { uid },
    });

    res.status(200).json({ id: session.id });

  } catch (err) {
    console.error("Erreur création session Stripe :", err);
    res.status(500).json({ error: "Erreur création session Stripe" });
  }
}
