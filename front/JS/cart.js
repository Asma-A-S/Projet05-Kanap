let cartPanier = JSON.parse(localStorage.getItem("cart"));
if (!cartPanier) {
  console.log("Oups c'est vide");
}
function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function (response) {
      return response.json()
    })
    .then(function (product) {
      return product
    })
    .catch(function (error) {
      alert(error);
    })
}
/*var cartPanierJson = JSON.parse(cartPanier);*/
/*console.log(cartPanierJSON)*/
(async function () {
  let totalQuantity = 0;
  let totalPrice = 0;
  for (product of cartPanier) {
    const article = await getProduct(product.Id)
    totalQuantity += product.quantity
    totalPrice += (product.quantity * article.price)
    console.log(article)
    displayProduct(article)
  }
  document.getElementById("totalQuantity").innerHTML = totalQuantity;
  document.getElementById("totalPrice").innerHTML = totalPrice
})()
function displayProduct(article) {
  document.getElementById("cart__items").innerHTML += `
<article class="cart__item" data-id="${product.Id}" data-color="${product.color}">
  <div class="cart__item__img">
  <img src="${article.imageUrl}" alt="${article.altTxt}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${article.name}</h2>
    <p>${product.color}</p>
    <p>${article.price} &euro;</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`;
}

/*supprimer un article*/