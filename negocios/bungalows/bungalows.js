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

  // ==========================================
  // ACORDEÓN / BOTONES MOSTRAR-OCULTAR (EXTERIORES & INTERIOR)
  // ==========================================
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  const isMobile = window.innerWidth <= 768;

  toggleButtons.forEach(btn => {
    const targetId = btn.getAttribute('aria-controls');
    const target = document.getElementById(targetId);

    if (target) {
      // Si es pantalla móvil, colapsar inicialmente
      if (isMobile) {
        btn.setAttribute('aria-expanded', 'false');
        target.classList.add('collapsed');
        target.style.maxHeight = '0px';
      }

      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
          // --- CONTRAER (COLLAPSE) ---
          const currentHeight = target.scrollHeight;
          target.style.maxHeight = `${currentHeight}px`;
          
          // Forzar reflujo para registrar altura fija
          target.offsetHeight;

          target.style.maxHeight = '0px';
          target.classList.add('collapsed');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          // --- EXPANDIR (EXPAND) ---
          btn.setAttribute('aria-expanded', 'true');
          target.classList.remove('collapsed');
          
          const targetHeight = target.scrollHeight;
          target.style.maxHeight = `${targetHeight}px`;

          // Limpiar maxHeight al terminar para que sea responsivo ante cambios de pantalla
          const onTransitionEnd = (e) => {
            if (e.propertyName === 'max-height') {
              if (btn.getAttribute('aria-expanded') === 'true') {
                target.style.maxHeight = 'none';
              }
              target.removeEventListener('transitionend', onTransitionEnd);
            }
          };
          target.addEventListener('transitionend', onTransitionEnd);
        }
      });
    }
  });

  // ==========================================
  // BOTÓN DE CONTRAER EN EL PIE DE CADA GRUPO
  // ==========================================
  const collapseBottomButtons = document.querySelectorAll('.btn-collapse-bottom');

  collapseBottomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const headerToggle = document.querySelector(`.toggle-btn[aria-controls="${targetId}"]`);
      
      if (headerToggle) {
        // Desplazarse suavemente hacia la cabecera del grupo antes/durante el cierre
        const groupElement = headerToggle.closest('.services-group');
        if (groupElement) {
          groupElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Simular clic en el toggle principal para contraer la sección
        if (headerToggle.getAttribute('aria-expanded') === 'true') {
          headerToggle.click();
        }
      }
    });
  });

  // ==========================================
  // LIGHTBOX / MODAL DEL CROQUIS
  // ==========================================
  const croquisFrame = document.querySelector('.croquis-frame');
  const croquisModal = document.getElementById('croquis-modal');
  const croquisModalClose = document.getElementById('croquis-modal-close');

  if (croquisFrame && croquisModal && croquisModalClose) {
    const openCroquisModal = () => {
      croquisModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeCroquisModal = () => {
      croquisModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    croquisFrame.addEventListener('click', openCroquisModal);
    croquisModalClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeCroquisModal();
    });

    croquisModal.addEventListener('click', (e) => {
      if (e.target === croquisModal || e.target.classList.contains('croquis-modal-content')) {
        closeCroquisModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && croquisModal.classList.contains('active')) {
        closeCroquisModal();
      }
    });
  }
});
