  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Abrir/cerrar hamburguesa SOLO en móvil
  hamburger.addEventListener('click', () => {
    if (window.innerWidth > 1240) return; // ❌ Evita bugs en PC

    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('show');
  });

  // Cerrar menú al hacer clic fuera SOLO en móvil
  document.addEventListener('click', (e) => {
    if (window.innerWidth > 1240) return; // ❌ No afecta PC

    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('show');
    }
  });

  // Cerrar hamburguesa cuando tocan un enlace FINAL
  document.querySelectorAll('.mega-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth > 1240) return; // ❌ En PC NO cerrar
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('show');
    });
  });

  // ===  ACORDEÓN MÓVIL (solo uno abierto a la vez) ===
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth > 1240) return; // ❌ Evita que PC use acordeón

      e.preventDefault();

      const currentMenu = toggle.parentElement.querySelector(".mega-menu");

      if (currentMenu.classList.contains("open")) {
        currentMenu.classList.remove("open");
        return;
      }

      document.querySelectorAll(".mega-dropdown .mega-menu.open").forEach(menu => {
        if (menu !== currentMenu) menu.classList.remove("open");
      });

      currentMenu.classList.add("open");
    });
  });

  // ===  HEADER SE OSCURECE CON EL SCROLL ===
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
});


  // === ROMPEZABEZAS ===
document.addEventListener("DOMContentLoaded", () => {
    const piezas = document.querySelectorAll(".pieza");
    const imagenes = document.querySelectorAll(".pieza img");

    /* === ANIMACIÓN DE ENTRADA === */
    setTimeout(() => {
        piezas.forEach((pieza, index) => {
            setTimeout(() => {
                pieza.classList.add("activo");
            }, index * 400);
        });
    }, 1000);

    /* === ACTIVAR HOVER DESPUÉS DE 3.5s === */
    setTimeout(() => {
        piezas.forEach(pieza => {
            pieza.classList.add("hover-enabled");
            pieza.style.pointerEvents = "auto"; 
        });
    }, 3500);

    /* === CAMBIO SUAVE DE IMAGEN SIN OPACITY === */
    imagenes.forEach(img => {
        const original = img.src;
        const hoverImg = img.getAttribute("data-hover");

        img.addEventListener("mouseenter", () => {
            img.src = hoverImg;
        });

        img.addEventListener("mouseleave", () => {
            img.src = original;
        });
    });

    /* === CLICK PARA ABRIR PÁGINA EN OTRA PESTAÑA === */
    imagenes.forEach(img => {
        img.addEventListener("click", () => {
            const link = img.getAttribute("data-link");
            if (link) window.open(link, "_blank");
        });
    });
});

// === VERSIÓN MÓVIL ===
if (window.innerWidth < 768) {
    const piezasM = document.querySelectorAll(".pieza-m");
    const imagenesM = document.querySelectorAll(".pieza-m img");

    imagenesM.forEach(img => {
        let tocado = false;
        const parent = img.parentElement;
        const original = img.src;
        const hoverImg = img.getAttribute("data-hover");
        const link = img.getAttribute("data-link");

        img.addEventListener("click", () => {

            // Cerrar todas las demás antes de abrir esta
            piezasM.forEach(p => {
                if (p !== parent) p.classList.remove("expandida");
            });

            if (!tocado) {
                // Expandir la pieza tocada
                parent.classList.add("expandida");
                img.src = hoverImg;
                tocado = true;

                // Reset si no hay segundo click
                setTimeout(() => {
                    tocado = false;
                }, 2000);

            } else {
                // Segundo click = abrir link
                window.open(link, "_blank");
            }
        });
    });
}
