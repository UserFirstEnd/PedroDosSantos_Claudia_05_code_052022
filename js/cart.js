// variable to store the products present in the localStorage
const cart = JSON.parse(localStorage.getItem("products"));

// if cart is empty, alert and returns to the homepage
if (!cart) {
    alert("Votre panier est vide !")
    window.location.href = "index.html";
};

/*function deleteNonN() {
    for (i = 0; i < cart.length; i++) {
       return (delete (cart[i].price));
    }
}
deleteNonN();*/

// for each product in the localStorage, display it in the cart page
cart.forEach((addedProducts) => displayProduct(addedProducts));

//STRUCTURING OF HTML ELEMENTS ON CART.HTML////////////////////////////////////////////////////
// Creation of elements and their contents in the DOM
function displayProduct(addedProducts) {

    // Create the element article
    const product = document.createElement('article');
    product.classList.add("cart__item");
    product.dataset._id = addedProducts._id;
    product.dataset.colors = addedProducts.colors;
    document.querySelector("#cart__items").appendChild(product);

    // Create the element for the img
    const img = document.createElement("img");
    img.src = addedProducts.imageUrl;
    img.alt = addedProducts.altTxt;
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
    h2.textContent = addedProducts.name;

    // Create the element for the p = color element
    const p = document.createElement('p');
    description.appendChild(p);
    p.textContent = addedProducts.colors;

    // Create the element for the p = quantity element
    const p2 = document.createElement('p');
    description.appendChild(p2);
    p2.textContent = addedProducts.price + ' €';

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
    input.value = addedProducts.quantity;
    input.dataset._id = addedProducts._id;
    input.dataset.colors = addedProducts.colors;
    settingsQuantity.appendChild(input);

    // Create the element for deleteItem
    const deleteItem = document.createElement("div");
    deleteItem.classList.add("cart__item__content__settings__delete");
    settings.appendChild(deleteItem);

    // Create the element for the deleteItem p
    const deleteItemP = document.createElement('p');
    deleteItem.appendChild(deleteItemP);
    deleteItem.dataset._id = addedProducts._id;
    deleteItem.dataset.colors = addedProducts.colors;
    deleteItemP.textContent = "Supprimer";

    price();
    quantity();
    takeProductFromStorage();
    addQuantityProduct();
}

// Functions to display new quantity and price added by the cart page (input)
function quantity() {
    // Create the element for the totalQuantity + calculation
    const startQuantity = document.querySelector("#totalQuantity");
    const quantityProducts = cart.reduce((quantityProducts, addedProducts) => quantityProducts + addedProducts.quantity, 0);
    startQuantity.textContent = quantityProducts;
};
function price() {
    // Create the element for the totalPrice + calculation
    const startPrice = document.querySelector("#totalPrice");
    const totalPriceQty = cart.reduce((totalPriceQty, addedProducts) => totalPriceQty + addedProducts.price * addedProducts.quantity, 0);
    startPrice.textContent = totalPriceQty;
    console.log(totalPriceQty)
};

//Function to add and remove quantity
function addQuantityProduct() {

    let checkAddedProducts = document.querySelectorAll("article input");

    // for each products in localStorage
    checkAddedProducts.forEach((updateQuantity) => {
        //Event to add and remove quantity 
        updateQuantity.addEventListener("click", () => {
            for (i = 0; i < cart.length; i++) {
                // checks from dataset, if the product to which we add a quantity is already in the localStorage with the same id and the same color, if yes add the quantity to this product
                if (cart[i]._id == updateQuantity.dataset._id && cart[i].colors == updateQuantity.dataset.colors) {
                    return (
                        cart[i].quantity = Number(updateQuantity.value),
                        localStorage.setItem("products", JSON.stringify(cart)),
                        // update total price and quantity
                        quantity(),
                        price()
                    );
                };
            };
        });
    });
};

// Function to delete article HTML and item from storage
function takeProductFromStorage() {

    let deleteProducts = document.querySelectorAll(".cart__item__content__settings__delete");

    // for each products in localStorage
    deleteProducts.forEach((deleteProduct) => {
        // Event to delete article HTML and item from storage
        deleteProduct.addEventListener("click", () => {
            const tagOfTheSelected = deleteProduct.closest('article');
            tagOfTheSelected.remove();

            let allProductsRemoved = cart.length;

            if (allProductsRemoved == 1) {
                localStorage.removeItem("products");
                alert("Votre panier sera vide ! Veuillez sélectionner un produit.");
                window.location.href = "index.html";
            } else {
                let someProducts = cart.filter(el => el._id != deleteProduct.dataset._id || el.colors != deleteProduct.dataset.colors);
                localStorage.setItem("products", JSON.stringify(someProducts));
                location.reload();
            };
        });
    })
};

// FORM CONTACT //////////////////////////////////////////////////////////
const sendConfirmation = document.querySelector("#order");
// Send confirmation
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
    // Get an array with a string of products id's
    const products = [];
    for (i = 0; i < cart.length; i++) {
        let productsId = cart[i]._id;
        products.push(productsId)

    }
    //Functions to check data field on form with regEx
    function checkFirstName() {
        const firstName = contact.firstName;
        if (/^[A-Za-z]{3,25}$/.test(firstName)) {
            return true
        } else {
            alert("Votre PRENOM ne doit pas contenir de chiffres et/ou de symboles, ni dépasser 25 caractères max. et 3 caractères min. !")
        };
    }
    function checkLastName() {
        const lastName = contact.lastName;
        if (/^[A-Za-z]{3,25}$/.test(lastName)) {
            return true
        } else {
            alert("Votre NOM ne doit pas contenir de chiffres et/ou de symboles, ni dépasser 25 caractères max. et 3 caractères min. !")
        };
    }
    function checkCity() {
        const city = contact.city;
        if (/^[A-Za-z]{3,25}$/.test(city)) {
            return true
        } else {
            alert("Votre VILLE ne doit pas contenir de chiffres et/ou de symboles, ni dépasser 25 caractères max. et 3 caractères min. !")
        };
    }
    function checkAddress() {
        const address = contact.address;
        if (/^[a-zA-Z0-9\s,'-]*$/.test(address)) {
            return true
        } else {
            alert("Votre ADRESSE doit être valide !")
        };
    }
    function checkEmail() {
        const email = contact.email;
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{1,8}$/.test(email)) {
            return true
        } else {
            alert("Votre EMAIL doit être valide !")
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
    // Sending products and form contact to order page
    const confirmation = fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        body: JSON.stringify(sendDataConfirmation),
        headers: {
            "Content-Type": "application/json",
        },
    });
    //
    confirmation.then(async (response) => {
        try {
            const field = await response.json();
            console.log(field);
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

//Do not keep on localStorage the contact
function takeContactFromStorage(key) {
    localStorage.removeItem(key);
};






