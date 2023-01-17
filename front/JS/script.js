/*fonction asynchrone, d'abord elle récupère les products avec la fonction getProducts, 
ensuite pour chaque produit de ces produit, elle appelle la focntion displayProduct
(afficher les informations du produit)*/
(async function() {
    const products = await getProducts()
    for (product of products) {
        displayProduct(product)
    }
})()
//récupération des produits de l'API avec une requête GET et renvoie des produits (products)
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
//modèle
function displayProduct(product){
class ProductCard {
    constructor(product) {
        this._id = product._id
        this._name = product.name
        this._description = product.description
        this._imageUrl = product.imageUrl
        this._altTxt = product.altTxt
    }
    get id() {
        return this._id
    }
    get name() {
        return this._name
    }
    get description() {
        return this._description
    }
    get imageUrl() {
        return this._imageUrl
    }
    get altTxt() {
        return this._altTxt
    }
}
//template
class ElementCard {
    constructor(element) {
        this._element = element
    }
    createElementCard(){
        const conteneur= document.getElementById("items")
        const elementCard = `
        <a href ="./product.html?id=${this._element._id}">
            <article>
                <img 
                    src="${this._element.imageUrl}" 
                    alt="${this._element.altTxt}"
                />
                <h3 class="productName">${this._element.name}</h3>
                <p class="productDescription">${this._element.description}</p>
            </article>
        </a>`
        conteneur.innerHTML = elementCard
        return conteneur
    }
}
}
/*function displayProduct(){
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
}*/