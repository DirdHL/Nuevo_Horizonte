const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');

let index = 0;

setInterval(() => {
  index = (index + 1) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
}, 4000);

const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

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
