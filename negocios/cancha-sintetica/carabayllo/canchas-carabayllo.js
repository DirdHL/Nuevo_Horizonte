document.getElementById("logo-link").onclick = () => location.reload();

const botones = document.querySelectorAll(".selector-btn");
const imagenCancha = document.getElementById("cancha-image");

botones.forEach(btn => {
    btn.addEventListener("click", () => {
        
        const target = btn.dataset.target;

        if (target === "pinos") {
            imagenCancha.style.opacity = 0;
            setTimeout(() => {
                imagenCancha.src = "../../../img/canchas-carabayllo/pinos-img.png";
                imagenCancha.style.opacity = 1;
            }, 300);
        }

        if (target === "brisass") {
            imagenCancha.style.opacity = 0;
            setTimeout(() => {
                imagenCancha.src = "../../../img/canchas-carabayllo/brisas-img.png";
                imagenCancha.style.opacity = 1;
            }, 300);
        }
    });
});
