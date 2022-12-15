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