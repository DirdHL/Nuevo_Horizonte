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

// Cerrar hamburguesa al tocar un enlace
document.querySelectorAll('.mega-menu a, .dropdown-toggle').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('show');
  });
});
