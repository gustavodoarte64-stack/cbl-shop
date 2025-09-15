<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CBL Shop</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

    body {
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 0;
      background: #f8f9fa;
      color: #333;
    }
    header {
      background: linear-gradient(135deg, #111, #444);
      color: #fff;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
    header h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 600;
      letter-spacing: 2px;
    }
    .container {
      padding: 2rem 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .products {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
    }
    .product {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 1rem;
      text-align: center;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .product:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    }
    .product img {
      max-width: 100%;
      border-radius: 12px;
      margin-bottom: 0.5rem;
    }
    .product h3 {
      margin: 0.5rem 0;
      font-size: 1.1rem;
      font-weight: 600;
    }
    .product p {
      color: #666;
      margin-bottom: 0.5rem;
    }
    .product button {
      background: linear-gradient(135deg, #111, #333);
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.3s;
    }
    .product button:hover {
      background: linear-gradient(135deg, #333, #111);
    }
    #cart {
      position: fixed;
      top: 0;
      right: -400px;
      width: 340px;
      height: 100%;
      background: #fff;
      box-shadow: -2px 0 8px rgba(0,0,0,0.2);
      padding: 1.5rem;
      transition: right 0.3s;
      overflow-y: auto;
      border-radius: 12px 0 0 12px;
    }
    #cart.open {
      right: 0;
    }
    #cart h2 {
      margin-top: 0;
      font-size: 1.4rem;
      font-weight: 600;
    }
    #cart ul {
      list-style: none;
      padding: 0;
    }
    #cart li {
      margin: 0.5rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
    }
    #cart li button {
      background: crimson;
      color: #fff;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.8rem;
    }
    #openCart {
      position: fixed;
      top: 1rem;
      right: 1rem;
      background: linear-gradient(135deg, #111, #333);
      color: #fff;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
    #openCart:hover {
      background: linear-gradient(135deg, #333, #111);
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      margin-top: 1rem;
    }
    form input, form select, form button {
      padding: 0.6rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 0.9rem;
    }
    form button {
      background: linear-gradient(135deg, #111, #333);
      color: #fff;
      border: none;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.3s;
    }
    form button:hover {
      background: linear-gradient(135deg, #333, #111);
    }
    #checkoutSummary {
      background: #f1f1f1;
      border: 1px solid #ddd;
      padding: 0.7rem;
      border-radius: 10px;
      margin-bottom: 1rem;
    }
    #checkoutSummary h4 {
      margin: 0 0 0.5rem 0;
      font-weight: 600;
    }
    #checkoutSummary ul {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 0.9rem;
    }
    #checkoutSummary li {
      margin: 0.25rem 0;
    }
  </style>
</head>
<body>
  <header>
    <h1>CBL - Loja Oficial</h1>
  </header>

  <div class="container">
    <div class="products" id="products"></div>
  </div>

  <button id="openCart">🛒 Carrinho</button>
  <div id="cart">
    <h2>Seu Carrinho</h2>
    <ul id="cartItems"></ul>
    <p><strong>Total:</strong> R$ <span id="total">0.00</span></p>

    <h3>Checkout</h3>
    <div id="checkoutSummary">
      <h4>Resumo da Compra</h4>
      <ul id="summaryItems"></ul>
      <p><strong>Total:</strong> R$ <span id="summaryTotal">0.00</span></p>
    </div>

    <form id="checkoutForm">
      <input type="text" placeholder="Nome Completo" required>
      <input type="text" placeholder="Endereço" required>
      <input type="text" placeholder="Cidade" required>
      <input type="text" placeholder="CEP" required>
      <select required>
        <option value="">Método de Pagamento</option>
        <option value="cartao">Cartão de Crédito</option>
        <option value="pix">PIX</option>
        <option value="boleto">Boleto</option>
      </select>
      <button type="submit">Finalizar Compra</button>
    </form>
    <p id="checkoutMsg" style="color:green; font-weight:bold; display:none;">Compra realizada com sucesso!</p>
  </div>

  <script>
    const products = [
      { id: 1, name: 'Camiseta CBL Preta', price: 99.90, img: 'https://via.placeholder.com/220x220?text=CBL+Preta' },
      { id: 2, name: 'Moletom CBL Branco', price: 199.90, img: 'https://via.placeholder.com/220x220?text=CBL+Moletom' },
      { id: 3, name: 'Boné CBL', price: 79.90, img: 'https://via.placeholder.com/220x220?text=CBL+Boné' },
      { id: 4, name: 'Calça CBL Jeans', price: 249.90, img: 'https://via.placeholder.com/220x220?text=CBL+Calça' },
    ];

    const cart = [];

    function renderProducts() {
      const productsContainer = document.getElementById('products');
      productsContainer.innerHTML = '';
      products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${p.img}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>R$ ${p.price.toFixed(2)}</p>
          <button onclick="addToCart(${p.id})">Adicionar ao Carrinho</button>
        `;
        productsContainer.appendChild(div);
      });
    }

    function addToCart(id) {
      const product = products.find(p => p.id === id);
      cart.push(product);
      renderCart();
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      renderCart();
    }

    function renderCart() {
      const cartItems = document.getElementById('cartItems');
      const total = document.getElementById('total');
      const summaryItems = document.getElementById('summaryItems');
      const summaryTotal = document.getElementById('summaryTotal');

      cartItems.innerHTML = '';
      summaryItems.innerHTML = '';
      let sum = 0;
      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">X</button>`;
        cartItems.appendChild(li);

        const liSummary = document.createElement('li');
        liSummary.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        summaryItems.appendChild(liSummary);

        sum += item.price;
      });
      total.textContent = sum.toFixed(2);
      summaryTotal.textContent = sum.toFixed(2);
    }

    document.getElementById('openCart').addEventListener('click', () => {
      document.getElementById('cart').classList.toggle('open');
    });

    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
      e.preventDefault();
      if(cart.length === 0){
        alert('Seu carrinho está vazio!');
        return;
      }
      document.getElementById('checkoutMsg').style.display = 'block';
      cart.length = 0;
      renderCart();
    });

    renderProducts();
  </script>
</body>
</html>
