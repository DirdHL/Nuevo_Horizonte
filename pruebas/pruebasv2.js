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

// ===  CARRUSEL AUTOMÁTICO ===
const cards = document.querySelectorAll(".card");
let current = 0;

function updateCarousel() {
  const total = cards.length;
  const left = (current - 1 + total) % total;
  const right = (current + 1) % total;

  // Reiniciar clases
  cards.forEach(card => {
    card.classList.remove("card-left", "card-center", "card-right", "card-hidden");
  });

  // Setear posiciones
  cards[left].classList.add("card-left");
  cards[current].classList.add("card-center");
  cards[right].classList.add("card-right");

  // Ocultar el resto
  cards.forEach((card, index) => {
    if (index !== left && index !== current && index !== right) {
      card.classList.add("card-hidden");
    }
  });

  // Avanzar
  current = (current + 1) % total;
}

// Primera ejecución
updateCarousel();

// Intervalo automático
setInterval(updateCarousel, 5000);



