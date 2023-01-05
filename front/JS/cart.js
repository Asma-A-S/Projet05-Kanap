let cartPanier = JSON.parse(localStorage.getItem("cart"));
if (!cartPanier) {
  console.log("Oups c'est vide");
}
function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (product) {
      return product;
    })
    .catch(function (error) {
      alert(error);
    });
}
/*var cartPanierJson = JSON.parse(cartPanier);*/
/*console.log(cartPanierJSON)*/
(async function() {
  for(product of cartPanier) {
    const item = await getProduct(product.Id);
    displayProduct(item);
    editProduct();
    deleteProduct();
    totalQuantityPrice(item);
  }
})()
/*création de la balise article*/
function displayProduct(item){
//création de la balise article
  let parent = document.getElementById("cart__items");
  let child = document.createElement("article");
  parent.appendChild(child);
  child.className = "cart__item";
  child.setAttribute("data-id", product.Id);
  child.setAttribute("data-color", product.color);

// création de la div image et insertion image
  let divImage = document.createElement("div");
  child.appendChild(divImage);
  divImage.className = "cart__item__img";
  let img = document.createElement("img");
  divImage.appendChild(img);
  img.setAttribute("src", item.imageUrl);
  img.setAttribute("alt", item.altTxt);
//balise content
  let divContent = document.createElement("div");
  child.appendChild(divContent);
  divContent.className = "cart__item__content";
  let divDescription = document.createElement("div");
  divContent.appendChild(divDescription);
  divDescription.className = "cart__item__content__description";
  let title = document.createElement("h2");
  divDescription.appendChild(title);
  title.textContent = item.name;
  let itemColor = document.createElement("p");
  divDescription.appendChild(itemColor);
  itemColor.textContent = product.color;
  let itemPrice = document.createElement("p");
  divDescription.appendChild(itemPrice);
  itemPrice.textContent = item.price + ` €`;
  let settings = document.createElement("div");
  divContent.appendChild(settings);
  settings.className = "cart__item__content__settings";
  let settingsQuantity = document.createElement("div");
  settings.appendChild(settingsQuantity);
  settingsQuantity.className = "cart__item__content__settings__quantity";
  let settingsQuantityP = document.createElement("p");
  settingsQuantity.appendChild(settingsQuantityP);
  settingsQuantityP.textContent = `Qté : `;
  //création balise quantité
  let settingsInput = document.createElement("input");
  settingsQuantity.appendChild(settingsInput);
  settingsInput.className = "itemQuantity";
  settingsInput.setAttribute("type", "Number");
  settingsInput.setAttribute("name", "quantity");
  settingsInput.setAttribute("min", "1");
  settingsInput.setAttribute("max", "100");
  settingsInput.setAttribute("value", product.quantity);

  //création bouton supprimer
  let settingsDelete = document.createElement("div");
  settings.appendChild(settingsDelete);
  settingsDelete.className = "cart__item__content__settings__delete";
  let deleteProduct = document.createElement("p");
  settingsDelete.appendChild(deleteProduct);
  deleteProduct.className = "deleteItem";
  deleteProduct.textContent = "supprimer";
}
//modifier la quantité dans la page panier, 
function editProduct() {
  let editQuantity = document.querySelectorAll(".itemQuantity");
  for (let n = 0; n < editQuantity.length; n++) {
    let itemToChange = editQuantity[n].closest("article");
    let itemId = itemToChange.getAttribute("data-id");
    let itemColor = itemToChange.getAttribute("data-color");
    let newQuantity = editQuantity[n].getAttribute("value");
    editQuantity[n].addEventListener("change", (e) => {
      e.preventDefault();
      if (e.target.value > 1 && e.target.value < 100) {
        newQuantity = parseInt(e.target.value);
      } else {
        alert("veuillez choisir une quantité comprise entre 1 et 100");
        newQuantity = 1;
      }
      for (product of cartPanier) {
        if (itemId == product.Id &&
          itemColor == product.color) {
          product.quantity = newQuantity;
          localStorage.setItem("cart", JSON.stringify(cartPanier));
          location.reload()
        }
      }
    })
  }
}
//--------suppression---
function deleteProduct() {
  const deleteBtn = document.querySelectorAll(".deleteItem");
  for (let k = 0; k < deleteBtn.length; k++) {
    deleteBtn[k].addEventListener("click", (event) => {
      event.preventDefault();
      let itemToDelete = deleteBtn[k].closest("article");
      let deleteId = itemToDelete.getAttribute("data-id");
      let deleteColor = itemToDelete.getAttribute("data-color");
      cartPanier = cartPanier.filter((element) =>
        deleteId !== element.Id && deleteColor !== element.color);
      localStorage.setItem("cart", JSON.stringify(cartPanier));
      alert("article supprimé")
      location.reload()
    }
    )
  }
}

//total quantité
//créer un tableau qui rassemblera les valeurs des prix articles qui ont même I
let total = []
function totalQuantityPrice(item) {
  let totalQuantity = 0;
  let totalPrice = 0;
  for (let m = 0; m < cartPanier.length; m++) { 
    if (item._id == cartPanier[m].Id) {
      let cartPrice = cartPanier[m].quantity * item.price;
      total.push(cartPrice);
    } 
    if (total.length > 0) {
      const reduce = total.reduce((a, b) => a + b, totalPrice);
      document.getElementById("totalPrice").innerHTML = reduce;
    } else {
      document.getElementById("totalPrice").innerHTML = 0;
    }
    totalQuantity += cartPanier[m].quantity;
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
  } 
}
//valider la commande

function formOrder() {
  const form = document.querySelector(".cart__order__form");
  //récupérer les éléments du formulaire
  firstName = form.elements.firstName.value
  lastName = form.elements.lastName.value
  address = form.elements.address.value
  city = form.elements.city.value
  email = form.elements.email.value;
  firstNameValid(firstName);
  lastNameValid(lastName);
  addressValid(address);
  cityValid(city);
  emailValid(email)
}
function firstNameValid(firstName) {
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
  if (firstName !== 0 && /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/.test(firstName)) {
    firstNameErrorMsg.textContent = "enregistré"
    return true;
  } else {
    firstNameErrorMsg.textContent = "Veuillez entrer un prénom valide";
    return false;
  }
}
//vérifier la validité du nom
function lastNameValid(lastName) {
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  if (lastName !== "" && /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/.test(lastName)) {
    lastNameErrorMsg.textContent = "enregistré";
    return true;
  } else {
    lastNameErrorMsg.textContent = "Veuillez entrer un nom valide";
    return false;
  }
}
//vérifier la validité de l'adresse
function addressValid(address) {
  let addressErrorMsg = document.getElementById("addressErrorMsg")
  if (address !== "" && /^[a-zA-Z0-9\s,'-]{1,100}$/.test(address)) {
    addressErrorMsg.textContent = "enregistré";
    return true;
  } else {
    addressErrorMsg.textContent = "Veuillez entrer une adresse valide";
    return false;
  }
}
//vérifier la validité de la ville
function cityValid(city) {
  let cityErrorMsg = document.getElementById("cityErrorMsg")
  if (city !== "" && /^[a-zA-Zéèàïêç\-\s]{2,30}$/.test(city)) {
    cityErrorMsg.textContent = "enregistré";
    return true;
  } else {
    cityErrorMsg.textContent = "Veuillez entrer une ville valide";
    return false;
  }
}
//vérifier la validité de l'email
function emailValid(email) {
  let emailErrorMsg = document.getElementById("emailErrorMsg")
  if (email !== "" && /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email)) {
    emailErrorMsg.textContent = "enregistré";
    return true;
  } else {
    emailErrorMsg.textContent = "Veuillez entrer un E-mail valide";
    return false;
  }
}
function formValid() {
  formOrder();
  const isValid = [
    firstNameValid(firstName),
    lastNameValid(lastName),
    addressValid(address),
    cityValid(city),
    emailValid(email)
  ]
  return isValid.every(Boolean)
}
//ajouter l'evenement click pour valider le formulaire*/
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (cartPanier.length == 0){
    alert("panier vide")
  } else{
     if (formValid()) {
      orderRequest()
    } else {
    alert("formulaire non valide")
    }
  }
})

function orderRequest() {
  let contact = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  }
  let products = []
  cartPanier.forEach(element => {
    products.push(element.Id);
    console.log(products)
  });
  let object = { contact, products }
  console.log(object)
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": 'application/json; charset=utf-8'
    },
    body: JSON.stringify(object),
  })
    .then((response) => {
      return response.json();
    }
    )
    .then((data) => {
      const orderId = data.orderId
      console.log(orderId)
      window.location.href = "confirmation.html" + "?orderId=" + orderId
    })
    .catch((err) => console.error(err))
}