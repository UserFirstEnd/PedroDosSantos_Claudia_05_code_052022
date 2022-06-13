const cart = getProductsAdded();

cart.forEach((addedProducts) => displayProduct(addedProducts));
//Function to get the products added to localStorage by key (lenght)
function getProductsAdded() {
    // Array for adding products
    const cart = [];
    //Take quantity added from localStorage
    const productsChosen = localStorage.length;
    //Add products
    for (let i = 0; i < productsChosen; i++) {
        const addedProduct = localStorage.getItem(localStorage.key(i));
        //JSON.parse to create a spreadsheet
        const addedProducts = JSON.parse(addedProduct);
        cart.push(addedProducts);
    }
    return cart
}

console.log(cart)

//STRUCTURING OF HTML ELEMENTS ON CART.HTML////////////////////////////////////////////////////
//Function with all elements to display
function displayProduct(addedProducts) {
    // Create article element
    const product = document.createElement('article');
    product.classList.add("cart__item");
    product.dataset.id = addedProducts[0].id;
    product.dataset.colors = addedProducts[0].colors;
    document.querySelector("#cart__items").appendChild(product);

    // Create img element
    const img = document.createElement("img");
    img.src = addedProducts[0].imageUrl;
    img.alt = addedProducts[0].altTxt;
    const div = document.createElement("div");
    div.classList.add("cart__item__img");
    div.appendChild(img);
    product.appendChild(div);

    // Create content element
    const content = document.createElement("div");
    content.classList.add("cart__item__content");
    document.querySelector("#cart__items").appendChild(content);
    product.appendChild(content);

    // Create description element
    const description = document.createElement("div");
    description.classList.add("cart__item__content__description");
    content.appendChild(description);

    // Create h2 = name element
    const h2 = document.createElement('h2');
    description.appendChild(h2);
    h2.textContent = addedProducts[0].name;

    // Create p = color element
    const p = document.createElement('p');
    description.appendChild(p);
    p.textContent = addedProducts.colors;

    // Create p = quantity element
    const p2 = document.createElement('p');
    description.appendChild(p2);
    p2.textContent = addedProducts[0].price + ' €';

    // Create settings element
    const settings = document.createElement("div");
    settings.classList.add("cart__item__content__settings");
    document.querySelector("#cart__items").appendChild(settings);
    content.appendChild(settings);

    // Create settings quantity element
    const settingsQuantity = document.createElement("div");
    settingsQuantity.classList.add("cart__item__content__settings__quantity");
    settings.appendChild(settingsQuantity);

    // Create p settings quantity element
    const quantityP = document.createElement('p');
    settingsQuantity.appendChild(quantityP);
    quantityP.textContent = "Qté:";

    // Create input settings quantity element
    const input = document.createElement('input');
    input.type = "number";
    input.name = "itemQuantity";
    input.min = "1";
    input.max = "100";
    input.value = addedProducts[0].quantity;
    settingsQuantity.appendChild(input);

    // Create deleteItem element
    const deleteItem = document.createElement("div");
    deleteItem.classList.add("cart__item__content__settings__delete");
    settings.appendChild(deleteItem);

    // Event to delete article HTML and item from storage
    deleteItem.addEventListener("click", (event) => {
        event.preventDefault(quantity, price);
        const deleteProduct = deleteItem.closest('article');
        deleteProduct.remove();

        // Delete item from storage
        const removeItemIdFromCache = `${addedProducts[0].id}`;
        const removeItemColorsFromCache = `${addedProducts[0].colors}`;

        localStorage.removeItem(removeItemIdFromCache, removeItemColorsFromCache);

        // If a product is deleted, take him out of the localStorage
        function takeProductFromStorage(key) {
            localStorage.removeItem(key);
        };
        takeProductFromStorage();

        // Reload page with updated data
        location.reload();
    })

    // Create deleteItem p element
    const deleteItemP = document.createElement('p');
    deleteItem.appendChild(deleteItemP);
    deleteItemP.textContent = "Supprimer";

    // Create functions to display new quantity and price added by the cart page (input)
    price()
    quantity()

    function quantity() {
        // Create totalQuantity element + calculation
        const startQuantity = document.querySelector("#totalQuantity");
        const quantityProducts = cart.reduce((quantityProducts, addedProducts) => quantityProducts + addedProducts[0].quantity, 0);
        startQuantity.textContent = quantityProducts;
    }

    function price() {
        // Create totalPrice element + calculation
        const startPrice = document.querySelector("#totalPrice");
        const totalPriceQty = cart.reduce((totalPriceQty, addedProducts) => totalPriceQty + addedProducts[0].price * addedProducts[0].quantity, 0);
        startPrice.textContent = totalPriceQty;
    }

    // Event to change quantity
    input.addEventListener("input", () => updateGetProductsAdded(addedProducts.id, input.value));

    // Function to update quantity
    function updateGetProductsAdded(id, updatedQuantity) {
        const updateCart = cart.find((addedProducts) => addedProducts.id === id);
        updateCart[0].quantity = Number(updatedQuantity);
        console.log(updatedQuantity)
        console.log(updateCart)
        price();
        quantity();

        // Function to change cache
        const newLocalStorage = JSON.stringify(addedProducts);
        localStorage.setItem(addedProducts.id, newLocalStorage);
    }
}

// FORM CONTACT //////////////////////////////////////////////////////////
const sendConfirmation = document.querySelector("#order");
// Send confirmation
let addedProducts = products = [];

sendConfirmation.addEventListener("click", (e) => {
    e.preventDefault();
    // Get data field on form
    const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    }

    //Functions to check data field on form with regEx
    function checkFirstName() {
        const firstName = contact.firstName;
        if (/^[A-Za-z]{3,25}$/.test(firstName)) {
            return true
        } else {
            alert("Votre PRENOM ne doit pas contenir de chiffres et/ou de symboles,\ni dépasser 25 caractères max et 3 caractères min !")
            return false
        };
    }
    function checkLastName() {
        const lastName = contact.lastName;
        if (/^[A-Za-z]{3,25}$/.test(lastName)) {
            return true
        } else {
            alert("Votre NOM ne doit pas contenir de chiffres et/ou de symboles,\ni dépasser 25 caractères max et 3 caractères min !")
            return false
        };
    }
    function checkCity() {
        const city = contact.city;
        if (/^[A-Za-z]{3,25}$/.test(city)) {
            return true
        } else {
            alert("Votre VILLE ne doit pas contenir de chiffres et/ou de symboles,\ne pas dépasser 25 caractères max et 3 caractères min !")
            return false
        };
    }
    function checkAddress() {
        const address = contact.address;
        if (/^[a-zA-Z0-9\s,'-]*$/.test(address)) {
            return true
        } else {
            alert("Votre ADRESSE doit être valide !")
            return false
        };
    }
    function checkEmail() {
        const email = contact.email;
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{1,8}$/.test(email)) {
            return true
        } else {
            alert("Votre EMAIL doit être valide !")
            return false
        };
    }

    // If data form invalid, don't send data to localStorage
    if (checkFirstName(), checkLastName(), checkCity(), checkEmail(), checkAddress()) {
        // data on cache
        localStorage.setItem("contact", JSON.stringify(contact));
    } else {
        alert("Entrée invalide. Vérifiez s'il vous plaît !");
    }
    // Define the contact object and the products array
    const sendDataConfirmation = {
        products,
        contact,
    }
    console.log(contact)
    // Sending products and form contact to order page
    const confirmation = fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        body: JSON.stringify(sendDataConfirmation),
        headers: {
            "Content-Type": "application/json",

        },
    });
    console.log(confirmation);
    confirmation.then(async (response) => {
        try {
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
    });
    //Do not keep on localStorage the contact
    function takeContactFromStorage(key) {
        localStorage.removeItem(key);
    };
    takeContactFromStorage("contact");
});







