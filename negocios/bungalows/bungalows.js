/* ==========================================================================
   JAVASCRIPT - BUNGALOWS TOMAYQUICHUA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-menu .nav-item-wrapper');

  // Cambiar clase activa al hacer clic en cualquier menú
  navItems.forEach(item => {
    const link = item.querySelector('.nav-item');
    if (link) {
      link.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    }
  });

  // Si la página se carga con un hash específico, activar ese menú
  const currentHash = window.location.hash;
  if (currentHash) {
    navItems.forEach(item => {
      const link = item.querySelector('.nav-item');
      if (link && link.getAttribute('href') === currentHash) {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });
  }
});
