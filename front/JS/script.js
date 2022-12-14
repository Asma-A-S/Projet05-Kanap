(async function() {
    const products = await getProducts()
    for (product of products) {
        displayProduct(products)
    }
})()

function getProducts() {
    return fetch("http://localhost:3000/api/products")
        .then(function(response) {
            return response.json()
        })
        .then(function(products) {
            return products
        })
        .catch(function(error) {
            alert(error)
        })
}
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