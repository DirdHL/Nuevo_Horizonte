document.getElementById("logo-link").onclick = () => location.reload();

const botones = document.querySelectorAll(".selector-btn");
const picture = document.getElementById("cancha-picture");
const img = document.getElementById("cancha-image");
const miniBtn = document.querySelector(".mini-btn");
const miniBtnLink = document.querySelector(".mini-btn-link");

// IMÁGENES PRINCIPALES + MINI BOTÓN
const imagenes = {
    pinos: { 
        base: "../../../img/canchas-carabayllo/pinos-img.png",
        mini: "../../../img/canchas-carabayllo/mapa-pinos.svg"
    },
    brisas: { 
        base: "../../../img/canchas-carabayllo/brisas-img.png",
        mini: "../../../img/canchas-carabayllo/mapa-brisas.svg"
    }
};

// LINKS DE MAPS
const enlaces = {
    pinos: "https://maps.app.goo.gl/zKjqeW65dJeSee81A",
    brisas: "https://maps.app.goo.gl/qUA4BQsMQPLgYjtY7"
};

botones.forEach(btn => {
    btn.addEventListener("click", () => {

        const target = btn.dataset.target;
        const data = imagenes[target];

        picture.classList.add("fade");
        miniBtn.classList.add("fade");

        setTimeout(() => {

            // cambiar imagen principal
            img.src = data.base;

            // cambiar imagen del mini botón
            miniBtn.src = data.mini;

            // cambiar enlace del mini botón
            miniBtnLink.href = enlaces[target];

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

const modal = document.getElementById("modal-img");
const modalImg = document.getElementById("modal-img-content");
const closeModal = document.querySelector(".modal-close");

document.querySelectorAll(".galeria-item img").forEach(img => {
    img.addEventListener("click", (e) => {
        e.stopPropagation(); // evita que el clic pase y cierre el modal
        modal.style.display = "block";
        modalImg.src = img.src;
        document.body.classList.add("modal-open"); // desactivar scroll y reordenamientos
    });
});

// Cerrar con X
closeModal.onclick = () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
};

// Cerrar al hacer clic FUERA
modal.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    }
};
