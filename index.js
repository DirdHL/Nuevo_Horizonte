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
 const header = document.querySelector(".main-header");
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

    imagenes.forEach(img => {
    img.addEventListener("click", () => {
        const link = img.getAttribute("data-link");
        if (link) window.location.href = link;
    });
});
});

/* ========================== */
/* 🎯 SLIDER DE LOGOS */
/* ========================== */
const track = document.querySelector(".logos-track");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let position = 0;
const slideWidth = 200; // desplazamiento por clic

rightArrow.addEventListener("click", () => {
  position -= slideWidth;
  if (Math.abs(position) >= track.scrollWidth / 1.5) {
    position = 0; // reiniciar si llega al final
  }
  track.style.transform = `translateX(${position}px)`;
});

leftArrow.addEventListener("click", () => {
  position += slideWidth;
  if (position > 0) {
    position = 0;
  }
  track.style.transform = `translateX(${position}px)`;
});

