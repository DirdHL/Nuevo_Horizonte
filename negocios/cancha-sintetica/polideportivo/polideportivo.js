    /* ─────────────────────────────
    HEADER MENU
    ───────────────────────────── */
    const btnMenu = document.querySelector(".btn-izquierda");
    const barra = document.querySelector(".rectangulo-superior");

    btnMenu.addEventListener("click", () => {
    barra.classList.toggle("expandido");
    });


const items = Array.from(document.querySelectorAll('.img-box'));

const spacing = 420;     // distancia fija REAL
const speed = 0.0025;   // velocidad constante
let offset = 0;

const total = items.length;

function animate() {
  offset += speed;

  items.forEach((item, i) => {

    // índice infinito → índice circular
    let index = (i - offset) % total;
    if (index < -total / 2) index += total;
    if (index > total / 2) index -= total;

    // posición HORIZONTAL RÍGIDA
    const x = index * spacing;

    // curva VISUAL (no altera distancia)
    const y = Math.abs(index) ** 2 * 120;
    const rotate = index * 8;

    // ocultar lejos
    if (Math.abs(index) > 4) {
      item.style.opacity = 0;
      return;
    }

    item.style.opacity = 1;
    item.style.transform = `
      translate(-50%, -50%)
      translateX(${x}px)
      translateY(${y}px)
      rotate(${rotate}deg)
    `;

    item.style.zIndex = 100 - Math.abs(index);
  });

  requestAnimationFrame(animate);
}

animate();
