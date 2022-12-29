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

/*deleteBtns.forEach((deleteBtn) =>{
  deleteBtn.addEventListener("click", (event) =>{
    event.preventDefault();*
    console.log(cartPanier);
    localStorage.setItem("cart", JSON.stringify(cartPanier))
    itemToDelete.remove()
    location.reload()
  })
})*/
  



//modifier la quantité
/*function editQuantity (){
  document.querySelector(".itemQuantity").addEventListener("input.value", (eve) => {
    cart.quantity = settingsInput.value
  }
  )
}*/

/*formulaire*/

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

function submitForm(e) {
  e.preventDefault()
  const form = document.querySelector(".cart__order__form")
  console.log(form.elements)
}