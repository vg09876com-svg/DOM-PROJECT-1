// script.js — Shopping Cart 

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".list-products");
  const totalDisplay = document.querySelector(".total");

  // Recalculate and display the total price across all remaining products
  function updateTotal() {
    let total = 0;

    // scope > .card-body" = only the direct product wrappers,
    // not the nested Bootstrap .card-body divs inside each card
    const products = productList.querySelectorAll(":scope > .card-body");

    products.forEach((product) => {
      const unitPriceText = product.querySelector(".unit-price").textContent;
      const price = parseFloat(unitPriceText); // "100 $" -> 100
      const quantity = parseInt(product.querySelector(".quantity").textContent, 10);
      total += price * quantity;
    });

    totalDisplay.textContent = `${total} $`;
  }

  // Wire up all interactions for a single product card
  function setupProduct(product) {
    const plusBtn = product.querySelector(".fa-plus-circle");
    const minusBtn = product.querySelector(".fa-minus-circle");
    const quantitySpan = product.querySelector(".quantity");
    const trashBtn = product.querySelector(".fa-trash-alt");
    const heartBtn = product.querySelector(".fa-heart");

    // Increase quantity
    plusBtn.addEventListener("click", () => {
      const currentQty = parseInt(quantitySpan.textContent, 10);
      quantitySpan.textContent = currentQty + 1;
      updateTotal();
    });

    // Decrease quantity (never below 0)
    minusBtn.addEventListener("click", () => {
      const currentQty = parseInt(quantitySpan.textContent, 10);
      if (currentQty > 0) {
        quantitySpan.textContent = currentQty - 1;
        updateTotal();
      }
    });

    // Delete the entire product card from the cart
    trashBtn.addEventListener("click", () => {
      product.remove();
      updateTotal();
    });

    // Toggle "liked" state on the heart icon (color handled in CSS via .liked)
    heartBtn.addEventListener("click", () => {
      heartBtn.classList.toggle("liked");
    });
  }

  // Initialize every product currently in the cart
  const products = productList.querySelectorAll(":scope > .card-body");
  products.forEach(setupProduct);

  // Set the initial total (0 $, since all quantities start at 0)
  updateTotal();
});