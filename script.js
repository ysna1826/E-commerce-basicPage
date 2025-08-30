document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 125.99 },
    { id: 2, name: "Product 2", price: 50.99 },
    { id: 3, name: "Product 3", price: 225.99 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptycartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptycartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)}
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });
    } else {
      emptycartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
    }
    totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.getAttribute("data-index");
      removeFromCart(index);
    }
  });

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    saveCart();
    alert("CheckOut Doneeee!!!");
    renderCart();
  });

  renderCart();
});
