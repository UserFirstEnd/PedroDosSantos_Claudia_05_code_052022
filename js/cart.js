const cart = getProductsAdded()

cart.forEach((addedProducts) => displayProduct(addedProducts))
//Function to show the products added
function getProductsAdded() {
    // Array for adding products
    const cart = []
    //Take quantity added from localStorage
    const productsChosen = localStorage.length
    //Add products
    for (let i = 0; i < productsChosen; i++) {
        const addedProduct = localStorage.getItem(localStorage.key(i))
        //JSON.parse to create a spreadsheet
        const addedProducts = JSON.parse(addedProduct)
        cart.push(addedProducts)
    }
    return cart
}
//Function elements
function displayProduct(addedProducts) {

    // create article element
    const product = document.createElement('article')
    product.classList.add("cart__item")
    product.dataset.id = addedProducts.id
    product.dataset.colors = addedProducts.colors
    document.querySelector("#cart__items").appendChild(product)

    // create img element
    const img = document.createElement("img")
    img.src = addedProducts.imageUrl
    img.alt = addedProducts.altTxt
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    div.appendChild(img)
    product.appendChild(div)

    // create content element
    const content = document.createElement("div")
    content.classList.add("cart__item__content")
    document.querySelector("#cart__items").appendChild(content)
    product.appendChild(content)

    // create description element
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    content.appendChild(description)

    // create h2 = name element
    const h2 = document.createElement('h2')
    description.appendChild(h2)
    h2.textContent = addedProducts.name

    // create p = color element
    const p = document.createElement('p')
    description.appendChild(p)
    p.textContent = addedProducts.colors

    // create p = quantity element
    const p2 = document.createElement('p')
    description.appendChild(p2)
    p2.textContent = addedProducts.price + ' €'

    // create settings element
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    document.querySelector("#cart__items").appendChild(settings)
    content.appendChild(settings)

    // create settings quantity element
    const settingsQuantity = document.createElement("div")
    settingsQuantity.classList.add("cart__item__content__settings__quantity")
    settings.appendChild(settingsQuantity)

    // create p settings quantity element
    const quantityP = document.createElement('p')
    settingsQuantity.appendChild(quantityP)
    quantityP.textContent = "Qté:"

    // create input settings quantity element
    const input = document.createElement('input')
    input.type = "number"
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = addedProducts.quantity
    settingsQuantity.appendChild(input)

    // create deleteItem element
    const deleteItem = document.createElement("div")
    deleteItem.classList.add("cart__item__content__settings__delete")
    settings.appendChild(deleteItem)

    // event to delete article HTML and item from storage
    deleteItem.addEventListener("click", (event) => {
        event.preventDefault(quantity, price);
        const deleteProduct = deleteItem.closest('article')
        deleteProduct.remove()

        // delete item from storage
        const removeItemIdFromCache = `${addedProducts.id}`
        const removeItemColorsFromCache = `${addedProducts.colors}`
        localStorage.removeItem(removeItemIdFromCache, removeItemColorsFromCache)

        // reload page with updated data
        location.reload();
    })

    // create deleteItem p element
    const deleteItemP = document.createElement('p')
    deleteItem.appendChild(deleteItemP)
    deleteItemP.textContent = "Supprimer"

    // create functions to display new quantity and price added by the cart page (input)
    price()
    quantity()

    function quantity() {
        // create totalQuantity element + calculation
        const startQuantity = document.querySelector("#totalQuantity")
        const quantityProducts = cart.reduce((quantityProducts, addedProducts) => quantityProducts + addedProducts.quantity, 0)
        startQuantity.textContent = quantityProducts
    }

    function price() {
        // create totalPrice element + calculation
        const startPrice = document.querySelector("#totalPrice")
        const totalPriceQty = cart.reduce((totalPriceQty, addedProducts) => totalPriceQty + addedProducts.price * addedProducts.quantity, 0)
        startPrice.textContent = totalPriceQty
    }

    // event to change quantity
    input.addEventListener("input", () => updateGetProductsAdded(addedProducts.id, input.value))

    // function to update quantity
    function updateGetProductsAdded(id, updatedQuantity) {
        const updateCart = cart.find((addedProducts) => addedProducts.id === id)
        updateCart.quantity = Number(updatedQuantity)
        price()
        quantity()

        // function to change cache
        const newLocalStorage = JSON.stringify(addedProducts)
        localStorage.setItem(addedProducts.id, newLocalStorage)
    }
}

// form contact
const sendConfirmation = document.querySelector("#order");

// send confirmation
sendConfirmation.addEventListener("click", (e) => {
    e.preventDefault();
    // get data field on form
    const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    }
   
    // functions to check data field on form
    function checkFirstName() {
        const firstName = contact.firstName;
        if (/^[A-Za-z]{3,25}$/.test(firstName)) {
            return true
        } else {
            alert("Your FIRST NAME must not contain numbers and/or symbols,\nnor exceed 25 characters max and 3 characters min !")
            return false
        };
    }
    function checkLastName() {
        const lastName = contact.lastName;
        if (/^[A-Za-z]{3,25}$/.test(lastName)) {
            return true
        } else {
            alert("Your LAST NAME must not contain numbers and/or symbols,\nnor exceed 25 characters max and 3 characters min !")
            return false
        };
    }
    function checkCity() {
        const city = contact.city;
        if (/^[A-Za-z]{3,25}$/.test(city)) {
            return true
        } else {
            alert("Your CITY must not contain numbers and/or symbols,\nnor exceed 25 characters max and 3 characters min !")
            return false
        };
    }
    function checkAddress() {
        const address = contact.address;
        if (/^[a-zA-Z0-9\s,'-]*$/.test(address)) {
            return true
        } else {
            alert("Your ADDRESS must be valid !")
            return false
        };
    }
    function checkEmail() {
        const email = contact.email;
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{1,8}$/.test(email)) {
            return true
        } else {
            alert("Your EMAIL must be valid !")
            return false
        };
    }
    // if data form invalid, don't send data to localStorage
    if (checkFirstName(), checkLastName(), checkCity(), checkEmail(), checkAddress()) {
        // data on cache
        localStorage.setItem("contact", JSON.stringify(contact));
    } else {
        alert("Invalid input. Please, verify !");
    }
    // send products added + data form on storage
    let products = [];
    for (o = 0; o < cart.length; o++) {
        let productsId = cart[o].id;
        products.push(productsId)
    }
    const sendDataConfirmation = {
        products,
        contact,
    }
    console.log(contact)
    const confirmation = fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        body: JSON.stringify(sendDataConfirmation),
        headers: {
            "Content-Type": "application/json",

        },
    });
    console.log(confirmation)
    confirmation.then(async (response) => {
        try {
            console.log(response);

            const field = await response.json();
            console.log(field);
            if (response.ok) {
                localStorage.setItem("orderId", field.orderId);
                window.location.href = "\confirmation.html";
            } else {
                alert("Erreur : Problème serveur.");
            }
        } catch (e) {
            console.log(e);
        }
    })
});







