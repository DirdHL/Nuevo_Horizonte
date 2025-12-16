document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1) HEADER STICKY + ICONOS
  ============================================================ */

  const header = document.querySelector('.top-header');
  const icons = document.querySelectorAll('.icon');

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (!header) return;
      header.classList.toggle('sticky', window.scrollY > 50);
    }, 50);
  });

  icons.forEach(icon => {
    const originalSrc = icon.src;
    const hoverSrc = icon.dataset.hover;
    if (!hoverSrc) return;

    const parent = icon.parentElement;
    parent.addEventListener('mouseenter', () => (icon.src = hoverSrc));
    parent.addEventListener('mouseleave', () => (icon.src = originalSrc));
  });

  /* ============================================================
     3) SCROLL SUAVE
  ============================================================ */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    });
  });



  /* ============================================================
     4) BOTÓN SCROLL AL BUNGALOWS
  ============================================================ */

  const scrollBtn = document.getElementById('scrollToBungalows');
  const bungalowsSection = document.getElementById('bungalows');

  if (scrollBtn && bungalowsSection) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: bungalowsSection.offsetTop - 1,
        behavior: 'smooth'
      });
    });
  }



  /* ============================================================
     5) MENÚ HAMBURGUESA (siempre funcional)
  ============================================================ */

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {

    const toggleMenu = () => {
      const opened = navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open', opened);
      menuToggle.setAttribute('aria-expanded', opened);
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.classList.contains('active')) return;
      if (!navLinks.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 600 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

/* ============================================================
Baraja de melda
============================================================ */
/* Baraja: abrir viewer al click */
/* ============================================================
   Baraja en móvil: primer tap levanta, segundo tap abre imagen
============================================================ */
(function () {
  const cards = document.querySelectorAll('.muestras .card');
  const viewer = document.getElementById('viewer');
  const viewerImg = document.getElementById('viewer-img');

  if (!cards.length || !viewer || !viewerImg) return;

  const isMobile = window.matchMedia("(max-width: 400px)").matches;

  cards.forEach(card => {
    let tappedOnce = false;

    card.addEventListener('click', (e) => {
      const img = card.querySelector('img');
      if (!img) return;

      if (isMobile) {
        // PRIMER TAP → levantar carta
        if (!tappedOnce) {
          cards.forEach(c => c.classList.remove("touch-active")); // bajar las demás
          card.classList.add("touch-active");
          tappedOnce = true;

          // Reiniciar si no presiona de nuevo en 1,2s
          setTimeout(() => {
            tappedOnce = false;
            card.classList.remove("touch-active");
          }, 1200);

          return; // no abrir todavía
        }
      }

      // SEGUNDO TAP → abrir viewer
      viewerImg.src = img.src;
      viewer.classList.add('active');
      viewer.setAttribute('aria-hidden','false');

      // limpiar estado
      tappedOnce = false;
      card.classList.remove("touch-active");
    });
  });

  // cerrar viewer
  viewer.addEventListener('click', (e) => {
    if (e.target === viewer || e.target === viewerImg) {
      viewer.classList.remove('active');
      viewer.setAttribute('aria-hidden','true');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      viewer.classList.remove('active');
      viewer.setAttribute('aria-hidden','true');
    }
  });
})();


(function () {

  const cards = document.querySelectorAll('.muestras .card');
  const viewer = document.getElementById('info-viewer');
  const longImg = document.getElementById('long-img');
  const closeBtn = document.querySelector('.close-long');

  if (!cards.length || !viewer || !longImg) return;

  // Images
  const longImages = [
    "../../img/bungalows-de-tomayquichua/baraja-contenido-1.png",
    "../../img/bungalows-de-tomayquichua/baraja-contenido-2.png",
    "../../img/bungalows-de-tomayquichua/baraja-contenido-3.png",
    "../../img/bungalows-de-tomayquichua/baraja-contenido-4.png",
    "../../img/bungalows-de-tomayquichua/baraja-contenido-5.png",
    "../../img/bungalows-de-tomayquichua/baraja-contenido-6.png",
    "../../img/bungalows-de-tomayquichua/baraja-contenido-7.png",
    "../../img/bungalows-de-tomayquichua/baraja-contenido-8.png",
  ];

  // Abrir modal
  cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    longImg.src = longImages[i];

    // Mostrar modal
    viewer.classList.add("active");
    document.body.classList.add("no-scroll");

    // Reiniciar scroll interno SIEMPRE
    document.querySelector('.long-container').scrollTop = 0;
  });
});


  // Cerrar modal con botón
  closeBtn.addEventListener("click", () => {
    viewer.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  // Cerrar clic afuera
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) {
      viewer.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      viewer.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });

})();
