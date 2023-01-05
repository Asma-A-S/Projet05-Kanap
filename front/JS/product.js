(async function() {
    const productId = getProductId()
    const product = await getProduct(productId)
    hydrateProduct(product)
})()

function getProductId() {
    return new URL(location.href).searchParams.get("id");
}
function getProduct(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .then (function(response){
            return response.json()
        })
        .then (function(product){
        return product
        })
        .catch(function(error) {
            alert(error);
        })
}
function hydrateProduct(product) {
    document.querySelector("#title").textContent = product.name
    document.getElementById("price").textContent = product.price
    document.getElementById("description").textContent = product.description
    let image = document.querySelector(".item__img");
    image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    let color = document.getElementById("colors")
    for (i=0; i<product.colors.length; i++) {
        color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
    }
}
//récupérer les articles dans le panier
const button = document.querySelector("#addToCart")
if (button != null) {
    button.addEventListener("click", (e) => {
        const itemQuantity = document.getElementById("quantity").value
        const color = document.getElementById("colors").value
        if (color == null || color == ""){
            alert("please select color")
            return
        }
        if (itemQuantity == null || itemQuantity == 0 || itemQuantity>100){
            alert("Veuillez choisir une quantité comprise entre 0 et 100");
            return
        }
    let cart = {
            Id: getProductId(),
            color: color,
            quantity: parseInt(itemQuantity),
        }
        let panier = JSON.parse(localStorage.getItem("cart"));
        console.log(panier)
        if(panier == null) {
            panier = [];
            panier.push(cart);
            localStorage.setItem("cart", JSON.stringify(panier))
            console.table(panier)
        }
        else if(panier) {
            const panierExist = panier.find(
                (panierExist) =>
                    panierExist.Id === cart.Id && panierExist.color === cart.color);
            if (panierExist) {
                let newQuantity = parseInt(panierExist.quantity) + cart.quantity;
                panierExist.quantity = newQuantity;
                console.table(panier)
            }
            else{
            panier.push(cart)
            console.table(panier)
            }
            localStorage.setItem("cart", JSON.stringify(panier));
        }
        window.location.href = "cart.html"
    })
}
