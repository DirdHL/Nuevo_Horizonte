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

// === 🔥 ACORDEÓN MÓVIL (solo uno abierto a la vez) ===
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
