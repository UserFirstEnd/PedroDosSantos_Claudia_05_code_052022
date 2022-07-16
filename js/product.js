// location.search and URLSearchParams to retrieve the url id parameter
function getProductId() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}
const id = getProductId();

// Creation of elements and their contents in the DOM
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => fillData(res))

// Function to display the chosen product from the home page
function fillData(product) {

  // Create the element for the img
  const imageUrl = product.imageUrl;
  const altTxt = product.altTxt;
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);

  // Create the element for the name
  const name = product.name;
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;

  // Create the element for the price
  const price = product.price;
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price;

  // Create the element for the description
  const description = product.description;
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;

  // Create the element for the colors
  const color = product.colors;
  const select = document.querySelector("#colors");
  color.forEach((colors) => {
    const option = document.createElement("option");
    option.value = colors;
    option.textContent = colors;
    select.appendChild(option);
  })

  addProducts(product);
}

// Function to send chosen products to localStorage
function addProducts(product) {
  const button = document.querySelector("#addToCart");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const colors = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    // if a color or quantity has not been chosen, alert
    if (colors == null || colors === "" || quantity == null || quantity == 0) {
      alert("Please select a color and quantity");
      //
      return
    }
    // variable to store colors
    const managesSeveralColors = Object.assign({}, product, {
      colors: colors,
      quantity: Number(quantity),
    });
    
    // Send the value associated with the "products" key / parse the JSON string and build the JavaScript value
    let productsAdded = JSON.parse(localStorage.getItem("products"));
    // if no product on storage send a table and setItem on storage, with the chosen product + the color
    if (productsAdded == null) {
      productsAdded = [];
      productsAdded.push(managesSeveralColors);
      localStorage.setItem("products", JSON.stringify(productsAdded));
      // else if we already have products in localStorage
    } else if (productsAdded != null) {
      // browse the products
      for (i = 0; i < productsAdded.length; i++) {
        // if we already have in localStorage a product with the same id and same color
        if (productsAdded[i]._id == product._id && productsAdded[i].colors == colors) {
          // add 1 for this product
          return (
            productsAdded[i].quantity += Number(quantity),
            localStorage.setItem("products", JSON.stringify(productsAdded)),
            productsAdded = JSON.parse(localStorage.getItem("products")),
            // window.location.href to send us to url cart when "click" on button
            window.location.href = "cart.html"
          );
        }
      }
      // browse the products
      for (i = 0; i < productsAdded.length; i++) {
        // if we already have the same id in localStorage, but the color is different or the id is different
        if (productsAdded[i]._id == product._id && productsAdded[i].colors != colors || productsAdded[i]._id != product._id) {
          // add a new product to localStorageretourne 
          return (
            productsAdded.push(managesSeveralColors),
            localStorage.setItem("products", JSON.stringify(productsAdded)),
            (productsAdded = JSON.parse(localStorage.getItem("products"))),
            // window.location.href to send us to url cart when "click" on button
            window.location.href = "cart.html"
          );
        }
      }
    }
    productsAdded = JSON.parse(localStorage.getItem("products")),
    window.location.href = "cart.html"
  });
}





