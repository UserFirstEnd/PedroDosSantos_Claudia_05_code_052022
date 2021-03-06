// location.search to retrieve the url order id parameter
const urlParams = new URLSearchParams(location.search);
const orderId = urlParams.get("orderId");

//Selecting element on the DOM to display id on confirmation window (HTML)
const confirmationId = document.querySelector("#limitedWidthBlock")

const confirmationWindowId = `<div class="confirmation">
    <p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">${orderId}</span></p>
</div>
`;

//Injecting HTML
confirmationId.insertAdjacentHTML("afterbegin", confirmationWindowId);

// Function to not keep on localStorage the id order and products
function takeIdFromStorage(key) {
    localStorage.removeItem(key);
};
takeIdFromStorage("orderId");