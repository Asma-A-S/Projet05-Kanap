//fonction qui s'auto-appelle, pour chaque produit de nos produits, la fonction displayProduct s'exécute
(async function() {
    const products = await getProducts()
    for (product of products) {
        displayProduct(products)
    }
})()
//récupération des produits de l'API avec une requête GET et renvoie des produits
function getProducts() {
    return fetch("http://localhost:3000/api/products")
        .then(function(response) {
            return response.json();
        })
        .then(function(products) {
            return products;
        })
        .catch(function(error) {
            alert(error);
        })
}
//insertion des produits dans le DOM 
function displayProduct(){
    document.getElementById("items").innerHTML += `
        <a href ="./product.html?id=${product._id}">
            <article>
                <img 
                    src="${product.imageUrl}" 
                    alt="${product.altTxt}"
                />
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>`
}