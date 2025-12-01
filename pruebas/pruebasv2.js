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
