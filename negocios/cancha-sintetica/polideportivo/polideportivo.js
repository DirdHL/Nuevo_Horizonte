const btnMenu = document.querySelector(".btn-izquierda");
const barra = document.querySelector(".rectangulo-superior");

btnMenu.addEventListener("click", () => {
    barra.classList.toggle("expandido");
});

