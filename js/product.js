// location.search to retrieve the url id parameter
function getProductId() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}
const id = getProductId();

// Creating html for display product chosen
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => fillData(res))

// Function to create elements
function fillData(product) {

  // Create img element
  const imageUrl = product.imageUrl;
  const altTxt = product.altTxt;
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);

  // Create name element
  const name = product.name;
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;

  // Create price element
  const price = product.price;
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price;

  // Create description element
  const description = product.description;
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;

  // Create colors element
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
  console.log("bonjour")
  const button = document.querySelector("#addToCart");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const colors = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    if (colors == null || colors === "" || quantity == null || quantity == 0) {
      alert("Please select a color and quantity");
      //
      return
    }

    //
    const managesSeveralColors = Object.assign({}, product, {
      colors: colors,
      quantity: Number(quantity),
    });
    console.log(managesSeveralColors)

    //
    let productsAdded = JSON.parse(localStorage.getItem("product"));
    //
    if (productsAdded == null) {
      productsAdded = [];
      productsAdded.push(managesSeveralColors);
      localStorage.setItem("product", JSON.stringify(productsAdded));
    } else if (productsAdded != null) {
      for (i = 0; i < productsAdded.length; i++) {
        if (productsAdded[i]._id == product._id && productsAdded[i].colors == colors) {
          return (
            productsAdded[i].quantity += Number(quantity),
            localStorage.setItem("product", JSON.stringify(productsAdded)),
            productsAdded = JSON.parse(localStorage.getItem("product")),
            // window.location.href to send us to url cart when "click" on button
            window.location.href = "cart.html"
          );
        }
      }
      for (i = 0; i < productsAdded.length; i++) {
        if (productsAdded[i]._id == product._id && productsAdded[i].colors != colors || productsAdded[i]._id != product._id) {
          return (
            productsAdded.push(managesSeveralColors),
            localStorage.setItem("product", JSON.stringify(productsAdded)),
            (productsAdded = JSON.parse(localStorage.getItem("product"))),
            // window.location.href to send us to url cart when "click" on button
            window.location.href = "cart.html"
          );
        }
      }
    }

    return productsAdded = JSON.parse(localStorage.getItem("product")),
    // window.location.href to send us to url cart when "click" on button
    window.location.href = "cart.html"
  });
}





