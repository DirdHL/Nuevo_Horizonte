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