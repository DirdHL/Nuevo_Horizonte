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


// === 🔥 ACORDEÓN MÓVIL (solo uno abierto a la vez) ===
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

dropdownToggles.forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    // Solo en pantallas móviles
    if (window.innerWidth <= 1240) {
      e.preventDefault();

      const currentMenu = toggle.parentElement.querySelector(".mega-menu");

      // Si ya está abierto → ciérralo
      if (currentMenu.classList.contains("open")) {
        currentMenu.classList.remove("open");
        return;
      }

      // Cerrar TODOS los demás megamenús
      document.querySelectorAll(".mega-dropdown .mega-menu.open").forEach(menu => {
        if (menu !== currentMenu) {
          menu.classList.remove("open");
        }
      });

      // Abrir menú actual
      currentMenu.classList.add("open");
    }
  });
});
