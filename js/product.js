//location.search to retrieve the url id parameter
function getProductId() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}
const productId = getProductId();

//Creating html for display product chosen
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((res) => fillData(res))

// Function to create elements
function fillData(product) {

  // create img element
  const imageUrl = product.imageUrl;
  const altTxt = product.altTxt;
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);

  // create name element
  const name = product.name;
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;

  // create price element
  const price = product.price;
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price;

  // create description element
  const description = product.description;
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;

  // create colors element
  const colors = product.colors;
  const select = document.querySelector("#colors");
  colors.forEach((colors) => {
    const option = document.createElement("option");
    option.value = colors;
    option.textContent = colors;
    select.appendChild(option);

  })

  //addEvent to dinamic button
  const button = document.querySelector("#addToCart");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    if (color == null || color === "" || quantity == null || quantity == 0) {
      alert("Please select a color and quantity");
      //
      return
    }
    let productsAdded = JSON.parse(localStorage.getItem("id"))
    let storage = {
      id: productId,
      colors: color,
      quantity: Number(quantity),
      imageUrl: imageUrl,
      price: price,
      name: name
    }
    const managesSeveralColors = Object.assign({}, product, {
      colors: `${select.value}`,
      quantity: 1,
    });

    if (productsAdded == null) {
      productsAdded = [];
      productsAdded.push(managesSeveralColors);
      console.log(productsAdded);
    } else if (productsAdded != null) {
      console.log("test");
      for (i = 0; i < productsAdded.lenght; i) {
        console.log("test");
        if (productsAdded[i].id == product.id && addedProducts[i].colors == select.value);
        return (addedProducts.push(managesSeveralColors)
        )
      };
    };
    // window.location.href to send us to url cart when "click" on button
    window.location.href = "cart.html";
    return localStorage.setItem(productId, JSON.stringify(storage));
  });
}
