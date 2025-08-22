import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Ry2SiLdXU1sBVYA...', {
  apiVersion: '2023-08-16',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { cart } = req.body; // tableau d'objets {name, price}

      const line_items = cart.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: { name: item.name },
          unit_amount: Math.round(parseFloat(item.price) * 100),
        },
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/success.html`,
        cancel_url: `${req.headers.origin}/categorie.html`,
      });

      res.status(200).json({ url: session.url });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur création session Stripe' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Méthode non autorisée');
  }
}
