// variable to store the products present in the localStorage
const cart = JSON.parse(localStorage.getItem("products"));

// if cart is empty, alert and returns to the homepage
if (!cart) {
    alert("Votre panier est vide !")
    window.location.href = "index.html";
};

// for each product in the localStorage, display it in the cart page
cart.forEach((addedProduct) => displayProduct(addedProduct));

// Function to delete price from localStorage
function deleteNonN() {
    for (i = 0; i < cart.length; i++) {
        delete cart[i].price
    }
    localStorage.setItem("products", JSON.stringify(cart))
}
deleteNonN();

//STRUCTURING OF HTML ELEMENTS ON CART.HTML////////////////////////////////////////////////////
// Creation of elements and their contents in the DOM

// Function to display each products
function displayProduct(addedProduct) {

    // Fetch to get price
    fetch("http://localhost:3000/api/products/" + addedProduct._id)
        .then(response => response.json())
        .then(async function (dataProductFromAPI) {
            dataProduct = await dataProductFromAPI;

            // Create the p price element
            const p2 = document.createElement('p');
            description.appendChild(p2);
            p2.textContent = `${dataProductFromAPI.price}` + ' €';

            addedProduct.price = Number(`${dataProduct.price}`);
            
            price();
        });

    // Create the element article
    const product = document.createElement('article');
    product.classList.add("cart__item");
    product.dataset._id = addedProduct._id;
    product.dataset.colors = addedProduct.colors;
    document.querySelector("#cart__items").appendChild(product);

    // Create the element for the img
    const img = document.createElement("img");
    img.src = addedProduct.imageUrl;
    img.alt = addedProduct.altTxt;
    const div = document.createElement("div");
    div.classList.add("cart__item__img");
    div.appendChild(img);
    product.appendChild(div);

    // Create the element for the content
    const content = document.createElement("div");
    content.classList.add("cart__item__content");
    document.querySelector("#cart__items").appendChild(content);
    product.appendChild(content);

    // Create the element for the description
    const description = document.createElement("div");
    description.classList.add("cart__item__content__description");
    content.appendChild(description);

    // Create the element for the h2 = name element
    const h2 = document.createElement('h2');
    description.appendChild(h2);
    h2.textContent = addedProduct.name;

    // Create the element for the p = color element
    const p = document.createElement('p');
    description.appendChild(p);
    p.textContent = addedProduct.colors;

    // Create the element for the settings
    const settings = document.createElement("div");
    settings.classList.add("cart__item__content__settings");
    document.querySelector("#cart__items").appendChild(settings);
    content.appendChild(settings);

    // Create the element for settings quantity
    const settingsQuantity = document.createElement("div");
    settingsQuantity.classList.add("cart__item__content__settings__quantity");
    settings.appendChild(settingsQuantity);

    // Create the element for the p settings quantity
    const quantityP = document.createElement('p');
    settingsQuantity.appendChild(quantityP);
    quantityP.textContent = "Qté:";

    // Create the element for input settings quantity
    const input = document.createElement('input');
    input.type = "number";
    input.name = "itemQuantity";
    input.min = "1";
    input.max = "100";
    input.value = addedProduct.quantity;
    input.dataset._id = addedProduct._id;
    input.dataset.colors = addedProduct.colors;
    settingsQuantity.appendChild(input);

    // Create the element for deleteItem
    const deleteItem = document.createElement("div");
    deleteItem.classList.add("cart__item__content__settings__delete");
    settings.appendChild(deleteItem);

    // Create the element for the deleteItem p
    const deleteItemP = document.createElement('p');
    deleteItem.appendChild(deleteItemP);
    deleteItem.dataset._id = addedProduct._id;
    deleteItem.dataset.colors = addedProduct.colors;
    deleteItemP.textContent = "Supprimer";

    quantity();
    takeProductFromStorage();
    addQuantityProduct();
}

// Functions to display new quantity on the DOM, added by the cart page (input)
function quantity() {
    // Create the element for the totalQuantity + calculation
    const quantity = document.querySelector("#totalQuantity");
    const quantityProducts = cart.reduce((quantityProducts, addedProduct) => quantityProducts + addedProduct.quantity, 0);
    quantity.textContent = quantityProducts;
};

// Functions to display new price on the DOM, added by the cart page (input)
function price() {
    // Create the element for the totalPrice + calculation
    const price = document.querySelector("#totalPrice");
    const totalPriceQty = cart.reduce((totalPriceQty, addedProduct) => totalPriceQty + addedProduct.price * addedProduct.quantity, 0);
    price.textContent = totalPriceQty;
}

//Function to add and remove quantity
function addQuantityProduct() {

    let checkAddedProducts = document.querySelectorAll("article input");
    // for each products in localStorage
    checkAddedProducts.forEach((updateQuantity) => {
        //Event to add and remove quantity 
        updateQuantity.addEventListener("click", (e) => {
            e.preventDefault();
            for (i = 0; i < cart.length; i++) {
                // checks from dataset, if the product to which we add a quantity is already in the localStorage with the same id and the same color, if yes add the quantity to this product
                if (cart[i]._id == updateQuantity.dataset._id && cart[i].colors == updateQuantity.dataset.colors && cart[i]._id == updateQuantity.dataset._id && cart[i].colors == updateQuantity.dataset.colors) {
                    return (
                        cart[i].quantity = Number(updateQuantity.value),
                        localStorage.setItem("products", JSON.stringify(cart)),
                        // update total price and quantity
                        quantity(),
                        price(),
                        // delete price from localStorage
                        deleteNonN(),
                        window.location.reload()
                    );
                };
            };
        });
    });
};

// Function to delete article HTML and item from storage
function takeProductFromStorage() {

    // Create the element for delete
    let deleteProducts = document.querySelectorAll(".cart__item__content__settings__delete");

    // for each products in localStorage
    deleteProducts.forEach((deleteProduct) => {
        // Event to delete article HTML and item from storage
        deleteProduct.addEventListener("click", (e) => {
            e.preventDefault();

            const selectedProduct = deleteProduct.closest('article');
            selectedProduct.remove();

            let allProductsRemoved = cart.length;
            // if we remove the last product from the cart
            if (allProductsRemoved == 1) {
                localStorage.removeItem("products");
                alert("Votre panier sera vide ! Veuillez sélectionner un produit.");
                window.location.href = "index.html";
                // else, filter the products in the cart and delete only the selected one
            } else {
                let newCartProducts = cart.filter(el => el._id != deleteProduct.dataset._id || el.colors != deleteProduct.dataset.colors);
                localStorage.setItem("products", JSON.stringify(newCartProducts));
                window.location.reload();
            };
        });
    })
};

// FORM CONTACT //////////////////////////////////////////////////////////
const sendConfirmation = document.querySelector("#order");
// Send confirmation
sendConfirmation.addEventListener("click", (e) => {
    e.preventDefault();

    // data field on form
    const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    }
    
    // Function to check the filled first name, with regEx
    function checkFirstName() {
        const firstName = contact.firstName;
        const getFirstNameMessageError = document.querySelector("#firstNameErrorMsg");
        if (/^[A-Za-z]{3,25}$/.test(firstName)) {
            return true
        } else {
            getFirstNameMessageError.innerHTML = "Votre PRENOM ne doit pas contenir de chiffres et/ou de symboles, ni dépasser 25 caractères max. et 3 caractères min. !";
            return innerHTML
        };
    }
    // Function to check the filled last name, with regEx
    function checkLastName() {
        const lastName = contact.lastName;
        const getLastNameMessageError = document.querySelector("#lastNameErrorMsg");
        if (/^[A-Za-z]{3,25}$/.test(lastName)) {
            return true
        } else {
            getLastNameMessageError.innerHTML = "Votre NOM ne doit pas contenir de chiffres et/ou de symboles, ni dépasser 25 caractères max. et 3 caractères min. !";
            return innerHTML
        };
    }
    // Function to check the filled city, with regEx
    function checkCity() {
        const city = contact.city;
        const getCityMessageError = document.querySelector("#cityErrorMsg");
        if (/^[A-Za-z]{3,25}$/.test(city)) {
            return true
        } else {
            getCityMessageError.innerHTML = "Votre VILLE ne doit pas contenir de chiffres et/ou de symboles, ni dépasser 25 caractères max. et 3 caractères min. !";
            return innerHTML
        };
    }
    // Function to check the filled address, with regEx
    function checkAddress() {
        const address = contact.address;
        const getAddressMessageError = document.querySelector("#addressErrorMsg");
        if (/^[a-zA-Z0-9\s,'-]*$/.test(address)) {
            return true
        } else {
            getAddressMessageError.innerHTML = "Votre ADRESSE doit être valide !";
            return innerHTML
        };
    }
    // Function to check the filled email, with regEx
    function checkEmail() {
        const email = contact.email;
        const getEmailMessageError = document.querySelector("#emailErrorMsg");
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{1,8}$/.test(email)) {
            return true
        } else {
            getEmailMessageError.innerHTML = "Votre EMAIL doit être valide !";
            return innerHTML
        };
    }
    // If data form invalid, don't send data to localStorage
    if (checkFirstName(), checkLastName(), checkCity(), checkEmail(), checkAddress()) {
        // set data on cache
        localStorage.setItem("contact", JSON.stringify(contact));
    } else {
        alert("Entrée invalide. Vérifiez s'il vous plaît !");
    }

    // Get an array with a string of products id's
    const products = [];
    for (i = 0; i < cart.length; i++) {
        let productsId = cart[i]._id;
        products.push(productsId)

    }
    // Define the contact object and the products array
    const sendDataConfirmation = {
        products,
        contact,
    }
    // Sending products and form contact to order page
    const confirmation = fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        body: JSON.stringify(sendDataConfirmation),
        headers: {
            "Content-Type": "application/json",
        },
    });
    // Send the order ID to localStorage and add the order ID number to the URL page confirmation address
    confirmation.then(async (response) => {
        try {
            const field = await response.json();
            if (response.ok) {
                localStorage.setItem("orderId", field.orderId);
                window.location.href = `\confirmation.html?orderId=${field.orderId}`;
            } else {
                alert("Erreur serveur !");
            }
        } catch (e) {
            console.log(e);
        }
    });
    takeContactFromStorage("contact");
});

// Function to not keep on localStorage the contact
function takeContactFromStorage(key) {
    localStorage.removeItem(key);
};




