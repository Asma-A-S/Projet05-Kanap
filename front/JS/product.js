(async function(){
    const productId = getProductId()
    const product = await getProduct(productId)
    displayProdcut(product)
})()

function getProductId(){
    return new URL(location.href).searchParams.get("id")
}
function getProduct(productId) {
    return fetch("http://localhost:3000/api/products/${productId}")
        .then(function(response) {
            return response.json()
        })
        .then(function(product) {
            return product
        })
        .catch(function(error) {
            alert(error)
        })
}
function displayProdcut(product) {
    let img = document.getElementById("item__img");
    img.innerHTML = `<img src="${products.imageUrl}" alt="${products.altTxt}">`;
    document.getElementById("title").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description;
    let color = document.getElementById("colors");
    for (i=0; i<products.color.length; i++) {
        color.innerHTML += `option value="${products.colors[i]}">${products.colors[i]}</option>`
    }
}
