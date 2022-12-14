function fetchCards(){
    fetch(" http://localhost:3000/api/products")
    .then(function(res){
        if (res.ok) {
            return res.json();
        }
    })
    .then((data)=>{
        console.log(data);

        let productItems = document.getElementById("items");

        for (i=0; i<data.length; i++) {
            const productItem = 
            <a href ="./product.html?id=${data[i]._id}">
                <article>
                    <img 
                        src="${data[i].imageUrl}" 
                        alt="${data[i].altTxt}"
                    />
                    <h3 class="productName">${data[i].name}</h3>
                    <p class="productDescription">${data[i].description}</p>
                </article>
            </a>;
            productItems.innerHTML += productItem;
        }
    })
}
fetchCards();