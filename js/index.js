/**
 * manages the display and interactions of the home page
 */
fetch("http://localhost:3000/api/products")
    .then(data => data.json())
    .then(jsonListProducts => {
        for(let jsonProducts of jsonListProducts){
            let products = new Products(jsonProducts);
            document.querySelector(".items").innerHTML += `<section class="items" id="items"> 
            <a href="./product.html?id=${products._id}">
                <article>
                    <img src="${products.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">${products.altTxt}
                    <h3 class="productName">${products.name}</h3>
                    <p class="productDescription">${products.description}</p>
                </article>
            </a>
        </section>
        `
    }
});


