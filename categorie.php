<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Powerbots360 - Catégorie</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; width: 100%; font-family: 'Poppins', sans-serif; }
  
  /* Dégradé global uniforme sur toute la page */
  body {
    background: linear-gradient(135deg, #A8D5BA 0%, #D1E8FF 100%);
    color: #043233;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .navbar {
    position: fixed; top:0; left:0; width:100%;
    display:flex; align-items:center; gap:12px; padding:10px 15px;
    background: linear-gradient(135deg, #A8D5BA 0%, #D1E8FF 100%);
    border:none; box-shadow:none; z-index:1000;
  }
  .navbar img { height: 35px; }
  .brand { font-weight: 700; font-size: 1rem; color: #043233; }

  main {
    max-width:800px; /* largeur resserrée */
    margin:0 auto;
    padding:100px 15px 30px; /* paddings réduits */
    flex:1; display:flex; flex-direction:column; align-items:center;
    background: linear-gradient(135deg, #A8D5BA 0%, #D1E8FF 100%);
    width: 100%;
  }

  /* Styles des boutons et selects */
  .btn-catalogue, select, button {
    background: linear-gradient(135deg, #A8D5BA 0%, #D1E8FF 100%);
    color:#043233;
    padding:10px 20px; /* un peu plus petit pour resserrer */
    font-weight:600;
    border-radius:6px;
    border:none;
    text-decoration:none;
    display:inline-block;
    margin:8px 5px; /* marges réduites */
    cursor:pointer;
    transition:0.3s;
    font-family:'Poppins', sans-serif;
    font-size:13px; /* taille de police légèrement réduite */
  }
  .btn-catalogue:hover, select:hover, button:hover {
    background: linear-gradient(135deg, #B0E0C2 0%, #E0F0FF 100%);
  }

  form {
    margin-top:20px; width:100%; max-width:600px;
    display:flex; flex-direction:column; align-items:center;
  }
  input[type="text"], input[type="number"] {
    width:100%; padding:8px; margin:8px 0; /* plus compact */
    border-radius:6px; border:1px solid #ccc;
    font-family:'Poppins',sans-serif; font-size:13px; color:#043233;
  }

  h2 {
    font-family:'Poppins',sans-serif;
    font-weight:700;
    color:#043233;
    margin-bottom:15px;
    text-align:center;
  }

  #checkResult { margin-top:10px; font-weight:600; color:#043233; }
</style>
</head>
<body>

<header class="navbar">
  <img src="https://i.postimg.cc/vZrnmPXd/IMG-3286.png" alt="Powerbots360 logo">
  <div class="brand">Powerbots360</div>
</header>

<main>
  <a href="javascript:void(0)" class="btn-catalogue" onclick="history.back()">Retour</a>

  <form id="orderForm" method="POST">
    <h2>Commander un service SMM</h2>
    <input type="text" name="link" placeholder="Lien profil ou page" required>
    <input type="number" name="quantity" placeholder="Quantité" required>

    <!-- Select Catégorie -->
    <select id="category" required>
      <option value="">Choisir une Catégorie</option>
      <?php
      $api_url = "https://peakerr.com/api/v2";
      $api_key = "3e06752c01733d248951c901b1811716";

      $postdata = http_build_query(['key'=>$api_key,'action'=>'services']);
      $opts = ['http'=>['method'=>'POST','header'=>'Content-type: application/x-www-form-urlencoded','content'=>$postdata]];
      $context = stream_context_create($opts);
      $services = json_decode(file_get_contents($api_url,false,$context), true);

      $platforms = [];
      if($services && is_array($services)){
          foreach($services as $s){
              if(!in_array($s['category'], $platforms)){
                  $platforms[] = $s['category'];
                  echo '<option value="'.$s['category'].'">'.$s['category'].'</option>';
              }
          }
      }
      ?>
    </select>

    <!-- Select Service -->
    <select id="service" name="service" required>
      <option value="">Choisir un service</option>
    </select>

    <button type="submit">Commander</button>
  </form>

  <form id="checkForm" method="POST" onsubmit="return checkOrder(event)">
    <h2>Vérifier votre commande</h2>
    <input type="text" name="order_id" placeholder="ID de la commande" required>
    <button type="submit">Vérifier</button>
    <div id="checkResult"></div>
  </form>
</main>

<script>
const allServices = <?php echo json_encode($services); ?>;
const categorySelect = document.getElementById('category');
const serviceSelect = document.getElementById('service');

categorySelect.addEventListener('change', function(){
    const selectedCategory = this.value;
    serviceSelect.innerHTML = '<option value="">Choisir un service</option>';
    allServices.forEach(s => {
        if(s.category === selectedCategory){
            const opt = document.createElement('option');
            opt.value = s.service;
            opt.textContent = `${s.name} (Min: ${s.rate} USD, Max: ${s.max} USD)`;
            serviceSelect.appendChild(opt);
        }
    });
});

// Vérification commande directement sur la page
function checkOrder(e){
  e.preventDefault();
  const orderId = e.target.order_id.value;
  const resultDiv = document.getElementById('checkResult');
  resultDiv.textContent = `Résultat de la commande ${orderId}: En cours / Livrée / Échec`;
  return false;
}
</script>

</body>
</html>
