document.getElementById("logo-link").onclick = () => location.reload();

const botones = document.querySelectorAll(".selector-btn");
const picture = document.getElementById("cancha-picture");
const img = document.getElementById("cancha-image");

const imagenes = {
    pinos: {
        base: "../../../img/canchas-carabayllo/pinos-img.png",
        400: "../../../img/canchas-carabayllo/pinos-400.png",
        500: "../../../img/canchas-carabayllo/pinos-500.png",
        600: "../../../img/canchas-carabayllo/pinos-600.png",
        800: "../../../img/canchas-carabayllo/pinos-800.png"
    },
    brisass: {
        base: "../../../img/canchas-carabayllo/brisas-img.png",
        400: "../../../img/canchas-carabayllo/brisas-400.png",
        500: "../../../img/canchas-carabayllo/brisas-500.png",
        600: "../../../img/canchas-carabayllo/brisas-600.png",
        800: "../../../img/canchas-carabayllo/brisas-800.png"
    }
};

botones.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        const data = imagenes[target];

        img.style.opacity = 0;

        setTimeout(() => {

            // Actualizar <img>
            img.src = data.base;
            img.style.opacity = 1;

            // Actualizar <source>
            const sources = picture.querySelectorAll("source");
            sources[0].srcset = data["400"];
            sources[1].srcset = data["500"];
            sources[2].srcset = data["600"];
            sources[3].srcset = data["800"];

        }, 300);
    });
});

