/*fonction asynchrone, elle récupère d'abord l'Id du produit, 
elle renvoie le produit d'une façon dynamique,
ensuite elle exécute la fonction hydrateProduct (affichage des informations du produit)*/
(async function() {
    const productId = getProductId()
    const product = await getProduct(productId)
    hydrateProduct(product)
})()
//récupérer l'Id du produit
function getProductId() {
    return new URL(location.href).searchParams.get("id");
}
//récupérer le produit de l'API avec son Identifiant en envoayant une requête GET. cette requette renvoie le produit comme réponse
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
//la fonction prend en paramètre product (la réponse de la requête fetch) et hydrate la card du produit 
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
//Ajouter les articles dans le panier
const button = document.querySelector("#addToCart")
//ajout de l'evenement click au boutton: ajouter au panier
button.addEventListener("click", (e) => {
    const itemQuantity = document.getElementById("quantity").value
    const color = document.getElementById("colors").value
    //condition: choisir une couleur produit avant l'ajout au panier
    if (color == null || color == "") {
        alert("please select color")
        return
    }
    //condition: choisir une quantité produit avant l'ajout au panier, 0<quantité<100;
    if (itemQuantity == null || itemQuantity == 0 || itemQuantity > 100) {
        alert("Veuillez choisir une quantité comprise entre 0 et 100");
        return
    }
    //création d'un objet cart (panier), avec les propriétés ID, color, quantity
    let cart = {
        Id: getProductId(),
        color: color,
        quantity: parseInt(itemQuantity),
    }
    //récupération des données du panier enregistrée dans le localStorage
    let panier = JSON.parse(localStorage.getItem("cart"));
    function confirmation(){
        if (window.confirm("Article ajouté, cliquer sur ok pour être redirigé vers le pnaier")){
            window.location.href ="cart.html"
        }
    }
    //si le panier est vide, l'article sera ajouté au panier sans condition, et enregistre le localStorage
    if (panier == null) {
        panier = [];
        panier.push(cart);
        localStorage.setItem("cart", JSON.stringify(panier))
        confirmation()
    }
    //si le panier n'est pas vide
    else if (panier){
        //vérifier si l'article qu'on souhaite ajouté existe déjâ dans le panier,on compare la couleur et l'Id des deux produits
        const panierExist = panier.find(
            (panierExist) =>
                panierExist.Id === cart.Id && panierExist.color === cart.color);
        //si l'article est déjâ dans la panier, on met à jour la quantité du produit
        if (panierExist) {
            let newQuantity = parseInt(panierExist.quantity) + cart.quantity;
            panierExist.quantity = newQuantity;
            confirmation()
        }
        //sinon, on ajoute l'article au panier
        else {
            panier.push(cart)
            confirmation()
        }
        //on enregistre le panier mis à jour dans le localStorage
        localStorage.setItem("cart", JSON.stringify(panier));
    }
})
