    /* ─────────────────────────────
    HEADER MENU
    ───────────────────────────── */
    const btnMenu = document.querySelector(".btn-izquierda");
    const barra = document.querySelector(".rectangulo-superior");

    btnMenu.addEventListener("click", () => {
    barra.classList.toggle("expandido");
    });




/* ─────────────────────────────
    CARRUSEL
───────────────────────────── */  
const items = Array.from(document.querySelectorAll('.img-box'));

let offset = 0;
const speed = 0.0030;
const total = items.length;

function animate() {
  offset += speed;

 const w = window.innerWidth;
const isMobile = w <= 800;
const isSmallMobile = w <= 400;

const scale    = isMobile ? (isSmallMobile ? 0.9 : 0.95) : 1;
const spacing  = isMobile ? (isSmallMobile ? 220 : 280) : 420;
const curveY   = isMobile ? (isSmallMobile ? 70  : 90 ) : 120;
const rotation = isMobile ? 5 : 8;


  items.forEach((item, i) => {
    let index = (i - offset) % total;

    if (index < -total / 2) index += total;
    if (index > total / 2) index -= total;

    const absIndex = Math.abs(index);

    // 🔥 VISIBILIDAD PROGRESIVA
    if (isMobile && absIndex > 1.8) {
      item.style.opacity = 0;
      return;
    }

    if (!isMobile && absIndex > 4) {
      item.style.opacity = 0;
      return;
    }

    // 🔥 OPACIDAD SUAVE (CLAVE)
    let opacity = 1;

    if (isMobile && absIndex > 1) {
      opacity = 1 - (absIndex - 1) / 0.8; // fade out suave
    }

    const x = index * spacing;
  const baseLift = isMobile
  ? (isSmallMobile ? -100 : -80)
  : 0;

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

  requestAnimationFrame(animate);
}

animate();
