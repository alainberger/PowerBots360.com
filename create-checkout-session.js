<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Powerbots360</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<script src="https://js.stripe.com/v3/"></script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; width: 100%; font-family: 'Poppins', sans-serif; }
  body { background: linear-gradient(135deg, #A8D5BA 0%, #D1E8FF 100%); color: #043233; }

  .navbar {
    position: fixed; top: 0; left: 0; width: 100%;
    display: flex; align-items: center; gap: 12px; padding: 12px 18px;
    background: linear-gradient(135deg, #A8D5BA, #D1E8FF);
    border: none; box-shadow: none; z-index: 1000;
  }
  .navbar img { height: 40px; cursor: pointer; }
  .brand { font-weight: 700; font-size: 1.05rem; color: #043233; cursor: pointer; }

  main {
    max-width: 600px; margin: 0 auto; padding: 120px 20px 40px; text-align: center;
  }

  .btn-catalogue {
    background: linear-gradient(135deg, #A8D5BA, #D1E8FF);
    color: #043233; padding: 12px 25px; font-weight: 600; border-radius: 6px;
    text-decoration: none; display: inline-block; margin-bottom: 20px; transition: background 0.3s;
  }
  .btn-catalogue:hover { background: linear-gradient(135deg, #B0E0C2, #E0F0FF); }

  #payment-form { 
    background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    text-align: left; margin-top: 20px;
  }
  #payment-form input, #payment-form select { width: 100%; padding: 10px; margin-bottom: 15px; border-radius: 6px; border: 1px solid #ccc; }
  #payment-form button { background: #043233; color: #fff; padding: 12px; border: none; border-radius: 6px; width: 100%; cursor: pointer; font-weight: 600; }
  #payment-form button:hover { background: #03504b; }
  #message { color: red; font-weight: 600; margin-top: 10px; text-align: center; }
</style>
</head>
<body>

<header class="navbar">
  <img src="https://i.postimg.cc/vZrnmPXd/IMG-3286.png" alt="Powerbots360 logo" onclick="window.location.href='index.html'">
  <div class="brand" onclick="window.location.href='index.html'">Powerbots360</div>
</header>

<main>
  <a href="javascript:void(0)" class="btn-catalogue" onclick="history.back()">Retour</a>

  <form id="payment-form">
    <label for="amount">Montant en € (entre 5€ et 1000€)</label>
    <input type="number" id="amount" min="5" max="1000" placeholder="Ex: 50" required>

    <label for="currency">Devise</label>
    <select id="currency" required>
      <option value="eur">Euro (€)</option>
      <option value="usd">Dollar ($)</option>
      <option value="gbp">Livre sterling (£)</option>
      <option value="chf">Franc suisse (CHF)</option>
      <option value="jpy">Yen (¥)</option>
      <option value="cad">Dollar canadien (CAD)</option>
      <option value="aud">Dollar australien (AUD)</option>
      <option value="nzd">Dollar néo-zélandais (NZD)</option>
      <option value="sek">Couronne suédoise (SEK)</option>
      <option value="nok">Couronne norvégienne (NOK)</option>
      <option value="dkk">Couronne danoise (DKK)</option>
      <option value="sgd">Dollar de Singapour (SGD)</option>
      <option value="hkd">Dollar de Hong Kong (HKD)</option>
      <option value="try">Livre turque (TRY)</option>
      <option value="mxn">Peso mexicain (MXN)</option>
      <option value="inr">Roupie indienne (INR)</option>
      <option value="brl">Real brésilien (BRL)</option>
      <option value="zar">Rand sud-africain (ZAR)</option>
    </select>

    <button type="submit">Payer maintenant</button>
    <div id="message"></div>
  </form>
</main>

<script>
  const stripe = Stripe('pk_test_51Ry2SiLdXU1sBVYA9ketWjZqigzoKj0hQ2EsB2JdcwXRoc1vucKsOqnt3385oAFXTXWHUA5FgSxpMeXx1lZcUqBb00nsrZKDN0');

  const form = document.getElementById('payment-form');
  const amountInput = document.getElementById('amount');
  const currencySelect = document.getElementById('currency');
  const message = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);
    const currency = currencySelect.value;

    if (amount < 5 || amount > 1000) {
      message.textContent = "Le montant doit être compris entre 5€ et 1000€";
      return;
    }

    message.textContent = "Redirection vers le paiement...";

    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency })
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        message.textContent = result.error.message;
      }
    } catch (err) {
      message.textContent = "Erreur serveur, réessayez plus tard.";
    }
  });
</script>

</body>
</html>
