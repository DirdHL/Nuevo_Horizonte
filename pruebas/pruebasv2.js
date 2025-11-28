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

      


document.addEventListener("DOMContentLoaded", () => {
    const piezas = document.querySelectorAll(".pieza");

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
            pieza.style.pointerEvents = "auto"; // 🔓 activar hover
        });
    }, 3500);

    /* ======================================= */
    /* ⭐ EFECTO HOVER MEJORADO (CROSSFADE) ⭐ */
    /* ======================================= */
    piezas.forEach(pieza => {
        const original = pieza.src;
        const hoverImg = pieza.getAttribute("data-hover");

        // Hover: cambiar imagen con suave desvanecimiento
        pieza.addEventListener("mouseenter", () => {
            pieza.style.transition = "opacity 0.2s ease";
            pieza.style.opacity = "0";

            setTimeout(() => {
                pieza.src = hoverImg;
                pieza.style.opacity = "1";
            }, 180);
        });

        // Salida: volver a la original igual de suave
        pieza.addEventListener("mouseleave", () => {
            pieza.style.opacity = "0";

            setTimeout(() => {
                pieza.src = original;
                pieza.style.opacity = "1";
            }, 180);
        });
    });

});



