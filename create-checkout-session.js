import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { amount } = req.body; // montant en €
      if (!amount || amount < 5 || amount > 1000) {
        return res.status(400).json({ error: "Montant invalide" });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: { name: "Paiement Powerbots360" },
              unit_amount: Math.round(amount * 100), // en centimes
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/success.html`,
        cancel_url: `${req.headers.origin}/payment.html`,
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur création session Stripe" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Méthode non autorisée");
  }
}
