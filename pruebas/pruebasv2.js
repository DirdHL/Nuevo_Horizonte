const hamburger = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Abrir/cerrar hamburguesa
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('show');
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('show');
  }
});

// Cerrar hamburguesa solo cuando toquen un enlace FINAL
document.querySelectorAll('.mega-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('show');
  });
});


// === ACORDEÓN PARA VERSION MÓVIL ===
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

dropdownToggles.forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    // Solo bloquear comportamiento en móvil
    if (window.innerWidth <= 1240) {
      e.preventDefault();

      const menu = toggle.nextElementSibling;
      menu.classList.toggle("open");
    }
  });
});


