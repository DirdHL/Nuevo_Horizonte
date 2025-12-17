const btnMenu = document.querySelector(".btn-izquierda");
const barra = document.querySelector(".rectangulo-superior");

btnMenu.addEventListener("click", () => {
    // Solo PC
    if (window.innerWidth > 800) {
        barra.classList.toggle("expandido");
    }
});
