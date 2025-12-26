document.addEventListener("DOMContentLoaded", () => {
  /* ─────────────────────────────
    HEADER MENU
  ───────────────────────────── */
  const btnMenu = document.querySelector(".btn-izquierda");
  const barra = document.querySelector(".rectangulo-superior");
  if (btnMenu && barra) {
    btnMenu.addEventListener("click", () => {
      barra.classList.toggle("expandido");
    });
    let lastScrollY = 0;
const headerWrapper = document.querySelector(".header-wrapper");
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 5) {
    headerWrapper.classList.add("header-scroll");
  } else {
    headerWrapper.classList.remove("header-scroll");
  }
  lastScrollY = currentScroll;
});
  }

  /* ─────────────────────────────
    CARRUSEL
  ───────────────────────────── */
  const items = Array.from(document.querySelectorAll(".img-box"));
  const total = items.length;
  let offset = 0;
  let running = true;

  function getSpeed() {
    const w = window.innerWidth;
    if (w <= 400) return 0.0065;
    if (w <= 800) return 0.005;
    return 0.003;
  }

  function animate() {
    if (!running) return;
    offset += getSpeed();
    const w = window.innerWidth;
    const isMobile = w <= 800;
    const isSmallMobile = w <= 400;
    const scale    = isMobile ? (isSmallMobile ? 0.9 : 0.95) : 1;
    const spacing  = isMobile ? (isSmallMobile ? 220 : 280) : 420;
    const curveY   = isMobile ? (isSmallMobile ? 70 : 90) : 120;
    const rotation = isMobile ? 5 : 8;
    items.forEach((item, i) => {
      let index = (i - offset) % total;
      if (index < -total / 2) index += total;
      if (index > total / 2) index -= total;
      const absIndex = Math.abs(index);

      // visibilidad
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
      const y = isMobile ? absIndex * curveY + baseLift : absIndex ** 2 * curveY;
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

    requestAnimationFrame(animate);
  }
  // pausa cuando la pestaña no está visible
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(animate);
  });

  animate();
});

  /* ─────────────────────────────
    CICULAR
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
  texto: "Actividad recreativa de fútbol con burbujas inflables, ideal para juegos divertidos y seguros.\n\nCapacidad: 1 persona"
},

  {
  titulo: "CUATRIMOTOS",
  texto: "Recorrido largo por todo el polideportivo, ideal para paseos recreativos y pequeñas carreras.\n\nCapacidad: 2 personas"
}
];

const SEGMENTS = 60;
const DURATION = 5000;
let currentSlide = 0;
let currentSegment = 0;
let interval;
/* crear segmentos */
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

/* inicial */
updateInfo(0);
startProgress();






const items = document.querySelectorAll(".evento-item");

window.addEventListener("scroll", () => {
  const topOffset = 120;

  items.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const nextItem = items[index + 1];

    let opacity = 1;
    let translateY = 0;

    // cuando está fijo en el top
    if (rect.top <= topOffset) {
      translateY = Math.max(rect.top - topOffset, -40);
    }

    // si el siguiente bloque empieza a taparlo
    if (nextItem) {
      const nextRect = nextItem.getBoundingClientRect();
      const overlap = topOffset + rect.height - nextRect.top;

      if (overlap > 0) {
        const fadeProgress = Math.min(overlap / rect.height, 1);
        opacity = 1 - fadeProgress;
      }
    }

    item.style.opacity = opacity;
    item.style.transform = `translateY(${translateY}px)`;
  });
});


