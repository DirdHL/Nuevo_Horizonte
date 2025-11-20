document.getElementById("logo-link").onclick = () => location.reload();

// ----------------------------
// SELECTORES
// ----------------------------
const botones = document.querySelectorAll(".selector-btn");
const picture = document.getElementById("cancha-picture");
const img = document.getElementById("cancha-image");
const miniBtn = document.querySelector(".mini-btn");

// ----------------------------
// BASE DE DATOS DE IMÁGENES
// ----------------------------
const imagenes = {
    pinos: {
        base: "../../../img/canchas-carabayllo/pinos-img.png",
    },
    brisas: {
        base: "../../../img/canchas-carabayllo/brisas-img.png",
    }
};

// ----------------------------
// CAMBIO DE CANCHA
// ----------------------------
botones.forEach(btn => {
    btn.addEventListener("click", () => {

        const target = btn.dataset.target;
        const data = imagenes[target];

        picture.classList.add("fade");
        miniBtn.classList.add("fade");

        setTimeout(() => {

            img.src = data.base;

            picture.classList.remove("fade");
            miniBtn.classList.remove("fade");

        }, 300);
    });
});



// ----------------------------
// FILTRO GALERÍA
// ----------------------------
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
      });

      wrapper.style.height = startHeight + "px";
      void wrapper.offsetWidth;
      wrapper.classList.add("animando");

      requestAnimationFrame(() => {
        wrapper.style.height = endHeight + "px";
      });

      setTimeout(() => {
        wrapper.classList.remove("animando");
        wrapper.style.height = filter === "todo" ? "auto" : endHeight + "px";
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
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  setTimeout(() => {
    applyFilter(window.innerWidth <= 768 ? "pinos" : "todo");
  }, 100);
});

// ----------------------------
// AÑO FOOTER
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
