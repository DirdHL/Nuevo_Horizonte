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
        700: "../../../img/canchas-carabayllo/pinos-700.png",
        800: "../../../img/canchas-carabayllo/pinos-800.png",
        900: "../../../img/canchas-carabayllo/pinos-900.png",
        1000: "../../../img/canchas-carabayllo/pinos-1000.png",
        1100: "../../../img/canchas-carabayllo/pinos-1100.png",
        1200: "../../../img/canchas-carabayllo/pinos-1200.png"

    },
    brisass: {
        base: "../../../img/canchas-carabayllo/brisas-img.png",
        400: "../../../img/canchas-carabayllo/brisas-400.png",
        500: "../../../img/canchas-carabayllo/brisas-500.png",
        600: "../../../img/canchas-carabayllo/brisas-600.png",
        700: "../../../img/canchas-carabayllo/brisas-700.png",
        800: "../../../img/canchas-carabayllo/brisas-800.png",
        900: "../../../img/canchas-carabayllo/brisas-900.png",
        1000: "../../../img/canchas-carabayllo/brisas-1000.png",
        1100: "../../../img/canchas-carabayllo/brisas-1100.png",
        1200: "../../../img/canchas-carabayllo/brisas-1200.png"
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
            sources[4].srcset = data["900"];
            sources[5].srcset = data["1000"];
            sources[6].srcset = data["1100"];
            sources[7].srcset = data["1200"];
        }, 300);
    });
});

