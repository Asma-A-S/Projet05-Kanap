/*fonction asynchrone, d'abord elle récupère les products avec la fonction getProducts, 
ensuite pour chaque produit de ces produit, elle appelle la fonction displayProduct
(afficher les informations du produit)*/
(async function() {
    const products = await getProducts()
    for (product of products) {
        console.log(product)
        let prod = CreateProductCard(product._id, product.name, product.description, product.imageUrl, product.altTxt);
        console.log(prod)
        prod.getProductCard()
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
//factory function pour affichage des produits d'une façon dynamique
function CreateProductCard(id, name, description, imageUrl, altTxt) {
    return {
        id,
        name,
        description,
        imageUrl,
        altTxt,
        getProductCard(){
            let items = document.getElementById("items");
            const productCard = `
                <a href ="./product.html?id=${this.id}">
                    <article>
                        <img 
                            src="${this.imageUrl}" 
                            alt="${this.altTxt}"
                        />
                        <h3 class="productName">${this.name}</h3>
                        <p class="productDescription">${this.description}</p>
                    </article>
                </a>`;
            items.innerHTML += productCard;
        }
        }}