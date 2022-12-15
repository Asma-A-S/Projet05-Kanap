(async function() {
    const productId = getProductId()
    const product = await getProduct(productId)
    hydrateProduct(product)
})()

function getProductId() {
    return new URL(location.href).searchParams.get("id")
}

function getProduct(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .then (function(response){
            return response.json()
        })
        .then (function(product) {
            return product
        })
        .catch(function(error) {
            alert(error);
        })
}

function hydrateProduct(product) {
    document.getElementById("title").textContent = product.name
    document.getElementById("price").textContent = product.price
    document.getElementById("description").textContent = product.description
    let image = document.querySelector(".item__img");
    image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    let color = document.getElementById("colors")
    for (i=0; i<product.colors.length; i++) {
        color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
    }
}

//input pour la quantité
/*function quantityvalue(){
    const itemQuantity = document.getElementById("quantity").value
    return itemQuantity
}
//récupérer la couleur choisi du produit
function colorValue(){
    const color = document.getElementById("colors").value
    return color
}*/

//récupérer les articles dans le panier
const button = document.querySelector("#addToCart")
if (button != null){
    button.addEventListener("click", (e) =>{ 
    const itemQuantity = document.getElementById("quantity").value
    const color = document.getElementById("colors").value
    if (color == null || color == "" || itemQuantity == null || itemQuantity==0){
        alert("please select color and quantity")
    }
    let cart = {
        color: color,
        quantity: itemQuantity,
    }
    let cartlinea = JSON.stringify(cart);
    localStorage.setItem("cart", cartlinea)
})
}
