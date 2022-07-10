//Retrieve all products
class allProducts {
    constructor(jsonProducts) {
      jsonProducts && Object.assign(this, jsonProducts);
    }
  }
  
//manages the display and interactions of the home page
fetch("http://localhost:3000/api/products")
    .then(data => data.json())
    .then(jsonListProducts => {
        for(let jsonProducts of jsonListProducts){
            let products = new allProducts(jsonProducts);
            document.querySelector(".items").innerHTML += ` 
            <a href="./product.html?id=${products._id}">
                <article>
                    <img src="${products.imageUrl}" alt="${products.altTxt}">
                    <h3 class="productName">${products.name}</h3>
                    <p class="productDescription">${products.description}</p>
                </article>
            </a>
        `
    }
});


