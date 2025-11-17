document.getElementById("logo-link").onclick = () => location.reload();

const botones = document.querySelectorAll(".selector-btn");
const imagenCancha = document.getElementById("cancha-image");
const mapaBtn = document.querySelector(".mini-btn-link"); // <--- botón de mapa

botones.forEach(btn => {
    btn.addEventListener("click", () => {
        
        const target = btn.dataset.target;

        if (target === "pinos") {

            // Imagen
            imagenCancha.style.opacity = 0;
            setTimeout(() => {
                imagenCancha.src = "../../../img/canchas-carabayllo/pinos-img.png";
                imagenCancha.style.opacity = 1;
            }, 300);

            // MAPA ➜ LOS PINOS
            mapaBtn.href ="https://maps.app.goo.gl/SLa8suG5T4r9CnCT6";   // <- PON AQUI EL MAPA DE LOS PINOS
        }

        if (target === "brisass") {

            // Imagen
            imagenCancha.style.opacity = 0;
            setTimeout(() => {
                imagenCancha.src = "../../../img/canchas-carabayllo/brisas-img.png";
                imagenCancha.style.opacity = 1;
            }, 300);

            // MAPA ➜ LAS BRISAS
            mapaBtn.href = "https://maps.app.goo.gl/Y5f3dEs4SyYwxkQG6";   // <- PON AQUI EL MAPA DE LAS BRISAS
        }
    });
});
