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

  // 
  let products = {
    id: id,
    colors: color,
    quantity: Number(quantity),
    imageUrl: imageUrl,
    price: price,
    name: name
  }
  console.log(product.color)
  console.log(color)
  addBasket(products)
}

// 
function getBasket() {
  let products = localStorage.getItem(id);
  if (products == null) {
    return [];
  } else {
    return JSON.parse(products);
  }
}

// 
function addBasket(product) {
  // AddEvent to dynamic button
  const button = document.querySelector("#addToCart");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const color = document.querySelector("#colors").value;
    for (let i in color) {//revoir
      console.log(color[i])
    }
    const quantity = document.querySelector("#quantity").value;
    if (color == null || color === "" || quantity == null || quantity == 0) {
      alert("Please select a color and quantity");
      //
      return
    }

    console.log(product.color)
    let products = getBasket();
    let foundProduct = products.find(p => p.id == product.id)
    if (foundProduct != undefined) {
      foundProduct.quantity++;
      console.log(foundProduct.quantity++)
    } else {
      product.quantity = Number(quantity);
      console.log(Number(quantity))
      products.push(product);
    }
    console.log(products)
    localStorage.setItem(id, JSON.stringify(products));
  });
}

  //localStorage / cache with all keys
  //localStorage.setItem(productId, JSON.stringify(storage));

  // window.location.href to send us to url cart when "click" on button
  //window.location.href = "cart.html"




