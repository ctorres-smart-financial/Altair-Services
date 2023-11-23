let headerContainer = document.querySelector(".header-container");
let confirmMessage = document.getElementById("confirmMessage");
let generarEstado = document.getElementById("generarEstado");
let loadingIcon = document.querySelector(".loading-icon");
generarEstado.addEventListener('click', (event) => {
    event.preventDefault();

    fetch('/execute-script')
        .then((response) => {
            console.log("Solicitud ejecutada: ", response)
        })
        .catch((error) => {
            console.log("Ha ocurrido un error en la solicitud: ", error);
        });
    generarEstado.disabled = true;
    generarEstado.setAttribute("class", "btn btn-dark pe-none");
    generarEstado.innerText = "Generando...";
    console.log("Botón deshabilitado por dos minutos");

    setTimeout(() => {
        window.location.reload();
    }, 120000)
    loadingIcon.classList.add("spinner-border");
    confirmMessage.innerText = "El reporte se está generando.\n Vuelve a visitar la pagina en unos minutos.";
    headerContainer.appendChild(confirmMessage)
})