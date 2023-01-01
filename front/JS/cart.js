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
    const item = await getProduct(product.Id)
    totalQuantity += product.quantity
    totalPrice += (product.quantity * item.price)
    console.log(item)
    displayProduct(item)
    deleteProduct()
  }
  document.getElementById("totalQuantity").innerHTML = totalQuantity;
  document.getElementById("totalPrice").innerHTML = totalPrice
})()

/*création de la balise article*/
function displayProduct(item){
//création de la balise article 
  let parent = document.getElementById("cart__items")
  let child = document.createElement("article")
  parent.appendChild(child)
  child.className = "cart__item";
  child.setAttribute("data-id", product.Id);
  child.setAttribute("data-color", product.color);

// création de la div image et insertion image
  let divImage = document.createElement("div")
  child.appendChild(divImage)
  divImage.className = "cart__item__img"
  let img = document.createElement("img")
  divImage.appendChild(img)
  img.setAttribute("src", item.imageUrl)
  img.setAttribute("alt", item.altTxt)

//balise content
let divContent = document.createElement("div")
child.appendChild(divContent)
divContent.className = "cart__item__content"

let divDescription = document.createElement("div")
divContent.appendChild(divDescription)
divDescription.className = "cart__item__content__description"

let title = document.createElement("h2")
  divDescription.appendChild(title)
title.textContent = item.name
let itemColor = document.createElement("p")
divDescription.appendChild(itemColor)
itemColor.textContent = product.color
let itemPrice = document.createElement("p")
divDescription.appendChild(itemPrice)
itemPrice.textContent = item.price + ` €`

let settings = document.createElement("div")
divContent.appendChild(settings)
settings.className = "cart__item__content__settings"
let settingsQuantity = document.createElement("div")
settings.appendChild(settingsQuantity)
settingsQuantity.className = "cart__item__content__settings__quantity"
let settingsQuantityP = document.createElement("p")
settingsQuantity.appendChild(settingsQuantityP)
settingsQuantityP.textContent = `Qté : `
//création balise quantité
let settingsInput = document.createElement("input")
settingsQuantity.appendChild(settingsInput)
settingsInput.className = "itemQuantity"
settingsInput.setAttribute("type", "Number")
settingsInput.setAttribute("name", "quantity")
settingsInput.setAttribute("min", "1")
settingsInput.setAttribute("max", "100")
settingsInput.setAttribute("value", product.quantity)

//création bouton supprimer
let settingsDelete = document.createElement("div")
settings.appendChild(settingsDelete)
settingsDelete.className = "cart__item__content__settings__delete";
let deleteProduct = document.createElement("p")
settingsDelete.appendChild(deleteProduct);
deleteProduct.className = "deleteItem"
deleteProduct.textContent = "supprimer"
}
//modifier la quantité dans la page panier, 
function editProduct(){
  const editQuantities= document.querySelectorAll(".itemQuantity")
  editQuantities.forEach((editQuantity)=>{
    editQuantity.addEventListener("change", ()=>{
    let itemToChange = editQuantity.closest("article");
    let itemId = itemToChange.getAttribute("data-id");
    let itemColor = itemToChange.getAttribute("data-color");
    console.log(itemToChange)
    // comparer le id et couleur de l'article auquel on veut changer la quantité avec l'article qui existe déja dans le panier, ensuite on enregister dans le localstorage
    for (let l = 0; l<cartPanier.length; l++){
      if(itemId == cartPanier[l].id &&
        itemColor == cartPanier[l].color){
        cartPanier[l].quantity = this.value;
        console.log(cartPanier[l].quantity)
        localStorage.setItem("cart", JSON.stringify(cartPanier));
        console.log(cartPanier)
        }
        location.reload()
    }
  }

  )})}

//--------suppression---
function deleteProduct(){
const deleteBtn = document.querySelectorAll(".deleteItem");
console.log(deleteBtn)
for (let k=0; k < deleteBtn.length; k++){
  console.log(deleteBtn[k])
  deleteBtn[k].addEventListener("click", (event) =>{
    event.preventDefault();
    let itemToDelete = deleteBtn[k].closest("article");
    let deleteId = itemToDelete.getAttribute("data-id");
    let deleteColor = itemToDelete.getAttribute("data-color");
    cartPanier = cartPanier.filter((element) =>
          deleteId !== element.Id && deleteColor !== element.color);
    localStorage.setItem("cart", JSON.stringify(cartPanier));
    console.log("article supprimé")
    location.reload()
      }
)}}

//total quantité et prix
function totalQuantity(product, item){
  let totalQuantity = 0;
  let totalPrice = 0;
  /*for (product of cartPanier){
    let currentItem = cartPanier.find((produit)=>
    return produit.id == product.id);*/
  totalQuantity += product.quantity;
  totalPrice += product.quantity* item.price;}
  document.getElementById("totalQuantity").innerHTML = totalQuantity;
  document.getElementById("totalPrice").innerHTML = totalPrice


//formulaire
// récupérer les Id des articles dans le panier pour le body de la requête


const orderButton = document.querySelector("#order")
let firstName = ""; 
let lastName = "";
let address = "";
let city= "";
let email = "";
orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  if(formValid()){
  formOrder()
  orderRequest()
  }})

// vérifier si le formulaire est valide
//liste des erreurs lors de la saisie
let errorMsg = [];
function formValid(){
  //fonctions pour valider les inputs formulaire
  firstNameValid();
  lastNameValid()
  addressValid()
  cityValid();
  emailValid();
  if(errorMsg.length == 0 && cartPanier.length !== 0){
    return true
    } 
    alert("panier vide")
    return false
  }

//création formulaire
function formOrder(){
  const form = document.querySelector(".cart__order__form");
  //récupérer les éléments du formulaire
  firstName = form.elements.firstName.value
  lastName = form.elements.lastName.value
  address = form.elements.address.value
  city = form.elements.city.value
  email = form.elements.email.value;
  firstNameValid()
  lastNameValid()
  addressValid()
  cityValid()
  emailValid()
}
function firstNameValid() {
  let firstNameError = document.getElementById("firstNameErrorMsg")
  if (firstName == "" || /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/.test(firstName)){
    firstNameError.textContent = "enregistré"
    return true;
  }else{
    firstNameError.style.color = "red";
    firstNameError.textContent = "Veuillez entrer un prénom valide";
    errorMsg.push("error")
    return false;
  }
}
function lastNameValid() {
  let lastNameError = document.getElementById("lastNameErrorMsg");
  if (lastName == "" || /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/.test(lastName)) {
    lastNameError.textContent ="enregistré"
    return true;
  }else{
    lastNameError.textContent = "Veuillez entrer un nom valide";
    errorMsg.push("error")
    return false;
  }
}

function addressValid() {
  let addressErrorMsg = document.getElementById("addressErrorMsg")
  if (address == "" || /^[a-zA-Z0-9\s,'-]{1,100}$/.test(address)){
    addressErrorMsg.textContent = "enregistré"
    return true;
  }else{
    addressErrorMsg.style.color = "red"
    addressErrorMsg.textContent = "Veuillez entrer une adresse valide"
    errorMsg.push("error")
    return false;
  }
  }
function cityValid() {
  let cityErrorMsg = document.getElementById("cityErrorMsg")
  if (city == "" || /^[a-zA-Zéèàïêç\-\s]{2,30}$/.test(city)){
    cityErrorMsg.textContent = "enregistré"
    return true;
  }else{
    cityErrorMsg.style.color = "red"
    cityErrorMsg.textContent = "Veuillez entrer une ville valide";
    errorMsg.push("error")
    return false;
  }
}
function emailValid() {
  let emailErrorMsg = document.getElementById("emailErrorMsg")
  if (email == "" || /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email)){
    emailErrorMsg.textContent = "enregistré"
    return true;
  }else{
    emailErrorMsg.style.color = "red";
    emailErrorMsg.textContent = "Veuillez entrer un email valide";
    errorMsg.push("error")
    return false;
  }
  }
  
function orderRequest(){
  let contact ={
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  }
  console.log(contact)
  let products =[]
  cartPanier.forEach(element => {
  products.push(element.Id);
  console.log(products)
  });

  let object = {contact, products}
  console.log(object)
  fetch("http://localhost:3000/api/products/order",{
    method:"POST",
    headers:{
      'Accept' : 'application/json',
      "Content-Type": 'application/json; charset=utf-8'
    },
    body: JSON.stringify(object),
  })
  .then ((response) =>{
    return response.json(); }
  )
    .then(data => {
      return console.log(data);
    }) 
  }