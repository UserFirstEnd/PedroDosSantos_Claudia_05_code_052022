/**
 * Representation of the format of a product
 */
class Products {
  constructor(jsonProducts) {
    jsonProducts && Object.assign(this, jsonProducts)
  }
}

/**
 * Retrieving the url id parameter
 */
function getProductId() {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get("id");
}
const productId = getProductId()

/**
 *
 */
let takePrice = 0
let urlImg
let altImg
let showName

/**
 *Create html for display product chosen
 */
fetch(`http://localhost:3000/api/products/${productId}`) 
  .then((response) => response.json())
  .then((res) => fillData(res))

  function fillData(product) {
    const altTxt = product.altTxt
    const imageUrl = product.imageUrl
    const name = product.name
    const price = product.price
    const description = product.description
    const colors = product.colors
    showImage(imageUrl, altTxt)
    showTitle(name)
    showPrice(price)
    showDescription(description)
    showColors(colors)
    showName = name
    takePrice = price
    urlImg = imageUrl
    altImg = altTxt
}

/**
 * Functions to create and select elements
 */
function showImage(urlImg, altTxt) {
  const image = document.createElement("img")
  image.src = urlImg
  image.alt = altTxt
  const parent = document.querySelector(".item__img")
  if (parent !=null) parent.appendChild(image)
}
function showTitle(name) {
  const h1 = document.querySelector("#title")
  if (h1 != null) h1.textContent = name
}
function showPrice(price) {
  const span = document.querySelector("#price")
  if (span != null) span.textContent = price
}
function showDescription(description) {
  const p = document.querySelector("#description")
  if (p != null) p.textContent = description
}
function showColors(colors) {
  const select = document.querySelector("#colors")
  colors.forEach((color) => {
  const option = document.createElement("option")
  option.value = color
  option.textContent = color
  select.appendChild(option)
  }
)}

//addEvent to dinamic button
const button = document.querySelector("#addToCart") 
button.addEventListener("click", (e) => {
  const color = document.querySelector("#colors").value
  const quantity = document.querySelector("#quantity").value
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("Please select a color and quantity")
    //
    return
  }
  
  // Variable with all keys needed
  const storage = {
    id: productId,
    name: showName,
    price: takePrice,
    colors: color,
    quantity: Number(quantity),
    imageUrl: urlImg,
    altTxt: altImg
  }

  //localStorage / cache with all keys
  localStorage.setItem(productId, JSON.stringify(storage))

  // window.location.href to send us to url cart when "click" on button
  window.location.href = "cart.html"
})

