//Take the orderId form localStorage
const orderId = localStorage.getItem("orderId");
console.log(`orderId : ${orderId}`);

//Selecting element on the DOM to display id on confirmation window (HTML)
const confirmationId = document.querySelector("#limitedWidthBlock")

const confirmationWindowId = `<div class="confirmation">
    <p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">${orderId}</span></p>
</div>
`;

//Injecting HTML
confirmationId.insertAdjacentHTML("afterbegin", confirmationWindowId);

//Do not keep on localStorage the id order and products
function takeIdFromStorage(key) {
    localStorage.removeItem(key);
};

takeIdFromStorage("orderId");