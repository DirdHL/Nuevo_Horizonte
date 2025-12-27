document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────
     HEADER MENU
  ───────────────────────────── */
  const btnMenu = document.querySelector(".btn-izquierda");
  const barra = document.querySelector(".rectangulo-superior");
  const headerWrapper = document.querySelector(".header-wrapper");

  if (btnMenu && barra) {
    btnMenu.addEventListener("click", () => {
      barra.classList.toggle("expandido");
    });

    window.addEventListener("scroll", () => {
      headerWrapper.classList.toggle("header-scroll", window.scrollY > 5);
    });
  }

  /* ─────────────────────────────
     CARRUSEL IMÁGENES
  ───────────────────────────── */
  const carouselItems = Array.from(document.querySelectorAll(".img-box"));
  const total = carouselItems.length;
  let offset = 0;
  let running = true;

  function getSpeed() {
    const w = window.innerWidth;
    if (w <= 400) return 0.0065;
    if (w <= 800) return 0.005;
    return 0.003;
  }

  function animateCarousel() {
    if (!running) return;

    offset += getSpeed();
    const w = window.innerWidth;
    const isMobile = w <= 800;
    const isSmallMobile = w <= 400;

    const scale = isMobile ? (isSmallMobile ? 0.9 : 0.95) : 1;
    const spacing = isMobile ? (isSmallMobile ? 220 : 280) : 420;
    const curveY = isMobile ? (isSmallMobile ? 70 : 90) : 120;
    const rotation = isMobile ? 5 : 8;

    carouselItems.forEach((item, i) => {
      let index = (i - offset) % total;
      if (index < -total / 2) index += total;
      if (index > total / 2) index -= total;

      const absIndex = Math.abs(index);

      if ((isMobile && absIndex > 1.8) || (!isMobile && absIndex > 4)) {
        item.style.opacity = 0;
        return;
      }

      let opacity = 1;
      if (isMobile && absIndex > 1) {
        opacity = 1 - (absIndex - 1) / 0.8;
      }

      const x = index * spacing;
      const baseLift = isMobile ? (isSmallMobile ? -100 : -80) : 0;
      const y = isMobile
        ? absIndex * curveY + baseLift
        : absIndex ** 2 * curveY;

      const rotate = index * rotation;

      item.style.opacity = opacity;
      item.style.transform = `
        translate(-50%, -50%)
        translateX(${x}px)
        translateY(${y}px)
        rotate(${rotate}deg)
        scale(${scale})
      `;
      item.style.zIndex = 100 - absIndex;
    });

    requestAnimationFrame(animateCarousel);
  }

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(animateCarousel);
  });

  animateCarousel();

  /* ─────────────────────────────
    SLIDER CIRCULAR
  ───────────────────────────── */
  const slides = document.querySelectorAll(".circulo-slider .slide");
  const ring = document.querySelector(".progress-ring");
  const infoBox = document.querySelector(".info-alquiler");
  const infoTitulo = document.querySelector(".info-titulo");
  const infoTexto = document.querySelector(".info-texto");

  const DATA = [
    {
      titulo: "CANCHA GRANDE DE FÚTBOL",
      texto: "Cancha sintética para partidos completos.\n\nCapacidad: 11 jugadores\nÁrea: 25 × 25 m²"
    },
    {
      titulo: "CANCHA PEQUEÑA DE FÚTBOL",
      texto: "Cancha sintética ideal para juegos rápidos y entrenamientos.\n\nCapacidad: 6 jugadores\nÁrea: 15 × 15 m²"
    },
    {
      titulo: "CANCHA DE VÓLEY",
      texto: "Cancha acondicionada para juegos recreativos y partidos competitivos.\n\nCapacidad: 12 jugadores\nÁrea: 10 × 10 m²"
    },
    {
      titulo: "BUMPERBALLS",
      texto: "Actividad recreativa de fútbol con burbujas inflables.\n\nCapacidad: 1 persona"
    },
    {
      titulo: "CUATRIMOTOS",
      texto: "Recorrido largo por el polideportivo.\n\nCapacidad: 2 personas"
    }
  ];

  const SEGMENTS = 60;
  const DURATION = 5000;

  let currentSlide = 0;
  let currentSegment = 0;
  let interval;

  for (let i = 0; i < SEGMENTS; i++) {
    const span = document.createElement("span");
    span.style.transform = `rotate(${(360 / SEGMENTS) * i}deg)`;
    ring.appendChild(span);
  }

  const segments = ring.querySelectorAll("span");

  function updateInfo(index) {
    infoBox.classList.remove("activo");
    setTimeout(() => {
      infoTitulo.textContent = DATA[index].titulo;
      infoTexto.textContent = DATA[index].texto;
      infoBox.classList.add("activo");
    }, 200);
  }

  function startProgress() {
    currentSegment = 0;
    segments.forEach(s => s.classList.remove("active"));
    clearInterval(interval);

    interval = setInterval(() => {
      if (currentSegment < SEGMENTS) {
        segments[currentSegment].classList.add("active");
        currentSegment++;
      } else {
        changeSlide();
      }
    }, DURATION / SEGMENTS);
  }

  function changeSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
    updateInfo(currentSlide);
    startProgress();
  }
  updateInfo(0);
  startProgress();

 /* ─────────────────────────────
   EVENTOS – LÍNEA STICKY REAL
───────────────────────────── */
const eventoItems = document.querySelectorAll(".evento-item");
const eventosWrapper = document.querySelector(".eventos-info");
const tituloEventos = document.querySelector(".titulo-eventos");

function updateEventosOnScroll() {
  const wrapperTop = eventosWrapper.getBoundingClientRect().top;
  const tituloBottom = tituloEventos.getBoundingClientRect().bottom;

  eventoItems.forEach((item, index) => {
    const itemRect = item.getBoundingClientRect();
    const nextItem = eventoItems[index + 1];
    const nextRect = nextItem?.getBoundingClientRect();

    // 🔥 LÍNEA: se apaga cuando el evento intenta cruzar el título
    if (wrapperTop <= tituloBottom + 2) {
      item.classList.add("linea-oculta");
    } else {
      item.classList.remove("linea-oculta");
    }

    // 🔥 STICKY: muere cuando entra el siguiente
    if (nextRect && nextRect.top <= itemRect.top + 40) {
      item.classList.add("no-sticky");
    } else {
      item.classList.remove("no-sticky");
    }
  });
}

window.addEventListener("scroll", updateEventosOnScroll);
window.addEventListener("resize", updateEventosOnScroll);
updateEventosOnScroll();


});


// ----------------------------
// FILTRO GALERÍA
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const filtros = document.querySelectorAll(".galeria-filtros button");
  const items = Array.from(document.querySelectorAll(".galeria-item"));
  const grid = document.querySelector(".galeria-grid");
  const wrapper = document.querySelector(".galeria-grid-wrapper");
  const ANIM_DUR = 600;

  function getVisibles(filter) {
    return (filter === "todo") ? items.slice() : items.filter(i => i.classList.contains(filter));
  }

  function applyFilter(filter) {
    const startHeight = wrapper.offsetHeight;
    const visibles = getVisibles(filter);
    const ocultos = items.filter(i => !visibles.includes(i));

    items.forEach(it => it.classList.add("oculto"));
    visibles.forEach(v => grid.appendChild(v));
    ocultos.forEach(h => grid.appendChild(h));

    void grid.offsetWidth;

    ocultos.forEach(h => {
      h.__oldDisplay = h.style.display;
      h.style.display = "none";
    });

    requestAnimationFrame(() => {
      const endHeight = grid.scrollHeight;

      ocultos.forEach(h => {
        h.style.display = h.__oldDisplay || "";
      });

      wrapper.style.height = startHeight + "px";
      void wrapper.offsetWidth;
      wrapper.classList.add("animando");

      requestAnimationFrame(() => {
        wrapper.style.height = endHeight + "px";
      });

      setTimeout(() => {
        wrapper.classList.remove("animando");
        wrapper.style.height = filter === "todo" ? "auto" : endHeight + "px";
      }, ANIM_DUR);

      setTimeout(() => {
        visibles.forEach(v => v.classList.remove("oculto"));
      }, 40);
    });
  }

  filtros.forEach(btn => {
    btn.addEventListener("click", () => {
      filtros.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  setTimeout(() => {
    applyFilter(window.innerWidth <= 768 ? "pinos" : "todo");
  }, 100);
});