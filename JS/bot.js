const messages = [
    "¿Puedo ayudarte?",
    "Trabaja conmigo en un clic!",
    "Estoy aquí para lo que necesites"
];

const container = document.getElementById("messages-container");
let index = 0;

function showMessage() {
    const message = document.createElement("p");
    message.className = "message";
    message.textContent = messages[index];
    container.appendChild(message);

    message.style.animationName = "slideIn";
    setTimeout(() => {
        message.style.animationName = "slideOut";
        message.addEventListener("animationend", () => {
            message.remove();
            index = (index + 1) % messages.length;
            showMessage();
        }, { once: true });

    }, 13000);
}

showMessage();