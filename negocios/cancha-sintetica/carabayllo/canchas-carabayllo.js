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
    brisas: {
        base: "../../../img/canchas-carabayllo/brisas-img.png",
        400: "../../../img/canchas-carabayllo/brisas-400.png",
        500: "../../../img/canchas-carabayllo/brisas-500.png",
        600: "../../../img/canchas-carabayllo/brisas-600.png",
        700: "../../../img/canchas-carabayllo/brisas-700.png",
        800: "../../../img/canchas-carabayllo/brisas-800.png",
        900: "../../../img/canchas-carabayllo/brisas-900.png",
        1000: "../../../img/canchas-carabayllo/brisas-900.png",
        1100: "../../../img/canchas-carabayllo/brisas-900.png",
        1200: "../../../img/canchas-carabayllo/brisas-900.png"
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
            sources[3].srcset = data["700"];
            sources[4].srcset = data["800"];
            sources[5].srcset = data["900"];
            sources[6].srcset = data["1000"];
            sources[7].srcset = data["1100"];
            sources[8].srcset = data["1200"];
        }, 300);
    });
});



// =========================
// FILTRO DE GALERÍA (mantiene altura reducida tras filtrar)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const filtros = document.querySelectorAll(".galeria-filtros button");
  const items = Array.from(document.querySelectorAll(".galeria-item"));
  const grid = document.querySelector(".galeria-grid");
  const wrapper = document.querySelector(".galeria-grid-wrapper");
  const ANIM_DUR = 600; 

  function getVisibles(filter) {
    return (filter === "todo") ? items.slice() : items.filter(i => i.classList.contains(filter));
  }

  function applyFilter(filter) {
    const startHeight = wrapper.offsetHeight;
    const visibles = getVisibles(filter);
    const ocultos = items.filter(i => !visibles.includes(i));

    items.forEach(it => it.classList.add("oculto"));

    visibles.forEach(v => grid.appendChild(v));
    ocultos.forEach(h => grid.appendChild(h));
    void grid.offsetWidth; 

  

    ocultos.forEach(h => {
      h.__oldDisplay = h.style.display;
      h.style.display = "none";
    });
    requestAnimationFrame(() => {
      const endHeight = grid.scrollHeight;

      ocultos.forEach(h => {
        h.style.display = h.__oldDisplay || "";
        delete h.__oldDisplay;
      });
      
      wrapper.style.height = startHeight + "px";
      void wrapper.offsetWidth;
      wrapper.classList.add("animando");

      requestAnimationFrame(() => {
        wrapper.style.height = endHeight + "px";
      });

      setTimeout(() => {
        wrapper.classList.remove("animando");
        if (filter === "todo") {
          wrapper.style.height = "auto";
        } else {
          wrapper.style.height = endHeight + "px"; // se queda ahí
        }
      }, ANIM_DUR);

      setTimeout(() => {
        visibles.forEach(v => v.classList.remove("oculto"));
      }, 40);
    });
  }

  filtros.forEach(btn => {
    btn.addEventListener("click", () => {
      filtros.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
      const filtro = btn.getAttribute("data-filter");
      applyFilter(filtro);
    });
  });

if (window.innerWidth <= 768) {
  setTimeout(() => applyFilter("pinos"), 100);
} else {
  setTimeout(() => applyFilter("todo"), 100);
}
});

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});


